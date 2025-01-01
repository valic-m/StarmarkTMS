import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  Icon,
  UilChartPie,
  UilCube,
  UilFilesLandscapesAlt,
  UilUsersAlt
} from '@iconscout/react-unicons';

export interface Route {
  name: string;
  icon?: IconProp | string | string[];
  iconSet?: 'font-awesome' | 'feather' | 'unicons';
  pages?: Route[];
  path?: string;
  pathName?: string;
  flat?: boolean;
  topNavIcon?: string;
  dropdownInside?: boolean;
  active?: boolean;
  new?: boolean;
  hasNew?: boolean;
  next?: boolean;
}

export interface RouteItems {
  label: string;
  horizontalNavLabel?: string;
  icon: Icon;
  labelDisabled?: boolean;
  pages: Route[];
  megaMenu?: boolean;
  active?: boolean;
}

export const routes: RouteItems[] = [
  {
    label: 'dashboard',
    horizontalNavLabel: 'Dashboard',
    active: true,
    icon: UilChartPie,
    labelDisabled: true,
    pages: [
      {
        name: 'Dashboard',
        icon: 'pie-chart',
        active: true,
        flat: true,
        pages: [
          {
            name: 'Dispatch',
            path: '/',
            pathName: 'default-dashboard',
            topNavIcon: 'shopping-cart',
            active: true
          },
          {
            name: 'CRM',
            path: '/dashboard/crm',
            pathName: 'crm',
            topNavIcon: 'phone',
            active: true
          }
        ]
      }
    ]
  },
  {
    label: 'Dispatch',
    icon: UilCube,
    pages: [
      {
        name: 'loads',
        icon: 'truck', // Replace with an appropriate icon for "load"
        active: true,
        pages: [
          {
            name: 'create new load',
            path: '/operations-management/load/create-new-load',
            pathName: 'operations-create-new-load',
            active: true
          },
          {
            name: 'load list',
            path: '/operations-management/load/load-list',
            pathName: 'operations-load-list',
            active: true
          },
          {
            name: 'available loads',
            path: '/operations-management/load/available-loads',
            pathName: 'operations-available-loads',
            active: true
          },
          {
            name: 'dispatched loads',
            path: '/operations-management/load/dispatched-loads',
            pathName: 'operations-dispatched-loads',
            active: true
          },
          {
            name: 'delivered loads',
            path: '/operations-management/load/delivered-loads',
            pathName: 'operations-delivered-loads',
            active: true
          }
        ]
      },
      {
        name: 'dispatch',
        icon: 'navigation', // Replace with an appropriate icon for "dispatch"
        active: true,
        pages: [
          {
            name: 'create dispatch',
            path: '/operations-management/dispatch/create-dispatch',
            pathName: 'operations-create-dispatch',
            active: true
          },
          {
            name: 'active trips',
            path: '/operations-management/dispatch/active-trips',
            pathName: 'operations-active-trips',
            active: true
          },
          {
            name: 'dispatch history',
            path: '/operations-management/dispatch/dispatch-history',
            pathName: 'operations-dispatch-history',
            active: true
          }
        ]
      }
    ]
  },
  {
    label: 'CRM',
    icon: UilUsersAlt, // Replace with a compatible icon or import a specific one
    pages: [
      {
        name: 'customers',
        icon: 'users', // Replace with an appropriate icon
        active: true,
        pages: [
          {
            name: 'add customer',
            path: '/client-management/customers/add',
            pathName: 'client-management-add-customer',
            active: true
          },
          {
            name: 'customer list',
            path: '/client-management/customers/list',
            pathName: 'client-management-customer-list',
            active: true
          }
        ]
      },
      {
        name: 'Locations',
        icon: 'truck', // Replace with an appropriate icon
        active: true,
        pages: [
          {
            name: 'Add Location',
            path: '/client-management/shippers-receivers/add',
            pathName: 'client-management-add-shipper-receiver',
            active: true
          },
          {
            name: 'Locations List',
            path: '/client-management/shippers-receivers/list',
            pathName: 'client-management-shipper-receiver-list',
            active: true
          }
        ]
      },
      {
        name: 'cross-dock',
        icon: 'box',
        active: true,
        pages: [
          {
            name: 'add cross-dock',
            path: '/client-management/cross-dock/add',
            pathName: 'client-management-add-cross-dock',
            active: true
          },
          {
            name: 'cross-dock list',
            path: '/client-management/cross-dock/list',
            pathName: 'client-management-cross-dock-list',
            active: true
          }
        ]
      },
      {
        name: 'CRM',
        icon: 'phone',
        active: true,
        pages: [
          {
            name: 'analytics',
            path: '/apps/crm/analytics',
            pathName: 'crm-analytics',
            active: true
          },
          {
            name: 'deals',
            path: '/apps/crm/deals',
            pathName: 'crm-deals',
            active: true
          },
          {
            name: 'deal-details',
            path: '/apps/crm/deal-details',
            pathName: 'crm-deal-details',
            active: true
          },
          {
            name: 'leads',
            path: '/apps/crm/leads',
            pathName: 'crm-leads',
            active: true
          },
          {
            name: 'lead details',
            path: '/apps/crm/lead-details',
            pathName: 'crm-lead-details',
            active: true
          },
          {
            name: 'reports',
            path: '/apps/crm/reports',
            pathName: 'crm-reports',
            active: true
          },
          {
            name: 'report details',
            path: '/apps/crm/report-details',
            pathName: 'crm-report-details',
            active: true
          },
          {
            name: 'add-contact',
            path: '/apps/crm/add-contact',
            pathName: 'crm-add-contact',
            active: true
          }
        ]
      }
    ]
  },
  {
    label: 'Fleet',
    icon: UilCube,
    pages: [
      {
        name: 'Trucks',
        icon: 'truck', // Replace with an appropriate icon for "load"
        active: true,
        pages: [
          {
            name: 'Create New Truck',
            path: '/operations-management/load/create-new-load',
            pathName: 'operations-create-new-load',
            active: true
          },
          {
            name: 'Truck List',
            path: '/operations-management/load/load-list',
            pathName: 'operations-load-list',
            active: true
          }
        ]
      },
      {
        name: 'Trailers',
        icon: 'navigation', // Replace with an appropriate icon for "dispatch"
        active: true,
        pages: [
          {
            name: 'Create New Trailer',
            path: '/operations-management/dispatch/create-dispatch',
            pathName: 'operations-create-dispatch',
            active: true
          },
          {
            name: 'Trailer List',
            path: '/operations-management/dispatch/active-trips',
            pathName: 'operations-active-trips',
            active: true
          }
        ]
      }
    ]
  },
  {
    label: 'Accounting',
    icon: UilCube,
    pages: [
      {
        name: 'Settlements',
        icon: 'truck', // Replace with an appropriate icon for "load"
        active: true,
        pages: [
          {
            name: 'Create Settlement',
            path: '/operations-management/load/create-new-load',
            pathName: 'operations-create-new-load',
            active: true
          },
          {
            name: 'Settlement History',
            path: '/operations-management/load/load-list',
            pathName: 'operations-load-list',
            active: true
          }
        ]
      },
      {
        name: 'Invoices',
        icon: 'navigation', // Replace with an appropriate icon for "dispatch"
        active: true,
        pages: [
          {
            name: 'Create New Invoice',
            path: '/operations-management/dispatch/create-dispatch',
            pathName: 'operations-create-dispatch',
            active: true
          },
          {
            name: 'Invoice List',
            path: '/operations-management/dispatch/active-trips',
            pathName: 'operations-active-trips',
            active: true
          }
        ]
      },
      {
        name: 'Accounts Receivable',
        icon: 'navigation', // Replace with an appropriate icon for "dispatch"
        active: true,
        pages: [
          {
            name: 'Unpaid Invoices',
            path: '/operations-management/dispatch/create-dispatch',
            pathName: 'operations-create-dispatch',
            active: true
          },
          {
            name: 'Paid Invoices',
            path: '/operations-management/dispatch/active-trips',
            pathName: 'operations-active-trips',
            active: true
          }
        ]
      }
    ]
  },
  {
    label: 'apps',
    icon: UilCube,
    pages: [
      {
        name: 'chat',
        icon: 'message-square',
        path: '/apps/chat',
        pathName: 'app-chat',
        active: true
      },
      {
        name: 'email',
        icon: 'mail',
        active: true,
        pages: [
          {
            name: 'inbox',
            path: '/apps/email/inbox',
            pathName: 'email-inbox',
            active: true
          },
          {
            name: 'email-detail',
            path: '/apps/email/email-detail',
            pathName: 'email-detail',
            active: true
          },
          {
            name: 'compose',
            path: '/apps/email/compose',
            pathName: 'email-compose',
            active: true
          }
        ]
      },
      {
        name: 'calendar',
        icon: 'calendar',
        path: 'apps/calendar',
        pathName: 'app-calendar',
        active: true
      }
    ]
  },
  {
    label: 'pages',
    icon: UilFilesLandscapesAlt,
    pages: [
      {
        name: 'landing',
        icon: 'globe',
        active: true,
        pages: [
          {
            name: 'default',
            path: '/pages/landing/default',
            pathName: 'landing-default',
            active: true
          }
        ]
      },
      {
        name: 'users',
        icon: 'users',
        path: '/pages/users',
        pathName: 'users',
        active: true
      },
      {
        name: 'timeline',
        icon: 'clock',
        path: '/pages/timeline',
        pathName: 'timeline-page',
        active: true
      },
      {
        name: 'authentication',
        icon: 'lock',
        active: true,
        pages: [
          {
            name: 'split',
            active: true,
            pages: [
              {
                name: 'sign-in',
                path: '/auth/sign-in',
                pathName: 'split-signin',
                active: true
              },
              {
                name: 'sign-up',
                path: '/auth/sign-up',
                pathName: 'split-signup',
                active: true
              },
              {
                name: 'sign-out',
                path: '/auth/sign-out',
                pathName: 'split-signout',
                active: true
              },
              {
                name: 'forgot-password',
                path: '/auth/forgot-password',
                pathName: 'split-forgot-password',
                active: true
              },
              {
                name: 'reset-password',
                path: '/auth/reset-password',
                pathName: 'split-reset-password',
                active: true
              },
              {
                name: 'lock-screen',
                path: '/auth/lock-screen',
                pathName: 'split-lock-screen',
                active: true
              },
              {
                name: '2FA',
                path: '/auth/2FA',
                pathName: 'split-2FA',
                active: true
              }
            ]
          }
        ]
      }
    ]
  }
];
