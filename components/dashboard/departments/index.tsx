/*eslint-disable*/
'use client';

import DepartmentTable from '@/components/dashboard/departments/cards/DepartmentTable';
import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
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
           


<Sheet>
      <SheetTrigger asChild>
       <Button variant="outline" size="sm">
            <LuCircleFadingPlus className="mr-1" /> New Department
          </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Department</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>


          </div>
        </div>
        
        {/* Conversion and talbes*/}
        <div className="w-full rounded-lg ">
          <DepartmentTable  tableData={departments} />
        </div>
      </div>
    </DashboardLayout>
  );
}
