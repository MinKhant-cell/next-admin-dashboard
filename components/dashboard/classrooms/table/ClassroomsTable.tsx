'use client';
import CardMenu from '@/components/card/CardMenu';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { format, formatISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  PaginationState,
  createColumnHelper,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import ActionDropdown from './ActionDropdown';
import Link from 'next/link';
import DateContainer from '@/components/ui-components/DateContainer';

const statusColors: Record<string, string> = {
  upcoming:
    'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100',
  active:
    'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100',
  ongoing:
    'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-100',
  full: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-100',
  completed:
    'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900 dark:text-indigo-100',
  paused:
    'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100',
  canceled:
    'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100'
};

type RowObj = {
  checked?: string;
  id: number;
  name: string;
  grade?: string;
  created_at: string;
  menu?: string;
  employee_id?: number;
  employee?: any;
};

function ClassroomTable(props) {
  const { onDelete, data, totalCount, onPaginationChange, pagination } = props;
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const allSelected =
    data.length > 0 && data.every((row) => selectedRowIds[row.id]);

  // Handle Select All
  const handleSelectAll = () => {

    if (allSelected) {
      // Uncheck all
      setSelectedRowIds({});
    } else {
      // Check all
      const newState = {};
      data.map((row) => {
        newState[row.id] = true;
      });
      setSelectedRowIds(newState);
    }
  };

  // Handle Single Row Select

  const handleSelectRow = (id: string | number) => {
    setSelectedRowIds((prev) => (
      {
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Column Definition
  const columns = [
    columnHelper.accessor('checked', {
      id: 'checked',
      header: () => (
        <div className="flex max-w-max items-center">
          <Checkbox checked={allSelected} onCheckedChange={handleSelectAll} />
        </div>
      ),
      cell: (info: any) => {
        const rowId = info.row.original.id;
        return (
          <div className="flex max-w-max items-center">
            <Checkbox
              checked={!!selectedRowIds[rowId]}
              onCheckedChange={() => handleSelectRow(rowId)}
            />
          </div>
        );
      }
    }),
    columnHelper.accessor('id', {
      id: 'id',
      header: () => (
        <p className="text-xs text-end font-semibold text-zinc-500 dark:text-zinc-400">
          ID
        </p>
      ),
      cell: (info) => (
        <p className="text-xs text-end font-medium text-zinc-950 dark:text-white">
          {info.row.index + 1}
        </p>
      )
    }),
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <p className="text-xs text-start font-semibold text-zinc-500 dark:text-zinc-400">
          Name
        </p>
      ),
      cell: (info) => (
        <Link href={`/dashboard/courses/${info.row.original.id}`}>
          <p className="text-xs font-medium text-zinc-950 dark:text-white">
            {info.getValue()}
          </p>
        </Link>
      )
    }),
    columnHelper.accessor('grade', {
      id: 'grade',
      header: () => (
        <p className="text-xs text-start font-semibold text-zinc-500 dark:text-zinc-400">
          Grade
        </p>
      ),
      cell: (info: any) => {
        return (
          <p className="text-xs font-medium text-zinc-950 dark:text-white">
             {info.getValue()}
          </p>
        );
      }
    }),

    columnHelper.accessor('created_at', {
      id: 'created_at',
      header: () => (
        <p className="text-xs text-start font-semibold text-zinc-500 dark:text-zinc-400">
          Created At
        </p>
      ),
      cell: (info: any) => (
        <div className="flex justify-start w-full items-center gap-[14px]">
          <DateContainer value={info.getValue()} />
        </div>
      )
    }),

    columnHelper.accessor('menu', {
      id: 'menu',
      header: () => (
        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400"></p>
      ),
      cell: (info) => (
        <ActionDropdown
          id={String(info.row.original.id)}
          onDelete={(id) => onDelete(id)}
        />
      )
    })
  ]; // eslint-disable-next-line

  const table = useReactTable({
    data: data,
    columns,
    state: {
      columnFilters,
      pagination
    },
    onPaginationChange: onPaginationChange,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pagination.pageSize)
  });

  return (
    <Card
      className={
        'h-full w-full border-zinc-200 p-0 dark:border-zinc-800 sm:overflow-auto'
      }
    >
      <div className="overflow-x-scroll xl:overflow-x-hidden">
        <Table className="w-full">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableHeader
              key={headerGroup.id}
              className="border-b-[1px] border-zinc-200 p-6 dark:border-zinc-800"
            >
              <tr className="dark:border-zinc-800">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-zinc-200 pl-5 pr-4 pt-2 text-center dark:border-zinc-800"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: '',
                        desc: ''
                      }[header.column.getIsSorted() as string] ?? null}
                    </TableHead>
                  );
                })}
              </tr>
            </TableHeader>
          ))}
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="px-6 dark:hover:bg-gray-900">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="w-max border-b-[1px] border-zinc-200 py-2 pl-5 pr-4 dark:border-white/10"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  No Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* pagination */}
        <div className="mt-2 flex h-20 w-full items-center justify-between px-6">
          {/* left side */}
          <div className="flex items-center gap-3">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Showing {pagination.pageSize} rows per page
            </p>
          </div>
          {/* right side */}
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Total {totalCount}
            </p>
            <Button
              onClick={() => {
                if (pagination.pageIndex > 0) {
                  onPaginationChange({
                    ...pagination,
                    pageIndex: pagination.pageIndex - 1
                  });
                }
              }}
              disabled={pagination.pageIndex === 0}
              className="flex items-center justify-center rounded-lg bg-transparent p-2 text-lg text-zinc-950 dark:text-white"
            >
              <MdChevronLeft />
            </Button>

            {/* {createPages(table.getPageCount()).map((pageNumber, index) => {
       return (
        <Button
         className={`font-mediumflex p-0 items-center justify-center rounded-lg p-2 text-xs transition duration-200 ${
          pageNumber === pageIndex + 1
           ? ''
           : 'border border-zinc-200 bg-[transparent] dark:border-zinc-800 dark:text-white'
         }`}
         onClick={() => table.setPageIndex(pageNumber - 1)}
         key={index}
        >
         {pageNumber}
        </Button>
       );
      })} */}
            <Button
              onClick={() => {
                const maxPage = Math.ceil(totalCount / pagination.pageSize);
                if (pagination.pageIndex + 1 < maxPage) {
                  onPaginationChange({
                    ...pagination,
                    pageIndex: pagination.pageIndex + 1
                  });
                }
              }}
              disabled={
                pagination.pageIndex + 1 >=
                Math.ceil(totalCount / pagination.pageSize)
              }
              className="flex min-w-[34px] items-center justify-center rounded-lg bg-transparent p-2 text-lg text-zinc-950 dark:text-white"
            >
              <MdChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ClassroomTable;
const columnHelper = createColumnHelper<RowObj>();
