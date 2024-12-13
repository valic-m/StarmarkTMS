import Logo from 'components/common/Logo';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ThemeToggler from 'components/common/ThemeToggler';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';

const NavItem = ({
  label,
  url,
  isLast
}: {
  label: string;
  url: string;
  isLast?: boolean;
}) => {
  return (
    <Nav.Item
      as="li"
      className={classNames({
        'border-bottom border-translucent border-bottom-lg-0': !isLast
      })}
    >
      <Nav.Link href={url} className="lh-1 py-0 fs-9 fw-bold py-3">
        {label}
      </Nav.Link>
    </Nav.Item>
  );
};

const DefaultLandingNavbar = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const toggleShadowClass = () => {
      if (window.scrollY > 300) {
        containerRef.current?.classList.add('navbar-shadow');
      } else {
        containerRef.current?.classList.remove('navbar-shadow');
      }
    };

    document.addEventListener('scroll', () => toggleShadowClass());

    return () => document.removeEventListener('scroll', toggleShadowClass);
  }, []);

  return (
    <>
      <div
        className={classNames(
          className,
          'bg-body-emphasis sticky-top landing-navbar'
        )}
        ref={containerRef}
      >
        <Navbar className="px-3 px-lg-7 px-xxl-3 container-small" expand="lg">
          <Navbar.Brand
            as={Link}
            to="/"
            className="text-decoration-none flex-1 flex-lg-grow-0"
          >
            <Logo />
          </Navbar.Brand>
          <ThemeToggler className="mx-2 d-lg-none" />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <div className="border-bottom border-translucent d-lg-none mb-2"></div>
            <Nav className="me-auto mb-2 mb-lg-0" as="ul">
              <NavItem label="Home" url="#home" />
              <NavItem label="Features" url="#features" />
              <NavItem label="Blog" url="#blog" />
              <NavItem label="Team" url="#team" isLast />
            </Nav>

            <div className="d-grid d-lg-flex gap-4 align-items-center">
              <ThemeToggler className="d-none d-lg-block" />

              <Link
                to="/auth/sign-in"
                className="btn btn-link p-0 text-body order-1 order-lg-0"
              >
                Sign in
              </Link>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default DefaultLandingNavbar;
