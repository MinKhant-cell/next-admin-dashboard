'use client';
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

function TableTabs({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const statusList = [
    'All',
    'Upcoming',
    'Ongoing',
    'Completed',
    'Paused',
    'Canceled'
  ];
  return (
    <Tabs value={value} onValueChange={onChange} className="w-[400px]">
      <TabsList className='dark:bg-gray-800'>
        {statusList.map((status) => (
          <TabsTrigger key={status} value={status}>
            {status}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default TableTabs;
