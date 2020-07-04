export interface BRoutes {
  link?: string;
  label: string;
}

export interface RouteArray extends Array<BRoutes> {}

export interface MainRouteData {
  id: string;
  routes: RouteArray;
}

export const routeData: Array<MainRouteData> = [
  {
    id: '001',
    routes: [{ label: 'My shop', link: '/my-shop' }, { label: 'Dashboard' }]
  },
  {
    id: '002',
    routes: [{ label: 'My shop', link: '/my-shop' }, { label: 'Messages' }]
  },
  {
    id: '003',
    routes: [{ label: 'Home', link: '/home' }, { label: 'Disease Identifier' }]
  }
];
