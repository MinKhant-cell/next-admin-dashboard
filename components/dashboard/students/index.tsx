/*eslint-disable*/
'use client';
import { useRouter } from 'next/navigation';

import StudentsTable from '@/components/dashboard/students/table/StudentsTable';
import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { LuCircleFadingPlus } from 'react-icons/lu';
import { toast, Toaster } from 'sonner';
import { DeleteCourse } from './hooks/useCourses';
import TableTabs from './table/TableTabs';
import { useMemo, useState } from 'react';
import { useStudents } from '@/hooks/useStudents';
interface Props {
  user: User | null | undefined;
  userDetails: { [x: string]: any } | null | any;
}

export default function ClassesPage(props: Props) {
  const { user, userDetails } = props;
  const router = useRouter();
  const [filter, setFilter] = useState('All');
  const {students, isLoading, isError, deleteStudent} = useStudents();
  console.log(students)
  // course delete func
  const handleStudentsDelete = async (id: number) => {
    const {data, status, message, error} = await deleteStudent(id);
    if (!error) {
      toast.success(message);
      router.refresh();
    } else {
      toast.error(message);
    }
  };

  return (
    <DashboardLayout
      user={user}
      userDetails={userDetails}
      title="Subscription Page"
      description="Manage your subscriptions"
    >
      <Toaster position="top-right" />
      <div className="min-h-screen w-full">
        <div className="flex justify-between mb-3">
          <TableTabs value={filter} onChange={setFilter}/>
          <Link href={'/dashboard/students/create'}>
            <Button className="hover:dark:bg-gray-800 hover:dark:text-white" variant="outline" size="sm">
              <LuCircleFadingPlus className="mr-1" /> Add Student
            </Button>
          </Link>
        </div>
        <div className="w-full rounded-lg ">

          {isLoading ? (
  <div>Loading...</div>
) : isError ? (
  <div>Error loading students</div>
) : (
  <StudentsTable onDelete={handleStudentsDelete} students={students} />
)}
        </div>
      </div>
    </DashboardLayout>
  );
}
