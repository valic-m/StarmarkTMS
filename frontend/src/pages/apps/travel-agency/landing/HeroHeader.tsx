import travelImg from 'assets/video/landingphoto.png';
import travelVideo from 'assets/video/landingvideo.mp4';
import { Dropdown, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ReactTyped } from 'react-typed';

const HeroHeader = () => {
  return (
    <div className="booking-hero-header d-flex align-items-center">
      <div
        className="bg-holder overlay bg-opacity-50"
        style={{
          backgroundImage: `url(${travelImg})`,
          backgroundPosition: 'left bottom',
          backgroundSize: 'auto'
        }}
      >
        <video className="bg-video" autoPlay loop muted src={travelVideo} />
      </div>
      <div className="container-medium position-relative z-5">
        <h2 className="text-secondary-lighter fs-5 fs-md-3 fw-normal mb-3">
          STARMARK! The future of
        </h2>
        <h2 className="text-secondary-lighter fs-5 fs-md-3 fw-normal mb-3">
          Transportation Excellence
        </h2>
        <h1 className="fs-4 fs-md-1 text-white fw-normal mb-6 overflow-hidden">
          WHERE{' '}
          <ReactTyped
            strings={[
              '<span class=text-primary>SERVICE SHINES!</span>',
              '<span class=text-warning>EXPECTATIONS ARE MET!</span>',
              '<span class=text-info>PARTNERSHIPS GROW!</span>',
              '<span class=text-success>DRIVERS THRIVE!</span>',
              '<span class=text-primary>EFFICIENCY RULES!</span>',
              '<span class=text-warning>TECHNOLOGY LEADS!</span>',
              '<span class=text-success>RESULTS MATTER!</span>',
              '<span class=text-primary>ROUTES CONNECT!</span>',
              '<span class=text-warning>INTEGRITY DRIVES US!</span>',
              '<span class=text-info>TEAMS COLLABORATE!</span>',
              '<span class=text-success>SAFETY COMES FIRST!</span>',
              '<span class=text-primary>PERFORMANCE EXCELS!</span>',
              '<span class=text-warning>OPPORTUNITIES GROW!</span>'
            ]}
            typeSpeed={70}
            backSpeed={70}
            loop
            backDelay={1000}
          />
        </h1>
      </div>
    </div>
  );
};

export default HeroHeader;
