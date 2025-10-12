/*eslint-disable*/
'use client';

import MainChart from '@/components/dashboard/main/cards/MainChart';
import TeacherTable from '@/components/dashboard/teachers/components/TeacherTable';
import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import tableDataUserReports from '@/variables/tableDataUserReports';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { LuCircleFadingPlus } from 'react-icons/lu';
import { FetchTeachers } from './hooks/useTeacher';
import { toast, Toaster } from "sonner"
interface Props {
  user: User | null | undefined;
  userDetails: { [x: string]: any } | null | any;
  teachers: any;
}

export default function Page(props: Props) {
  const {user, userDetails, teachers} = props
  return (
    <DashboardLayout
      user={props.user}
      userDetails={props.userDetails}
      title="Subscription Page"
      description="Manage your subscriptions"
    >
      <div className="h-full w-full">
        <div className="flex justify-end mb-3">
          <Link href={'/dashboard/teachers/create'}>
          <Button variant="outline" size="sm">
          <LuCircleFadingPlus className="mr-1" /> Add Teacher
        </Button>
          </Link>

          <Button
      variant="outline"
      onClick={() =>
       toast.success('Event has been created')

      }
    >
      Show Toast
    </Button>
          
        </div>
        {/* Conversion and talbes*/}
        <div className="h-full w-full rounded-lg ">
          <TeacherTable tableData={teachers || []}/>
        </div>
      </div>
      <Toaster position="top-right"/>
    </DashboardLayout>
  );
}
