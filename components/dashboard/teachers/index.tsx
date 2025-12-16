/*eslint-disable*/
'use client';
import { useRouter } from 'next/navigation';
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
import { Search } from 'lucide-react';
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
import TeachersTable from './table/TeachersTable';
import { deletTeacher, getTeachers } from '@/hooks/useTeachers';


export default function TeachersPage() {
  const router = useRouter();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [filter, setFilter] = useState({
    gender: '',
    email: '',
    name: '',
    search: ''
  });
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const { teachers, isError, isLoading } = getTeachers(
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

  const handleTeacherDelete = async (id: number) => {
    const { status, message, error } = await deletTeacher(id);
    if (!error && status == 204) {
      const params = new URLSearchParams({
        page: String(pagination.pageIndex + 1),
        limit: String(pagination.pageSize)
      });
      if (filter.search) params.append('search', filter.search);
      mutate(`/teachers?${params.toString()}`);
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen w-full">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl text-gray-700 font-semibold">Teachers List</h1>
          <Link href={'/dashboard/teachers/create'}>
            <Button
              className="hover:dark:bg-gray-800 hover:dark:text-white"
              variant="outline"
              size="sm"
            >
              <LuCircleFadingPlus className="mr-1" /> Add Teacher
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
            <div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem className="text-gray-800" value="ACTIVE">
                      ACTIVE
                    </SelectItem>
                    <SelectItem className="text-gray-800" value="INACTIVE">
                      INACTIVE
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

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
            <TeachersTable
              data={teachers.data || []}
              totalCount={teachers.meta?.total || 0}
              pagination={pagination}
              onPaginationChange={setPagination}
              onDelete={handleTeacherDelete}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
