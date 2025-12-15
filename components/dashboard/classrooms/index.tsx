/*eslint-disable*/
'use client';
import { useRouter } from 'next/navigation';

import ClassroomTable from '@/components/dashboard/classrooms/table/ClassroomsTable';
import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LuCircleFadingPlus } from 'react-icons/lu';
import { toast, Toaster } from 'sonner';
import { useEffect, useState } from 'react';
import TableSkeletons from './table/TableSkeletons';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '@/components/ui/input-group';
import { Search, Filter, FolderDown } from 'lucide-react';
import { mutate } from 'swr';
import { deleteCourse } from '@/hooks/useCourses';
import { getClassrooms } from '@/hooks/useClassrooms';

export default function ClassroomsPage() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [filter, setFilter] = useState({
    search: ''
  });
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const fetchParams = new URLSearchParams({
    page: String(pagination.pageIndex + 1),
    limit: String(pagination.pageSize)
  });
  const { classrooms, isError, isLoading } = getClassrooms(
    pagination.pageIndex + 1,
    pagination.pageSize,
    filter
  );

  useEffect(() => {
    const searchHandler = setTimeout(() => {
      setFilter((prev) => ({ ...prev, search: debouncedSearch }));
    }, 1000);
    return () => clearTimeout(searchHandler);
  }, [debouncedSearch]);

  const handleCoursesDelete = async (id: number) => {
    const { status, message, error } = await deleteCourse(id);
    if (!error && status == 204) {
      if (filter.search) fetchParams.append('search', filter.search);
      mutate(`/courses?${fetchParams.toString()}`);
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <DashboardLayout
      title="Subscription Page"
      description="Manage your subscriptions"
    >
      <Toaster position="top-right" />
      <div className="min-h-screen w-full">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl text-gray-700 font-semibold">Classrooms List</h1>
          <Link href={'/dashboard/courses/create'}>
            <Button
              className="hover:dark:bg-gray-800 hover:dark:text-white"
              variant="outline"
              size="sm"
            >
              <LuCircleFadingPlus className="mr-1" /> Add Classrooms
            </Button>
          </Link>
        </div>
        <div className="flex justify-between mb-3">
          <div>
            <InputGroup>
              <InputGroupInput
                onChange={(e) => setDebouncedSearch(e.target.value)}
                value={debouncedSearch}
                placeholder="Search..."
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="flex gap-3 items-center">
            <Button variant="outline" size="icon">
              <Filter />
            </Button>
            <Button variant="outline" size="icon">
              <FolderDown />
            </Button>

          </div>
        </div>
        <div className="w-full rounded-lg ">
          {isLoading ? (
            <TableSkeletons />
          ) : (
            <ClassroomTable
              data={classrooms.data || []}
              totalCount={classrooms.meta?.total || 0}
              pagination={pagination}
              onPaginationChange={setPagination}
              onDelete={handleCoursesDelete}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
