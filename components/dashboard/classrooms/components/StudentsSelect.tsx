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
import { getAllStudents } from '@/hooks/useStudents';

export function StudentsSelect({ onValueChange }: any) {
  const { students, isLoading, isError } = getAllStudents();
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Student" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {isLoading && <SelectLabel>Loading...</SelectLabel>}
          {!isLoading &&
            !isError &&
            students.map((student) => (
              <SelectItem
                className="text-gray-700"
                key={student.id}
                value={student.id}
              >
                {student.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
