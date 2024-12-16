import japan from 'assets/img/country/japan.png';

export type TopRegionsTableDataType = {
  country: {
    name: string;
    flag: string;
  };
  users: {
    number: number;
    percantage: string;
  };
  transactions: {
    number: number;
    percantage: string;
  };
  revenue: {
    number: number;
    percantage: string;
  };
  convRate: string;
};

export const topRegionsTableData: TopRegionsTableDataType[] = [
  {
    country: {
      name: 'Japan',
      flag: japan
    },
    users: {
      number: 12547,
      percantage: '12.7%'
    },
    transactions: {
      number: 21,
      percantage: '14.91%'
    },
    revenue: {
      number: 2541,
      percantage: '23.2%'
    },
    convRate: '20.01%'
  }
];
