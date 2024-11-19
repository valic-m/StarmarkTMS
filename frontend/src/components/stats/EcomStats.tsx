import { Col, Row, Stack } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBoxesPacking,
  faCashRegister,
  faCircle,
  faFileInvoice,
  faHandPaper,
  faPause,
  faRoute,
  faSquare,
  faStar,
  faTruck,
  faTruckField,
  faTruckFront,
  faTruckLoading,
  faTruckMoving,
  faTruckPickup,
  faWarehouse,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

type StatType = {
  id: number | string;
  icon: IconProp;
  title: string;
  subTitle: string;
  color: string;
};

const stats: StatType[] = [
  {
    id: 1,
    icon: faTruckLoading,
    title: '7 Available Loads',
    subTitle: 'Awating for Dispatch',
    color: 'success'
  },
  {
    id: 2,
    icon: faBoxesPacking,
    title: '15 Loads',
    subTitle: 'In Transit',
    color: 'success'
  },
  {
    id: 3,
    icon: faFileInvoice,
    title: '15 Loads Delivered',
    subTitle: 'Waiting to be Invoiced',
    color: 'success'
  }
];

const EcomStats = () => {
  return (
    <Row className="align-items-center g-4">
      {stats.map(stat => (
        <Col xs={12} md="auto" key={stat.id}>
          <Stat stat={stat} />
        </Col>
      ))}
    </Row>
  );
};

const Stat = ({ stat }: { stat: StatType }) => {
  return (
    <Stack direction="horizontal" className="align-items-center">
      {/* <img src={stat.icon} alt="" height={46} width={46} /> */}
      <span
        className="fa-layers"
        style={{ minHeight: '46px', minWidth: '46px' }}
      >
        <FontAwesomeIcon
          icon={faWarehouse}
          size="2x"
          className={`text-stats-circle-${stat.color} fa-layers-circle`}
          transform="up-4 right-3 grow-2"
        />
        <FontAwesomeIcon
          icon={stat.icon}
          size="1x"
          className={`text-${stat.color}`}
          transform="shrink-2 up-8 right-6"
        />
      </span>

      <div className="ms-3">
        <h4 className="mb-0">{stat.title}</h4>
        <p className="text-body-secondary fs-9 mb-0">{stat.subTitle}</p>
      </div>
    </Stack>
  );
};

export default EcomStats;
