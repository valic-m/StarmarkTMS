export interface Deal {
  id: string;
  title: string;
  revenue: number;
  category: string;
  date: string;
  time: string;
  closingDate: string;
  closingTime: string;
  company: string;
  agent: string;
  openDetails?: boolean;
  status: {
    label: string;
    variant: string;
  };
  priority: {
    label: string;
    variant: string;
  };
  probability: {
    value: string;
    variant: string;
  };
}

export interface DealColumn {
  id: string;
  title: string;
  revenue: number;
  deals: Deal[];
}

export const dealColumnsData: DealColumn[] = [
  {
    id: '1',
    title: 'New',
    revenue: 37000,
    deals: [
      {
        id: '1',
        title: 'Jo_Td01',
        revenue: 14000,
        category: 'Financial',
        date: 'Dec 30, 2022',
        time: '2:15 PM',
        closingDate: '27-12-2022',
        closingTime: '11:19 PM',
        company: 'Knitkake.inc',
        agent: 'Ally Aagaard',
        status: {
          label: 'new',
          variant: 'info'
        },
        priority: {
          label: 'Urgent',
          variant: 'danger'
        },
        probability: {
          value: '20',
          variant: 'info'
        }
      }
    ]
  },
  {
    id: '2',
    title: 'In Progress',
    revenue: 0,
    deals: []
  },
  {
    id: '3',
    title: 'Pending',
    revenue: 0,
    deals: []
  },
  {
    id: '4',
    title: 'Canceled',
    revenue: 0,
    deals: []
  },
  {
    id: '5',
    title: 'Completed',
    revenue: 0,
    deals: []
  }
];
