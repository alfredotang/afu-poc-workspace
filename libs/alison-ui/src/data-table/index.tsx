import * as Table from '@alison-ui/table'

import type { Table as TanstackReactTable } from '@tanstack/react-table'

import { cn } from '@libs/helpers/className'

import {
  DataTableFooter,
  DataTableHeader,
  DataTableBody,
  DataTablePagination,
} from './components'

export type DataTableProps<T> = {
  table: TanstackReactTable<T>
  enabledFooter?: boolean
  isLoading?: boolean
  loadingCount?: number
  stickyHeader?: boolean
  enabledPagination?: boolean
}

function DataTable<T>({
  className,
  maxHeight = 'auto',
  ...props
}: DataTableProps<T> & {
  className?: string
  maxHeight?: `${number}px` | 'auto'
}) {
  return (
    <div
      className={cn(
        'relative flex max-h-(--table-max-height) flex-col gap-4 overflow-auto',
        className
      )}
      style={{ '--table-max-height': maxHeight } as React.CSSProperties}
    >
      <Table.Root>
        <DataTableHeader {...props} />
        <DataTableBody {...props} />
        <DataTableFooter {...props} />
      </Table.Root>
      <DataTablePagination {...props} />
    </div>
  )
}

export { DataTable }
