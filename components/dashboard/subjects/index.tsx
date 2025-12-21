/*eslint-disable*/
'use client';
import { useRouter } from 'next/navigation';

import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
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
import { Search } from 'lucide-react';
import { mutate } from 'swr';
import SubjectsTable from './table/SubjectsTable';
import { deleteSubject, getSubjects } from '@/hooks/useSubject';
import { BreadCrumbs } from '@/components/ui-components/BreadCrumbs';

export default function SubjectsPage() {
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

  const { subjects, isError, isLoading } = getSubjects(
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

  const handleSubjectDelete = async (id: number) => {
    const { status, message, error } = await deleteSubject(id);
    if (!error && status == 204) {
      if (filter.search) fetchParams.append('search', filter.search);
      mutate(`/subjects?${fetchParams.toString()}`);
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen w-full">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl text-gray-700 font-semibold">Subjects List</h1>
          <Link href={'/dashboard/subjects/create'}>
            <Button
              className="hover:dark:bg-gray-800 hover:dark:text-white"
              variant="outline"
              size="sm"
            >
              <LuCircleFadingPlus className="mr-1" /> Add Subject
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
        
                </div>
       
        <div className="w-full rounded-lg ">
          {isLoading ? (
            <TableSkeletons />
          ) : (
            <SubjectsTable
              data={subjects.data || []}
              totalCount={subjects.meta?.total || 0}
              pagination={pagination}
              onPaginationChange={setPagination}
              onDelete={handleSubjectDelete}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
