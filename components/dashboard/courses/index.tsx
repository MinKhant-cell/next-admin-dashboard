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
import { useEffect, useMemo, useState } from 'react';
import TableSkeletons from './table/TableSkeletons';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '@/components/ui/input-group';
import { ArrowUpIcon, Search, Filter, FolderDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { mutate } from 'swr';
import { deleteCourse, getCourses } from '@/hooks/useCourses';

export default function CoursesPage() {
  const router = useRouter();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [filter, setFilter] = useState({
    search: ''
  });
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const fetchParams = new URLSearchParams({
    page: String(pagination.pageIndex + 1),
    limit: String(pagination.pageSize)
  });
  const { courses, isError, isLoading } = getCourses(
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
    try {
      const response = await deleteCourse(id); 
      
      if (response.ok) {
        if (filter.search) fetchParams.append('search', filter.search);
        mutate(`/courses?${fetchParams.toString()}`);
        toast.success('Course deleted successfully!');
      } else {
        const errorData = await response.json();
        console.error('❌ Delete error:', errorData);
        toast.error(errorData.message || 'Delete failed');
      }
    } catch (error) {
      console.error('❌ Delete error:', error);
      toast.error('Delete Failed');
    }
  };
  

  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <div className="min-h-screen w-full">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl text-gray-700 font-semibold">Courses List</h1>
          <Link href={'/dashboard/courses/create'}>
            <Button
              className="hover:dark:bg-gray-800 hover:dark:text-white"
              variant="outline"
              size="sm"
            >
              <LuCircleFadingPlus className="mr-1" /> Add Course
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

            {/* <div>
              <Select
                value={filter.gender}
                onValueChange={(value) =>
                  setFilter((prev) => ({ ...prev, gender: value }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem className="text-gray-800" value="MALE">
                      MALE
                    </SelectItem>
                    <SelectItem className="text-gray-800" value="FEMALE">
                      FEMALE
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
          </div>
        </div>
        <div className="w-full rounded-lg ">
          {isLoading ? (
            <TableSkeletons />
          ) : (
            <CoursesTable
              data={courses.data || []}
              totalCount={courses.meta?.total || 0}
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
