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
      { label: 'All Students', to: '/students/all' },
      { label: 'Student Details', to: '/students/details' },
    ],
  },
  {
    label: 'Teachers',
    subLinks: [
      { label: 'All Teachers', to: '/teachers/all' },
      { label: 'Teacher Details', to: '/teachers/details' },
    ],
  },
  { label: 'Courses', to: '/courses' },
  { label: 'Classes', to: '/classes' },
  { label: 'Attendance', to: '/attendance' },
  { label: 'Profile', to: '/profile' },
];
