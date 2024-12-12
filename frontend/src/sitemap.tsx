import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import {
  Icon,
  UilChartPie,
  UilCube,
  UilFilesLandscapesAlt
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
    horizontalNavLabel: 'home',
    active: true,
    icon: UilChartPie,
    labelDisabled: true,
    pages: [
      {
        name: 'operations management',
        icon: 'clipboard', // Replace with a compatible string if using FontAwesome
        pages: [
          {
            name: 'load',
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
        name: 'client management',
        icon: 'users',
        pages: [
          {
            name: 'customers',
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
            name: 'shippers & receivers',
            active: true,
            pages: [
              {
                name: 'add shipper/receiver',
                path: '/client-management/shippers-receivers/add',
                pathName: 'client-management-add-shipper-receiver',
                active: true
              },
              {
                name: 'shipper/receiver list',
                path: '/client-management/shippers-receivers/list',
                pathName: 'client-management-shipper-receiver-list',
                active: true
              }
            ]
          },
          {
            name: 'cross-dock',
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
          }
        ]
      },
      {
        name: 'home',
        icon: 'pie-chart',
        active: true,
        flat: true,
        hasNew: true,
        pages: [
          {
            name: 'Dispatch Dashboard',
            path: '/',
            pathName: 'default-dashboard',
            topNavIcon: 'shopping-cart',
            active: true
          },
          {
            name: 'project-management',
            path: '/dashboard/project-management',
            pathName: 'project-management-dashbaord',
            topNavIcon: 'clipboard',
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
    label: 'apps',
    icon: UilCube,
    pages: [
      {
        name: 'CRM',
        icon: 'phone',
        active: true,
        hasNew: true,
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
            active: true,
            new: true
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
      },
      {
        name: 'project-management',
        icon: 'clipboard',
        active: true,
        pages: [
          {
            name: 'create new',
            path: '/apps/project-management/create-new',
            pathName: 'project-management-create-new',
            active: true
          },
          {
            name: 'project-list-view',
            path: '/apps/project-management/project-list-view',
            pathName: 'project-management-project-list-view',
            active: true
          },
          {
            name: 'project-card-view',
            path: '/apps/project-management/project-card-view',
            pathName: 'project-management-project-card-view',
            active: true
          },
          {
            name: 'project-board-view',
            path: '/apps/project-management/project-board-view',
            pathName: 'project-management-project-board-view',
            active: true
          },
          {
            name: 'todo-list',
            path: '/apps/project-management/todo-list',
            pathName: 'project-management-todo-list',
            active: true
          },
          {
            name: 'project-details',
            path: '/apps/project-management/project-details',
            pathName: 'project-management-project-details',
            active: true
          }
        ]
      },
      {
        name: 'travel-agency',
        hasNew: true,
        icon: 'clipboard',
        active: true,
        pages: [
          {
            name: 'landing',
            path: '/apps/travel-agency/landing',
            pathName: 'travel-agency-landing',
            active: true
          },
          {
            name: 'hotel',
            active: true,
            new: true,
            pages: [
              {
                name: 'admin',
                active: true,
                pages: [
                  {
                    name: 'add-property',
                    path: '/apps/travel-agency/hotel/admin/add-property',
                    pathName: 'travel-agency-add-property',
                    active: true
                  },
                  {
                    name: 'add-room',
                    path: 'apps/travel-agency/hotel/admin/add-room',
                    pathName: 'travel-agency-add-room',
                    active: true
                  },
                  {
                    name: 'room-listing',
                    path: 'apps/travel-agency/hotel/admin/room-listing',
                    pathName: 'travel-agency-room-listing',
                    active: true
                  },
                  {
                    name: 'search-room',
                    path: 'apps/travel-agency/hotel/admin/search-room',
                    pathName: 'travel-agency-search-room',
                    active: true
                  }
                ]
              },
              {
                name: 'customer',
                active: true,
                pages: [
                  {
                    name: 'homepage',
                    path: '/apps/travel-agency/hotel/customer/homepage',
                    pathName: 'hotel-homepage',
                    active: true
                  },
                  {
                    name: 'gallery',
                    path: '/apps/travel-agency/hotel/customer/gallery',
                    pathName: 'hotel-gallery',
                    active: true
                  },
                  {
                    name: 'hotel-details',
                    path: '/pages/coming-soon',
                    pathName: 'hotel-hotel-details',
                    active: false
                  },
                  {
                    name: 'hotel-compare',
                    path: '/pages/coming-soon',
                    pathName: 'hotel-hotel-compare',
                    active: false
                  },
                  {
                    name: 'checkout',
                    path: '/pages/coming-soon',
                    pathName: 'hotel-checkout',
                    active: false
                  },
                  {
                    name: 'payment',
                    path: '/pages/coming-soon',
                    pathName: 'hotel-payment',
                    active: false
                  }
                ]
              }
            ]
          },
          {
            name: 'flight',
            next: true,
            path: '/pages/coming-soon',
            pathName: 'travel-agency-flight'
          }
        ]
      },
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
        hasNew: true,
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
        name: 'members',
        icon: 'users',
        path: '/pages/members',
        pathName: 'members-page',
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
            name: 'simple',
            active: true,
            pages: [
              {
                name: 'sign-in',
                path: '/pages/authentication/simple/sign-in',
                pathName: 'simple-signin',
                active: true
              },
              {
                name: 'sign-up',
                path: '/pages/authentication/simple/sign-up',
                pathName: 'simple-signup',
                active: true
              },
              {
                name: 'sign-out',
                path: '/pages/authentication/simple/sign-out',
                pathName: 'simple-signout',
                active: true
              },
              {
                name: 'forgot-password',
                path: '/pages/authentication/simple/forgot-password',
                pathName: 'simple-forgot-password',
                active: true
              },
              {
                name: 'reset-password',
                path: '/pages/authentication/simple/reset-password',
                pathName: 'simple-reset-password',
                active: true
              },
              {
                name: 'lock-screen',
                path: '/pages/authentication/simple/lock-screen',
                pathName: 'simple-lock-screen',
                active: true
              },
              {
                name: '2FA',
                path: '/pages/authentication/simple/2FA',
                pathName: 'simple-2FA',
                active: true
              }
            ]
          },
          {
            name: 'split',
            active: true,
            pages: [
              {
                name: 'sign-in',
                path: '/sign-in',
                pathName: 'split-signin',
                active: true
              },
              {
                name: 'sign-up',
                path: '/pages/authentication/split/sign-up',
                pathName: 'split-signup',
                active: true
              },
              {
                name: 'sign-out',
                path: '/pages/authentication/split/sign-out',
                pathName: 'split-signout',
                active: true
              },
              {
                name: 'forgot-password',
                path: '/pages/authentication/split/forgot-password',
                pathName: 'split-forgot-password',
                active: true
              },
              {
                name: 'reset-password',
                path: '/pages/authentication/split/reset-password',
                pathName: 'split-reset-password',
                active: true
              },
              {
                name: 'lock-screen',
                path: '/pages/authentication/split/lock-screen',
                pathName: 'split-lock-screen',
                active: true
              },
              {
                name: '2FA',
                path: '/pages/authentication/split/2FA',
                pathName: 'split-2FA',
                active: true
              }
            ]
          },
          {
            name: 'Card',
            active: true,
            pages: [
              {
                name: 'sign-in',
                path: 'pages/authentication/card/sign-in',
                pathName: 'card-signin',
                active: true
              },
              {
                name: 'sign-up',
                path: 'pages/authentication/card/sign-up',
                pathName: 'card-signup',
                active: true
              },
              {
                name: 'sign-out',
                path: 'pages/authentication/card/sign-out',
                pathName: 'card-signout',
                active: true
              },
              {
                name: 'forgot-password',
                path: 'pages/authentication/card/forgot-password',
                pathName: 'card-forgot-password',
                active: true
              },
              {
                name: 'reset-password',
                path: 'pages/authentication/card/reset-password',
                pathName: 'card-reset-password',
                active: true
              },
              {
                name: 'lock-screen',
                path: 'pages/authentication/card/lock-screen',
                pathName: 'card-lock-screen',
                active: true
              },
              {
                name: '2FA',
                path: '/pages/authentication/card/2FA',
                pathName: 'card-2FA',
                active: true
              }
            ]
          }
        ]
      },
      {
        name: 'Settings',
        icon: faGear,
        iconSet: 'font-awesome', // Explicitly state the icon set
        path: '/settings',
        pathName: 'settings-panel',
        active: true
      }
    ]
  }
];
