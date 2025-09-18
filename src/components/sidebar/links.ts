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
      { label: 'Admin Dashboard', to: '/dashboard/admin' },
      { label: 'Student Dashboard', to: '/dashboard/student' },
      { label: 'Teacher Dashboard', to: '/dashboard/teacher' },
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
  { label: 'Attendance', to: '/attendance' },
  { label: 'Exams & Results', to: '/exams' },
  { label: 'Profile', to: '/profile' },
  { label: 'Settings', to: '/settings' },
];
