import * as Pagination from '@alison-ui/pagination'
import { Skeleton } from '@alison-ui/skeleton'
import * as Table from '@alison-ui/table'

import { cn } from '@libs/helpers/className'
import { flexRender } from '@tanstack/react-table'

import type { DataTableProps } from '.'

function DataTableFooter<T>({
  table,
  enabledFooter,
  isLoading,
}: DataTableProps<T>) {
  if (!enabledFooter || isLoading) return null

  return (
    <Table.Footer>
      {table.getFooterGroups()?.map((footerGroup, footerGroupIndex) => (
        <Table.Row key={`${footerGroup.id}-${footerGroupIndex}`}>
          {footerGroup.headers.map((item, itemIndex) => (
            <Table.Cell
              key={`${footerGroup.id}-${footerGroupIndex}-${item.id}-${itemIndex}`}
              colSpan={item.colSpan}
            >
              {item.isPlaceholder
                ? null
                : flexRender(item.column.columnDef.footer, item.getContext())}
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Footer>
  )
}

function DataTableHeader<T>({ table, stickyHeader }: DataTableProps<T>) {
  return (
    <Table.Header className={cn({ 'sticky top-0': stickyHeader })}>
      {table.getHeaderGroups().map((headerGroup, headerGroupIndex) => (
        <Table.Row
          key={`${headerGroup.id}`}
          className={cn('hover:bg-[none]', {
            'backdrop-blur-2xl': stickyHeader,
          })}
        >
          {headerGroup.headers.map((item, itemIndex) => (
            <Table.Head
              key={`${headerGroup.id}-${headerGroupIndex}-${item.id}-${itemIndex}`}
              colSpan={item.colSpan}
            >
              {item.isPlaceholder
                ? null
                : flexRender(item.column.columnDef.header, item.getContext())}
            </Table.Head>
          ))}
        </Table.Row>
      ))}
    </Table.Header>
  )
}

function DataTableBody<T>({
  table,
  isLoading,
  loadingCount = 5,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <Table.Body>
        {Array.from({ length: loadingCount }).map((_, rowIndex) => (
          <Table.Row
            key={rowIndex}
            className="cursor-progress hover:bg-transparent"
          >
            {table.getAllColumns().map((cell, cellIndex) => (
              <Table.Cell key={`${rowIndex}-${cell.id}-${cellIndex}`}>
                <Skeleton className="h-5 w-full" />
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    )
  }

  return (
    <Table.Body>
      {table.getRowModel().rows?.map((row, rowIndex) => (
        <Table.Row key={`${row.id}-${rowIndex}`}>
          {row.getVisibleCells().map((cell, cellIndex) => (
            <Table.Cell key={`${row.id}-${rowIndex}-${cell.id}-${cellIndex}`}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  )
}

function DataTablePagination<T>({
  table,
  enabledPagination,
  isLoading,
}: DataTableProps<T>) {
  if (!enabledPagination) return null
  if (isLoading)
    return (
      <div className="flex justify-center py-4">
        <Skeleton className="h-9 w-full" />
      </div>
    )

  return (
    <Pagination.Root className="m-4">
      <Pagination.Content>
        <Pagination.Previous
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        />
        <Pagination.AutoItems
          totalPages={table.getPageCount()}
          currentPageIndex={table.getState().pagination.pageIndex}
          onPageChange={table.setPageIndex}
        />
        <Pagination.Next
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        />
      </Pagination.Content>
    </Pagination.Root>
  )
}

export { DataTableFooter, DataTableHeader, DataTableBody, DataTablePagination }
