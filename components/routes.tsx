// Auth Imports
import { IRoute } from '@/types/types';
import {
  HiOutlineHome,
  HiOutlineCpuChip,
  HiOutlineUsers,
  HiOutlineUser,
  HiOutlineCog8Tooth,
  HiOutlineCreditCard,
  HiOutlineDocumentText,
  HiOutlineCurrencyDollar,
  HiOutlineUserCircle,
  HiOutlineUserPlus,
  HiOutlineBuildingOffice,
  HiOutlineBookOpen,
  HiCalendar,
  HiOutlineCalendar
} from 'react-icons/hi2';

import { UsersRound, Notebook, BookOpenText, Blocks, Calendar } from 'lucide-react';

export const routes: IRoute[] = [
  {
    name: 'Dashboard',
    path: '/dashboard/main',
    icon: <HiOutlineHome className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false
  },
  {
    name: 'Classrooms List',
    path: '/dashboard/classrooms',
    icon: <Blocks className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false
  },
  {
    name: 'Courses List',
    path: '/dashboard/courses',
    icon: <BookOpenText className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false
  },
  {
    name: 'Subjects List',
    path: '/dashboard/subjects',
    icon: <Notebook className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false
  },
  //  {
  //   name: 'Students List',
  //   path: '/dashboard/students',
  //   icon: <HiOutlineUserPlus className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
  //   collapse: false
  // },
   {
    name: 'Teachers List',
    path: '/dashboard/teachers',
    icon: <UsersRound className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false
  },
  {
    name: 'Timetables List',
    path: '/dashboard/timetables',
    icon: <Calendar className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false
  },
  
  // {
  //   name: 'Calendar',
  //   path: '/dashboard/calendar',
  //   icon: <HiOutlineCalendar className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
  //   collapse: false
  // },
  // {
  //   name: 'Users List',
  //   path: '/dashboard/users-list',
  //   icon: (
  //     <HiOutlineUserCircle className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
  //   ),
  //   collapse: false,
  // },
  // {
  //   name: 'Departments List',
  //   path: '/dashboard/departments',
  //   icon: (
  //     <HiOutlineBuildingOffice className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
  //   ),
  //   collapse: false,
  // },
  // {
  //   name: 'Profile Settings',
  //   path: '/dashboard/settings',
  //   icon: (
  //     <HiOutlineCog8Tooth className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
  //   ),
  //   collapse: false
  // },
];
