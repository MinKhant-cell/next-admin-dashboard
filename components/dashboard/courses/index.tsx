/*eslint-disable*/
'use client';
import { useRouter } from 'next/navigation';

import CoursesTable from '@/components/dashboard/courses/table/CoursesTable';
import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { LuCircleFadingPlus } from 'react-icons/lu';
import { toast, Toaster } from 'sonner';
import { DeleteCourse } from './hooks/useCourses';
import TableTabs from './table/TableTabs';
import { useMemo, useState } from 'react';
interface Props {
  user: User | null | undefined;
  userDetails: { [x: string]: any } | null | any;
  courses: null | any;
}

export default function ClassesPage(props: Props) {
  const { courses, user, userDetails } = props;
  const router = useRouter();
  const [filter, setFilter] = useState('All');

  const filteredCourses = useMemo(() => {
    if (filter === 'All') return courses;
    return courses.filter(
      (course) => course.status?.toLowerCase() === filter.toLowerCase()
    );
  }, [filter, courses]);


  // course delete func
  const handleCourseDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete?');
    if (!confirmed) return;
    const { error, data } = await DeleteCourse(id);
    if (!error) {
      toast.success('Class deleted successfully 🎉');
      router.refresh();
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
          <Link href={'/dashboard/courses/create'}>
            <Button className="hover:dark:bg-gray-800 hover:dark:text-white" variant="outline" size="sm">
              <LuCircleFadingPlus className="mr-1" /> Add Course
            </Button>
          </Link>
        </div>
        <div className="w-full rounded-lg ">
          <CoursesTable onDelete={handleCourseDelete} tableData={filteredCourses} />
        </div>
      </div>
    </DashboardLayout>
  );
}
