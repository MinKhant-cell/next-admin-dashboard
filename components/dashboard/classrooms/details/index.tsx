/*eslint-disable*/
'use client';

import DashboardLayout from '@/components/layout';
import { toast, Toaster } from 'sonner';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LinkBackButton from '@/components/ui-components/LinkBackButton';
import { getClassroomById } from '@/hooks/useClassrooms';
import { BreadCrumbs } from '@/components/ui-components/BreadCrumbs';
import { ReusableDetailCard } from '@/components/ui-components/ReusableDetailCard';

interface Props {
  id: string | number;
}

export default function ClassroomDetailsPage(props: Props) {
  const { id } = props;
  const { classroom, isLoading, isError } = getClassroomById(id);
  console.log('Classroom data:', classroom); 
  
  const statusColors: Record<string, string> = {
    UPCOMING: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100',
    ACTIVE: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100',
    ONGOING: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-100',
    FULL: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-100',
    COMPLETED: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900 dark:text-indigo-100',
    PAUSED: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100',
    INACTIVE: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100'
  };
  
  const renderRow = (label: string, value: any) => (
    <div className="grid grid-flow-col grid-cols-4 mb-3 text-xs">
    <span className="col-span-2 text-gray-600 dark:text-zinc-400">
    {label}
    </span>
    {label === 'Status' ? (
      <div>
      <Badge
      variant="outline"
      className={`${statusColors[value]} capitalize font-medium`}
      >
      {value || '-'}
      </Badge>
      </div>
    ) : (
      <span className="col-span-2 font-medium text-gray-900 dark:text-zinc-200">
      {value || '-'}
      </span>
    )}
    </div>
  );
  
  return (
    <DashboardLayout>
    <Toaster position="top-right" />
    <div className="flex gap-5">
    <div className="w-full">
    <ReusableDetailCard title="Classroom" 
    backHref="/dashboard/classrooms" 
    breadcrumbPath={`/dashboard/classrooms/${id}`}
    breadcrumbName={classroom?.name} 
    isLoading={isLoading}>
    {renderRow("Name", classroom?.name)}
    {renderRow("Grade", classroom?.grade)}
    </ReusableDetailCard>
    
    </div>
    </div>
    </DashboardLayout>
  );
}
