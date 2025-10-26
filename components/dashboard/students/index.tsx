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
import { useEffect, useMemo, useState } from 'react';
import { getStudents, useStudents } from '@/hooks/useStudents';
import TableSkeletons from './table/TableSkeletons';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '@/components/ui/input-group';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
interface Props {
  user: User | null | undefined;
  userDetails: { [x: string]: any } | null | any;
}

export default function StudentsPage(props: Props) {
  const { user, userDetails } = props;
  const router = useRouter();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [filter, setFilter] = useState({gender: '', email: '', name: ''});

  const { students, isError, isLoading } = getStudents(
    pagination.pageIndex + 1,
    pagination.pageSize,
    filter
  );
  console.log(students);
  console.log(pagination);
  const handleStudentsDelete = async (id: number) => {
    // const {data, status, message, error} = await deleteStudent(id);
    // if (!error) {
    //   toast.success(message);
    //   router.refresh();
    // } else {
    //   toast.error(message);
    // }
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
          <div>
            <InputGroup>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="flex gap-3 items-center">
            <div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem className="text-gray-800" value="ACTIVE">ACTIVE</SelectItem>
                    <SelectItem className="text-gray-800" value="INACTIVE">INACTIVE</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={filter.gender} onValueChange={(value) => setFilter((prev) => ({ ...prev, gender: value }))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Gender"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem className="text-gray-800" value="MALE">MALE</SelectItem>
                    <SelectItem className="text-gray-800" value="FEMALE">FEMALE</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
       
       
      <Link href={'/dashboard/students/create'}>
            <Button
              className="hover:dark:bg-gray-800 hover:dark:text-white"
              variant="outline"
              size="sm"
            >
              <LuCircleFadingPlus className="mr-1" /> Add Student
            </Button>
          </Link>
          </div>
        
        </div>
        <div className="w-full rounded-lg ">
          {isLoading ? (
            <TableSkeletons />
          ) : (
            <StudentsTable
              students={students.data}
              totalCount={students.meta.total}
              pagination={pagination}
              onPaginationChange={setPagination}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
