/*eslint-disable*/
'use client';
import { useRouter } from 'next/navigation';

import TeachersTable from '@/components/dashboard/teachers/table/TeachersTable';
import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { LuCircleFadingPlus } from 'react-icons/lu';
import { toast, Toaster } from 'sonner';
import { DeleteCourse } from './hooks/useTeacher';
import TableTabs from './table/TableTabs';
import { useMemo, useState } from 'react';
interface Props {
  user: User | null | undefined;
  userDetails: { [x: string]: any } | null | any;
  teachers: null | any;
}

export default function TeacherPage(props: Props) {
  const { teachers, user, userDetails } = props;
  const router = useRouter();
  const [filter, setFilter] = useState('All');

  const filteredTeachers = useMemo(() => {
    if (filter === 'All') return teachers;
    return teachers.filter(
      (teacher) => teacher.status?.toLowerCase() === filter.toLowerCase()
    );
  }, [filter, teachers]);


  // course delete func
  const handleCourseDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete?');
    if (!confirmed) return;
    const { error, data } = await DeleteCourse(id);
    if (!error) {
      toast.success('Class deleted successfully 🎉');
    } else {
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
      <Toaster position="top-right" />
      <div className="min-h-screen w-full">
        <div className="flex justify-between mb-3">
          <TableTabs value={filter} onChange={setFilter}/>
          <Link href={'/dashboard/teachers/create'}>
            <Button className="hover:dark:bg-gray-800 hover:dark:text-white" variant="outline" size="sm">
              <LuCircleFadingPlus className="mr-1" /> Add Teacher
            </Button>
          </Link>
        </div>
        <div className="w-full rounded-lg ">
          <TeachersTable onDelete={handleCourseDelete} tableData={filteredTeachers} />
        </div>
      </div>
    </DashboardLayout>
  );
}

