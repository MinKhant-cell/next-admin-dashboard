'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import React from 'react';
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { LuSquarePen, LuTrash } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function ActionDropdown(props: {
  transparent?: boolean;
  vertical?: boolean;
  id: string;
  onDelete: (id: string) => void;
}) {
  const { transparent, vertical, id, onDelete } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={() => setOpen(!open)}
            className={`flex items-center text-xl hover:cursor-pointer ${
              transparent
                ? 'bg-transparent text-white hover:bg-transparent active:bg-transparent'
                : vertical
                  ? 'bg-transparent text-zinc-950 hover:bg-transparent active:bg-transparent dark:text-white dark:hover:bg-transparent dark:active:bg-transparent'
                  : 'bg-lightPrimary text-brand-500 p-2 hover:bg-gray-100 dark:bg-zinc-950 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10'
            } justify-center rounded-lg font-bold transition duration-200`}
          >
            {vertical ? (
              <p className="text-2xl hover:cursor-pointer">
                <BsThreeDotsVertical />
              </p>
            ) : (
              <BsThreeDotsVertical className="h-6 w-6" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[80] w-40 border-zinc-200 dark:border-zinc-800">
          <DropdownMenuGroup>
              <DropdownMenuItem asChild>
            <Link href={`/dashboard/courses/edit/${id}`} className="flex items-center gap-2 text-zinc-800 hover:font-medium hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white">
              <LuSquarePen />
              Edit
            </Link>
          </DropdownMenuItem>

            <DropdownMenuItem onClick={() => onDelete(id)}>
              <p className="flex cursor-pointer items-center gap-2 text-zinc-950 hover:font-medium hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white">
                <span>
                  <LuTrash />
                </span>
                Delete
              </p>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ActionDropdown;
