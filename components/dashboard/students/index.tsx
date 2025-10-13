/*eslint-disable*/
'use client';

import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { LuCircleFadingPlus } from 'react-icons/lu';
import StudentTable from './components/StudentTable';
interface Props {
  user: User | null | undefined;
  userDetails: { [x: string]: any } | null | any;
}

export default function Page(props: Props) {
  return (
    <DashboardLayout
      user={props.user}
      userDetails={props.userDetails}
      title="Subscription Page"
      description="Manage your subscriptions"
    >
      <div className="h-full w-full">
        <div className="flex justify-end mb-3">
          <Link href={'/dashboard/students/create'}>
          <Button variant="outline" size="sm">
          <LuCircleFadingPlus className="mr-1" /> Add Student
        </Button>
          </Link>
        </div>
        {/* Conversion and talbes*/}
        <div className="h-full w-full rounded-lg ">
          <StudentTable tableData={[]}/>
        </div>
      </div>
    </DashboardLayout>
  );
}
