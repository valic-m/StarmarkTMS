import member1 from 'assets/img/team/9.webp';
import member2 from 'assets/img/team/25.webp';
import member3 from 'assets/img/team/32.webp';
import member4 from 'assets/img/team/35.webp';
import member5 from 'assets/img/team/11.webp';
import { BadgeBg, BadgeVariant } from 'components/base/Badge';
import { Status } from 'components/base/Avatar';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface Activity {
  id: number;
  title: string;
  name: string;
  date: string;
  variant: string;
  icon: IconProp;
  description?: string;
}

export const dealActivities: Activity[] = [
  {
    id: 1,
    title: 'Assigned  as a director for Project  The Chewing Gum Attack',
    name: 'Jackson Pollock',
    date: '22 September, 2022, 4:33 PM',
    description:
      'Utilizing best practices to better leverage our assets, we must engage in black sky leadership thinking, not the usual band-aid solution. ',
    variant: 'primary',
    icon: faClipboard
  }
];

export interface Note {
  id: number;
  name: string;
  date: string;
  description: string;
}

export const dealNotes: Note[] = [
  {
    id: 1,
    name: 'Ansolo Lazinatov',
    date: 'clock 12 Nov, 2018',
    description: 'Gave us a nice feedback'
  }
];

export interface Meeting {
  id: number;
  title: string;
  date: {
    from: string;
    to: string;
    duration: string;
  };
  badge: {
    variant: BadgeVariant;
    bg: BadgeBg;
    text: string;
  };
  assigness: string[];
  more: string;
  priority: {
    label: string;
    color: string;
  };
  name?: string;
}

export const meetingData: Meeting[] = [
  {
    id: 1,
    title: 'Onboarding Meeting',
    date: {
      from: '5:30 pm',
      to: '7:00pm',
      duration: ' - 1h 30min'
    },
    badge: {
      variant: 'phoenix',
      bg: 'primary',
      text: 'today'
    },
    assigness: [member1, member2, member3, member4, member5],
    more: '+1',
    priority: {
      label: 'Urgent',
      color: 'danger'
    }
  }
];

export interface Task {
  id: number;
  task: string;
  date: string;
  time: string;
  completed?: boolean;
}

export const taskList: Task[] = [
  {
    id: 1,
    task: 'Platforms for data administration',
    date: '19 Nov, 2022',
    time: '11:56 PM'
  }
];

export interface CallTableDataType {
  user: {
    avatar: string;
    name: string;
    status: Status;
  };
  description: string;
  date: string;
  creatBy: string;
  activity: string;
}

export const callTableData: CallTableDataType[] = [
  {
    user: {
      avatar: member4,
      name: 'Ansolo Lazinatov',
      status: 'online'
    },
    description: 'Purchasing-Related Vendors',
    date: 'Dec 29, 2021',
    creatBy: 'Ansolo Lazinarov',
    activity: 'Active'
  }
];
