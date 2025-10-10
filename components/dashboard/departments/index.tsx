/*eslint-disable*/
'use client';

import DepartmentTable from '@/components/dashboard/departments/cards/DepartmentTable';
import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { LuCircleFadingPlus } from 'react-icons/lu';
import CreateDepartmentSheet from './components/CreateDepartmentSheet';
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
      <div className="min-h-screen w-full">
        <div className="flex justify-end mb-3">
          <CreateDepartmentSheet/>
        </div>
        
        {/* Conversion and talbes*/}
        <div className="w-full rounded-lg ">
          <DepartmentTable  tableData={departments} />
        </div>
      </div>
    </DashboardLayout>
  );
}
