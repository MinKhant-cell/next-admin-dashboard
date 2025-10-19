/*eslint-disable*/
'use client';
import { useRouter } from 'next/navigation';

import CoursesTable from '@/components/dashboard/courses/table/CoursesTable';
import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { LuChevronsLeft } from 'react-icons/lu';
import { toast, Toaster } from 'sonner';
import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import Separator from '@/components/auth-ui/Separator';
import { Badge } from '@/components/ui/badge';
interface Props {
  user: User | null | undefined;
  userDetails: { [x: string]: any } | null | any;
  course: null | any;
}

export default function CourseDetailsPage(props: Props) {
  const { course, user, userDetails } = props;
  const statusColors: Record<string, string> = {
    upcoming:
      'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100',
    open: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100',
    ongoing:
      'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-100',
    full: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-100',
    completed:
      'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900 dark:text-indigo-100',
    paused:
      'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100',
    canceled:
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
            {value}
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
      <div className="grid gap-5 grid-cols-3">
        <Card className={'h-full py-3 w-full sm:overflow-auto'}>
          <div className="px-5">
            <h1 className="text-gray-700 dark:text-gray-300 font-medium text-lg">
              Course Information
            </h1>
          </div>
          <Separator/>
          <div className="px-5">
            {renderRow('Name', course.name)}
            {renderRow('Assign Teacher', course.teachers.name)}
            {renderRow('Fees', course.fees +' '+course.currency)}
            {renderRow('Start Date', course.start_date)}
            {renderRow('End Date', course.end_date)}
            {renderRow('Status', course.status)}
            {renderRow('Description', course.description)}
          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
}
