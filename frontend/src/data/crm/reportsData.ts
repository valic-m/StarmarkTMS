import { BadgeBg } from 'components/base/Badge';
import team32 from 'assets/img/team/32.webp';
import team35 from 'assets/img/team/35.webp';
import team59 from 'assets/img/team/59.webp';
import team18 from 'assets/img/team/18.webp';

export interface SellerReport {
  reportStage: string;
  totalCount: number;
  status: {
    label: string;
    type: BadgeBg;
  };
}

export interface DealsReport {
  dealName: string;
  dealOwner: {
    avatar?: string;
    name: string;
    profileLink: string;
  };
  accountName: string;
  stage: {
    label: string;
    value: number;
  };
  amount: {
    value: number;
    trending: 'up' | 'down';
  };
}

export const sellersReportData: SellerReport[] = [
  {
    reportStage: 'Analysis',
    totalCount: 64,
    status: {
      label: '+15.21%',
      type: 'info'
    }
  },
  {
    reportStage: 'Statement',
    totalCount: 40,
    status: {
      label: '+05.21%',
      type: 'warning'
    }
  },
  {
    reportStage: 'Action',
    totalCount: 45,
    status: {
      label: '+22.12%',
      type: 'primary'
    }
  },
  {
    reportStage: 'Offering',
    totalCount: 62,
    status: {
      label: '-14.21%',
      type: 'danger'
    }
  },
  {
    reportStage: 'Interlocation',
    totalCount: 82,
    status: {
      label: '-14.21%',
      type: 'danger'
    }
  }
];

export const dealsReportData: DealsReport[] = [
  {
    dealName: 'Jo_Td01',
    dealOwner: {
      name: 'Ally Aagaard',
      profileLink: '#!'
    },
    accountName: 'Themewagon',
    stage: {
      label: 'Analysis',
      value: 20
    },
    amount: {
      value: 140,
      trending: 'down'
    }
  }
];
export interface Report {
  id: number;
  title: string;
  subTitle: string;
  priority: {
    label: string;
    type: string;
  };
  reportsby: string;
  category: string;
  date: string;
}

export const reports: Report[] = [
  {
    id: 1,
    title: 'Purchasers and sellers',
    subTitle: 'Purchasing-Related Vendors',
    priority: {
      label: 'Urgent',
      type: 'danger'
    },
    reportsby: 'Reports by email',
    category: 'Sales Reports',
    date: 'Dec 30, 2022'
  }
];
