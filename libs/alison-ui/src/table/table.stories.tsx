import type { Meta } from '@storybook/react'

import dayjs from 'dayjs'

import * as Table from '.'

export default {
  title: 'tables/table',
  component: Table.Root,
} as Meta<typeof Table.Root>

const data = [
  {
    name: 'Alison',
    createdAt: '2024-01-01',
  },
  {
    name: 'Alfredo',
    createdAt: '2024-01-02',
  },
  {
    name: 'Bill',
    createdAt: '2024-01-03',
  },
  {
    name: 'Chris',
    createdAt: '2024-01-04',
  },
  {
    name: 'Fred',
    createdAt: '2024-01-05',
  },
  {
    name: 'Zoe',
    createdAt: '2024-01-06',
  },
]

export const Default = () => (
  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head>Name</Table.Head>
        <Table.Head>Created At</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {data.map((item, index) => (
        <Table.Row key={index}>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{dayjs(item.createdAt).format('DD/MM/YYYY')}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
)
