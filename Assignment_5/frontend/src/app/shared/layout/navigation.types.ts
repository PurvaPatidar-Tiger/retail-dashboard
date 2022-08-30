export const MenuItemConfig = [
  {
    displayName: 'Dashboard',
    matIcon: 'dashboard',
    routerLink: '/app/dashboard',
  },
  {
    displayName: 'Analytics',
    matIcon: 'multiline_chart',
    routerLink: '/app/analytics',
  },
  {
    displayName: 'Admin',
    matIcon: 'supervised_user_circle',
    children: [
      {
        displayName: 'Users',
        matIcon: 'perm_identity',
        routerLink: '/admin/users',
      },
      {
        displayName: 'Example',
        matIcon: 'layers',
        routerLink: '/admin/example',
      },
    ],
  },
];
