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
    routes: [{ label: 'My shop', link: '/my-shop' }, { label: 'Dashboard' }],
  },
  {
    id: '002',
    routes: [{ label: 'My shop', link: '/my-shop' }, { label: 'Messages' }],
  },
  {
    id: '003',
    routes: [{ label: 'My shop', link: '/my-shop' }, { label: 'Payments' }],
  },
  {
    id: '004',
    routes: [{ label: 'My shop', link: '/my-shop' }, { label: 'Settings' }],
  },
  {
    id: '005',
    routes: [{ label: 'My shop', link: '/my-shop' }, { label: 'Items' }],
  },
  {
    id: '006',
    routes: [
      { label: 'My shop', link: '/my-shop' },
      { label: 'Items', link: '/my-shop/shop-items' },
      { label: 'Add item' },
    ],
  },
  {
    id: '007',
    routes: [{ label: 'Home', link: '/home' }, { label: 'Disease Identifier' }],
  },
  {
    id: '008',
    routes: [
      { label: 'Home', link: '/home' },
      { label: 'Marketplace', link: '/marketplace' },
      { label: 'Shop Profile' },
    ],
  },
];
