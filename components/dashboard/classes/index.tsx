/*eslint-disable*/
'use client';

import ClassesTable from '@/components/dashboard/classes/table/ClassesTable';
import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { LuCircleFadingPlus } from 'react-icons/lu';
import { Toaster } from 'sonner';
interface Props {
  user: User | null | undefined;
  userDetails: { [x: string]: any } | null | any;
  classes: null | any;
}

export default function Page(props: Props) {
  const { classes, user, userDetails } = props;

  return (
    <DashboardLayout
      user={user}
      userDetails={userDetails}
      title="Subscription Page"
      description="Manage your subscriptions"
    >
        <Toaster position="top-right"/>
      <div className="min-h-screen w-full">
        <div className="flex justify-end mb-3">
          <Link href={'/dashboard/classes/create'}>
            <Button variant="outline" size="sm">
              <LuCircleFadingPlus className="mr-1" /> Add Class
            </Button>
          </Link>
        </div>
        {/* Conversion and talbes*/}
        <div className="w-full rounded-lg ">
          <ClassesTable  tableData={classes} />
        </div>
      </div>
    </DashboardLayout>
  );
}
