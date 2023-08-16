import { ItemNav } from "src/app/models/itemNav";

export const navbarData: ItemNav[] = [
  {
      routeLink: '/pages/dashboard',
      icon: 'fal fa-home',
      label: 'Dashboard'
  },
  {
    routeLink: '/pages/influencers',
    icon: 'fal fa-users',
    label: 'Influencers'
}
  /*{
      routeLink: 'products',
      icon: 'fal fa-box-open',
      label: 'Products'
  },
  {
      routeLink: 'statistics',
      icon: 'fal fa-chart-bar',
      label: 'Statistics'
  },
  {
      routeLink: 'coupens',
      icon: 'fal fa-tags',
      label: 'Coupens'
  },
  {
      routeLink: 'pages',
      icon: 'fal fa-file',
      label: 'Pages'
  },
  {
      routeLink: 'media',
      icon: 'fal fa-camera',
      label: 'Media'
  },
  {
      routeLink: 'settings',
      icon: 'fal fa-cog',
      label: 'Settings'
  },
  */
];
