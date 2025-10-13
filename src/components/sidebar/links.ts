export interface SubLink {
  label: string;
  to: string;
}

export interface SidebarLink {
  label: string;
  to?: string; // optional if dropdown
  subLinks?: SubLink[];
}

export const sidebarLinks: SidebarLink[] = [
  {
    label: 'Dashboard',
    subLinks: [
      { label: 'Admin Dashboard', to: '/dashboard/admin' }
    ],
  },
  {
    label: 'Students',
    subLinks: [
      { label: 'Students', to: '/student' }
    ],
  },
  {
    label: 'Teachers',
    subLinks: [
      { label: 'Teachers', to: '/teacher' }
    ],
  },
  { label: 'Courses', to: '/course' },
  { label: 'Classes', to: '/class' },
  { label: 'Attendances', to: '/attendance' },
  { label: 'Attendance Dashboard', to: '/attendance/dashboard' },
  { label: 'Profile', to: '/profile' },
];
