import * as Tooltip from '@alison-ui/tooltip'

import type { Meta } from '@storybook/react'

import { useQuery } from '@tanstack/react-query'
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  type PaginationState,
} from '@tanstack/react-table'
import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { AngryIcon } from 'lucide-react'

dayjs.extend(relativeTime)

import { useState } from 'react'

import { Checkbox } from '@alison-ui/checkbox'

import { DataTable } from '.'

export default {
  title: 'tables/data-table',
  component: DataTable,
  argTypes: {
    table: {
      control: {
        type: 'object',
      },
      table: {
        type: {
          summary: 'Table<T>',
          detail: `
          import { useReactTable, getCoreRowModel } from '@tanstack/react-table'

          const table = useReactTable({
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
          })
          `,
        },
      },
    },
    enabledFooter: {
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: {
          summary: 'undefined',
          detail: 'If true, the footer will be displayed',
        },
        type: {
          summary: 'boolean',
          detail: `
          // add footer definition in the columns
           columnHelper.accessor(row => row, {
            header: 'Full Row',
            cell: info => (
              <div className="flex items-center gap-2">
                <span>{info.getValue().name}</span>
                <span>{dayjs(info.getValue().createdAt).format('DD/MM/YYYY')}</span>
              </div>
            ),
            footer: info => <div>...</div>,
          }),
          `,
        },
      },
    },
    enabledPagination: {
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: {
          summary: 'undefined',
          detail: 'If true, the pagination will be displayed',
        },
      },
    },
    isLoading: {
      control: {
        type: 'boolean',
      },
    },
    loadingCount: {
      control: {
        type: 'number',
      },
      table: {
        defaultValue: {
          summary: '5',
          detail: 'The number of rows to display when loading',
        },
      },
    },
    stickyHeader: {
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: {
          summary: 'undefined',
          detail: 'Must be used with maxHeight',
        },
      },
    },
    maxHeight: {
      control: {
        type: 'text',
      },
      table: {
        type: {
          summary: '`${number}px` | "auto"',
          detail: 'The maximum height of the table',
        },
        defaultValue: {
          summary: 'auto',
          detail: 'The maximum height of the table',
        },
      },
    },
  },
} as Meta

const data = Array.from({ length: 100 }, (_, index) => ({
  name: `Person ${index + 1}`,
  createdAt: new Date(Date.now() - index * 1000),
}))

const defaultColumnHelper = createColumnHelper<(typeof data)[number]>()
const defaultColumns = [
  defaultColumnHelper.accessor('name', {
    header: 'Name',
  }),
  defaultColumnHelper.accessor('createdAt', {
    header: 'Created',
    cell: info => <div>{dayjs(info.getValue()).fromNow()}</div>,
  }),
  defaultColumnHelper.accessor('name', {
    header: () => (
      <div className="flex items-center gap-2">
        <span>Customized Header</span>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <AngryIcon className="text-muted-foreground size-4" />
          </Tooltip.Trigger>
          <Tooltip.Content>Actions</Tooltip.Content>
        </Tooltip.Root>
      </div>
    ),
    cell: info => <div>{'Hello ' + info.getValue()}</div>,
  }),
  defaultColumnHelper.accessor(row => row, {
    header: 'Full Row',
    cell: info => (
      <div className="flex items-center gap-2">
        <span>{info.getValue().name}</span>
        <span>{dayjs(info.getValue().createdAt).format('DD/MM/YYYY')}</span>
      </div>
    ),
  }),
]

export const Default = () => {
  const [rowData] = useState(data.slice(0, 10))
  const table = useReactTable({
    data: rowData,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  })
  return <DataTable table={table} />
}

export const Loading = () => {
  const table = useReactTable({
    data: [],
    columns: [
      {
        header: 'Name',
      },
      {
        header: 'Created',
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  })
  return <DataTable table={table} isLoading enabledPagination />
}

const stickyHeaderColumnHelper = createColumnHelper<(typeof data)[number]>()

const stickyHeaderColumns = [
  stickyHeaderColumnHelper.accessor('name', {
    header: 'Name',
  }),
  stickyHeaderColumnHelper.accessor('createdAt', {
    header: 'Created',
    cell: info => <div>{dayjs(info.getValue()).fromNow()}</div>,
  }),
]

export const StickyHeader = () => {
  const table = useReactTable({
    data,
    columns: stickyHeaderColumns,
    getCoreRowModel: getCoreRowModel(),
  })
  return <DataTable table={table} stickyHeader maxHeight="500px" />
}

const paginationInClientSideColumnHelper =
  createColumnHelper<(typeof data)[number]>()

const paginationInClientSideColumns = [
  paginationInClientSideColumnHelper.accessor('name', {
    header: 'Name',
  }),
  paginationInClientSideColumnHelper.accessor('createdAt', {
    header: 'Created',
    cell: info => <div>{dayjs(info.getValue()).fromNow()}</div>,
  }),
]

export const PaginationInClientSide = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const table = useReactTable({
    data,
    columns: paginationInClientSideColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })
  return <DataTable table={table} enabledPagination />
}

type PokemonResponse = {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

const pokemonColumnHelper =
  createColumnHelper<PokemonResponse['results'][number]>()

const pokemonColumns = [
  pokemonColumnHelper.accessor('name', {
    header: 'Name',
  }),
  pokemonColumnHelper.accessor('url', {
    header: 'URL',
  }),
]

export const PaginationInServerSide = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { data: pokemons, isFetching } = useQuery({
    queryKey: ['pokemons', pagination],
    queryFn: () =>
      axios.get<PokemonResponse>(
        `https://pokeapi.co/api/v2/pokemon?offset=${pagination.pageIndex * 10}&limit=${pagination.pageSize}`
      ),
    select: res => ({ list: res.data.results, total: res.data.count }),
  })

  const table = useReactTable({
    data: pokemons?.list ?? [],
    columns: pokemonColumns,
    pageCount: Math.ceil((pokemons?.total ?? 0) / pagination.pageSize),
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    state: {
      pagination,
    },
  })
  return (
    <DataTable
      table={table}
      enabledPagination
      isLoading={isFetching}
      loadingCount={pagination.pageSize}
    />
  )
}

const selectableColumnHelper = createColumnHelper<(typeof data)[number]>()

const selectableColumns = [
  selectableColumnHelper.accessor('name', {
    header: ({ table }) => (
      <Checkbox
        value={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() ? 'indeterminate' : false)
        }
        onChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        value={row?.getIsSelected()}
        onChange={value => row?.toggleSelected?.(!!value)}
        disabled={!row?.getCanSelect()}
      />
    ),
  }),
  selectableColumnHelper.accessor('name', {
    header: 'Name',
    cell: info => (
      <div>
        {info.getValue() === 'Person 1' ? 'Disabled Selected' : info.getValue()}
      </div>
    ),
  }),
  selectableColumnHelper.accessor('createdAt', {
    header: 'Created',
    cell: info => <div>{dayjs(info.getValue()).fromNow()}</div>,
  }),
]

export const Selectable = () => {
  const [rowSelection, setRowSelection] = useState({})
  const [rowData] = useState(data.slice(0, 10))

  const table = useReactTable({
    data: rowData,
    columns: selectableColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: row => row.original.name !== 'Person 1',
    state: {
      rowSelection,
    },
  })
  return (
    <div className="flex flex-col gap-4">
      <DataTable table={table} />
      <pre className="flex flex-col gap-2 text-xs">
        <span>rowSelection:</span>
        <code>{JSON.stringify(rowSelection, null, 2)}</code>
      </pre>
    </div>
  )
}
