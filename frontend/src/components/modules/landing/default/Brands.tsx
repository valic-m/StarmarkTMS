import classNames from 'classnames';
import { Col, Row } from 'react-bootstrap';
import garison from 'assets/img/brands/garrison.png';
import molo from 'assets/img/brands/molo.png';
import megac from 'assets/img/brands/megac.png';
import dsg from 'assets/img/brands/dsg.png';
import echo from 'assets/img/brands/echo.png';
import gampac from 'assets/img/brands/gampac.avif';
import nfi from 'assets/img/brands/nfi.png';
import roar from 'assets/img/brands/roar.png';

const Brand = ({ image, className }: { image: string; className?: string }) => {
  return (
    <div
      className={classNames(
        className,
        'p-2 p-lg-5 d-flex flex-center h-100 border-dashed border-translucent'
      )}
    >
      <img src={image} alt="" className="w-100" />
    </div>
  );
};

const Brands = ({ className }: { className?: string }) => {
  return (
    <section className={className}>
      <div className="container-small px-lg-7 px-xxl-3">
        <Row className="g-0">
          <Col xs={6} md={3}>
            <Brand
              image={garison}
              className="border-bottom border-end border-translucent"
            />
          </Col>
          <Col xs={6} md={3}>
            <Brand
              image={molo}
              className="border-bottom border-end-md border-translucent"
            />
          </Col>
          <Col xs={6} md={3}>
            <Brand
              image={megac}
              className="border-bottom border-end border-end-md border-translucent"
            />
          </Col>
          <Col xs={6} md={3}>
            <Brand
              image={dsg}
              className="border-bottom border-end-lg-0 border-translucent"
            />
          </Col>
          <Col xs={6} md={3}>
            <Brand
              image={echo}
              className="border-end border-bottom border-bottom-md-0 border-translucent"
            />
          </Col>
          <Col xs={6} md={3}>
            <Brand
              image={gampac}
              className="border-end-md border-bottom border-bottom-md-0 border-translucent"
            />
          </Col>
          <Col xs={6} md={3}>
            <Brand image={nfi} className="border-end border-translucent" />
          </Col>
          <Col xs={6} md={3}>
            <Brand
              image={roar}
              className="border-end-lg-0 border-translucent"
            />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Brands;
