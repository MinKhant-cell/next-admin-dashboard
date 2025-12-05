'use client';
import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { getAllTeachers } from '@/hooks/useTeachers';

export function TeachersSelect({ onValueChange }: any) {
  const { teachers, isLoading, isError } = getAllTeachers();
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Teacher" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {isLoading && <SelectLabel>Loading...</SelectLabel>}
          {!isLoading &&
            !isError &&
            teachers.map((teacher) => (
              <SelectItem
                className="text-gray-700"
                key={teacher.id}
                value={teacher.id}
              >
                {teacher.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
