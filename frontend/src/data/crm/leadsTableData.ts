import team1 from 'assets/img/team/32.webp';
import { BadgeBg } from 'components/base/Badge';

export interface LeadDataType {
  id: number;
  customer: {
    avatar: string;
    name: string;
    designation: string;
    status: {
      label: string;
      type: BadgeBg;
    };
  };
  email: string;
  phone: string;
  contact: string;
  company: string;
  date: string;
}

export const leadsTableData: LeadDataType[] = [
  {
    id: 1,
    customer: {
      avatar: team1,
      name: 'Anthoney Michael',
      designation: 'VP Accounting',
      status: {
        label: 'new lead',
        type: 'info'
      }
    },
    email: 'anth125@gmail.com',
    phone: '+1-202-555-0126',
    contact: `Ally Aagaard`,
    company: `Google.inc`,
    date: `Jan 01, 12:56 PM`
  }
];
