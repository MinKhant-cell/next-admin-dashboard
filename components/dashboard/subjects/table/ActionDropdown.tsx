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
import { ConfirmDialog } from '@/components/alert-dialog/ConfirmDialog';

function ActionDropdown(props: {
  transparent?: boolean;
  id: string;
  onDelete: (id: string) => void;
}) {
  const { id, onDelete } = props;
  const [open, setOpen] = React.useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setOpen(!open)}
            >
              <BsThreeDotsVertical/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[80] w-40 border-zinc-200 dark:border-zinc-800">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/subjects/edit/${id}`}
                className="flex items-center gap-2 text-zinc-800 hover:font-medium hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white"
              >
                <LuSquarePen />
                Edit
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              asChild
              onSelect={() => setConfirmDialogOpen(true)}
            >
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
      <ConfirmDialog isOpen={confirmDialogOpen} onOpenChange={setConfirmDialogOpen} title='Delete Course' description='Please Confirm to Delete!' onConfirm={()=>onDelete(id)}/>
    </div>
  );
}

export default ActionDropdown;
