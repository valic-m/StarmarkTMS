import { useState } from 'react';
import { Card, Col, Dropdown, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import settingsIcon from 'assets/img/nav-icons/settings.webp';
import Scrollbar from 'components/base/Scrollbar';

const NineDotMenu = () => {
  const [items] = useState([
    { img: settingsIcon, title: 'Settings', width: '60', url: '/settings' }
  ]);

  return (
    <Dropdown.Menu
      align="end"
      className="navbar-dropdown-caret py-0 dropdown-nine-dots shadow border"
    >
      <Card
        className="position-relative border-0"
        style={{ height: '20rem', minWidth: 244 }}
      >
        <Scrollbar>
          <Card.Body className="pt-3 px-3 pb-0">
            <Row className="text-center align-items-center g-0">
              {items.map(item => (
                <Col xs={4} key={item.title}>
                  <Link
                    to={item.url}
                    className="d-block bg-body-secondary-hover p-2 rounded-3 text-center text-decoration-none mb-3"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      width={item.width || 30}
                    />
                    <p className="mb-0 text-body-emphasis text-truncate fs-10 mt-1 pt-1">
                      {item.title}
                    </p>
                  </Link>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Scrollbar>
      </Card>
    </Dropdown.Menu>
  );
};

export default NineDotMenu;
