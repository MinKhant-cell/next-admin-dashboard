/*eslint-disable*/
'use client';

import DepartmentTable from '@/components/dashboard/departments/cards/DepartmentTable';
import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { LuCircleFadingPlus } from 'react-icons/lu';
interface Props {
  user: User | null | undefined;
  userDetails: { [x: string]: any } | null | any;
  departments: null | any;
}

export default function Page(props: Props) {
  const {departments, user, userDetails} = props;
  console.log(departments)

  return (
    <DashboardLayout
      user={user}
      userDetails={userDetails}
      title="Subscription Page"
      description="Manage your subscriptions"
    >
      <div className="h-full w-full">
        <div className="flex justify-end mb-3">
          <div>
            <Link href="/departments/create">
          <Button variant="outline" size="sm">
            <LuCircleFadingPlus className="mr-1" /> New Department
          </Button>
        </Link>
          </div>
        </div>
        
        {/* Conversion and talbes*/}
        {/* <div className="w-full rounded-lg ">
          <DepartmentTable  tableData={departments} />
        </div> */}
      </div>
    </DashboardLayout>
  );
}
