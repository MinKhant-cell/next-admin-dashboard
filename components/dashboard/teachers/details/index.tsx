/*eslint-disable*/
'use client';
import { useRouter } from 'next/navigation';

import CoursesTable from '@/components/dashboard/courses/table/CoursesTable';
import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { LuChevronsLeft, LuArrowLeft, LuCircleFadingPlus } from 'react-icons/lu';
import { toast, Toaster } from 'sonner';
import { Card } from '@/components/ui/card';
import Separator from '@/components/auth-ui/Separator';
import { Badge } from '@/components/ui/badge';
import { getStudentById } from '@/hooks/useStudents';
import { getTeacherById } from '@/hooks/useTeachers';
interface Props {
  user: User | null | undefined;
  userDetails: { [x: string]: any } | null | any;
  id: string | number;
}

export default function TeacherDetailsPage(props: Props) {
  const { user, userDetails, id } = props;

  const { teacher, isLoading, isError } = getTeacherById(id);

  const statusColors: Record<string, string> = {
    upcoming:
      'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100',
    active: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100',
    ongoing:
      'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-100',
    full: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-100',
    completed:
      'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900 dark:text-indigo-100',
    paused:
      'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100',
    inactive:
      'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100'
  };

  const renderRow = (label: string, value: any) => (
    <div className="grid grid-flow-col grid-cols-4 mb-3 text-xs">
      <span className=" col-span-2 text-gray-600 dark:text-zinc-400">
        {label}
      </span>
      {label == 'Status' ? (
        <div>
          <Badge
            variant="outline"
            className={`${statusColors[value]} capitalize font-medium`}
          >
            {value || '-'}
          </Badge>
        </div>
      ) : (
        <span className="col-span-2 font-medium text-gray-900 dark:text-zinc-200">
          {value || '-'}
        </span>
      )}
    </div>
  );
  return (
    <DashboardLayout
      user={user}
      userDetails={userDetails}
      title="Subscription Page"
      description="Manage your subscriptions"
    >
      <Toaster position="top-right" />
      <div className="flex gap-5">
        <div>
          <Link href={'/dashboard/teachers'}>
            <Button className="hover:dark:bg-gray-800 hover:dark:text-white" variant="outline" size="sm">
              <LuArrowLeft/> 
            </Button>
          </Link>
        </div>
        <Card className={'h-full py-3 w-full sm:overflow-auto'}>
          <div className="px-5">
            <h1 className="text-gray-700 dark:text-gray-300 font-medium text-lg">
              Teacher Information
            </h1>
          </div>
          <Separator />

          <div className="px-5">
            {isLoading ? (
              <p>Loading ...</p>
            ) : (
              <div>
                {renderRow('Name', teacher.name)}
                {renderRow('Email', teacher.email)}
                {renderRow('Phone', teacher.phone)}
                {renderRow('Gender', teacher.gender)}
                {renderRow('Country', teacher.country)}
                {renderRow('Status', teacher.status)}
                {renderRow('Created At', teacher.createdAt)}
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
