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
  HiOutlineBookOpen
} from 'react-icons/hi2';

export const routes: IRoute[] = [
  {
    name: 'Dashboard',
    path: '/dashboard/main',
    icon: <HiOutlineHome className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false
  },
   {
    name: 'Students List',
    path: '/dashboard/students',
    icon: <HiOutlineUserPlus className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false
  },
   {
    name: 'Teachers List',
    path: '/dashboard/teachers',
    icon: <HiOutlineUsers className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false
  },
  {
    name: 'Courses List',
    path: '/dashboard/courses',
    icon: <HiOutlineBookOpen className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false
  },
  {
    name: 'Users List',
    path: '/dashboard/users-list',
    icon: (
      <HiOutlineUserCircle className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false,
  },
  {
    name: 'Departments List',
    path: '/dashboard/departments',
    icon: (
      <HiOutlineBuildingOffice className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false,
  },
  {
    name: 'AI Chat',
    path: '/dashboard/ai-chat',
    icon: (
      <HiOutlineCpuChip className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false
  },
  {
    name: 'Profile Settings',
    path: '/dashboard/settings',
    icon: (
      <HiOutlineCog8Tooth className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false
  },
  {
    name: 'AI Generator',
    path: '/dashboard/ai-generator',
    icon: (
      <HiOutlineDocumentText className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false,
    disabled: true
  },
  {
    name: 'AI Assistant',
    path: '/dashboard/ai-assistant',
    icon: <HiOutlineUser className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false,
    disabled: true
  },
  
  {
    name: 'Subscription',
    path: '/dashboard/subscription',
    icon: (
      <HiOutlineCreditCard className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false,
    disabled: true
  },
  {
    name: 'Landing Page',
    path: '/home',
    icon: (
      <HiOutlineDocumentText className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false,
    disabled: true
  },
  {
    name: 'Pricing Page',
    path: '/pricing',
    icon: (
      <HiOutlineCurrencyDollar className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false,
    disabled: true
  }
];
