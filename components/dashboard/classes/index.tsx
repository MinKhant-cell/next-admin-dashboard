/*eslint-disable*/
'use client';
import { useRouter } from 'next/navigation';

import ClassesTable from '@/components/dashboard/classes/table/ClassesTable';
import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { LuCircleFadingPlus } from 'react-icons/lu';
import { toast, Toaster } from 'sonner';
import { DeleteClass } from './hooks/useClass';
interface Props {
  user: User | null | undefined;
  userDetails: { [x: string]: any } | null | any;
  classes: null | any;
  teachers: null | any;
}

export default function ClassesPage(props: Props) {
  const { classes, user, userDetails, teachers } = props;
  console.log("classes component")
  console.log(classes)
  const router = useRouter();

  const handleClassDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete?")
    if (!confirmed) return
    const { error, data } = await DeleteClass(id);
    console.log(id)
    if (!error) {
      toast.success('Class deleted successfully 🎉');
      router.refresh()
    } else {
      console.log(error);
      toast.error('Something went wrong 😢');
    }
  };

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
              <LuCircleFadingPlus className="mr-1"/> Add Class
            </Button>
          </Link>
        </div>
        <div className="w-full rounded-lg ">
          <ClassesTable onDelete={handleClassDelete} tableData={classes} />
        </div>
      </div>
    </DashboardLayout>
  );
}
