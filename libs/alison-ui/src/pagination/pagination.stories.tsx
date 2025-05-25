import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import * as Pagination from './index'

export default {
  title: 'tables/pagination',
  component: Pagination.Root,
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof Pagination.Root>

export const Default: StoryObj<typeof Pagination.Root> = {
  render: () => (
    <Pagination.Root className="my-4">
      <Pagination.Content>
        <Pagination.Previous />
        <Pagination.Item>
          <Pagination.Link href="#">1</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">2</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">3</Pagination.Link>
        </Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>
          <Pagination.Link href="#">10</Pagination.Link>
        </Pagination.Item>
        <Pagination.Next />
      </Pagination.Content>
    </Pagination.Root>
  ),
}

export const Overview = () => (
  <div className="space-y-4">
    <Pagination.Root className="my-4">
      <Pagination.Content>
        <Pagination.Previous />
        <Pagination.Item>
          <Pagination.Link href="#">1</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">2</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">3</Pagination.Link>
        </Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>
          <Pagination.Link href="#">10</Pagination.Link>
        </Pagination.Item>
        <Pagination.Next />
      </Pagination.Content>
    </Pagination.Root>
    <Pagination.Root className="my-4">
      <Pagination.Content>
        <Pagination.Previous />
        <Pagination.Item>
          <Pagination.Link href="#" isActive>
            1
          </Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">2</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">3</Pagination.Link>
        </Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>
          <Pagination.Link href="#">10</Pagination.Link>
        </Pagination.Item>
        <Pagination.Next />
      </Pagination.Content>
    </Pagination.Root>
  </div>
)

export const CalculateItemsAutomatically = () => {
  const TOTAL_PAGES = 10
  const [pageIndex, setPageIndex] = useState(0)
  return (
    <Pagination.Root className="my-4">
      <Pagination.Content>
        <Pagination.Previous
          disabled={pageIndex === 0}
          onClick={() => setPageIndex(pageIndex - 1)}
        />
        <Pagination.AutoItems
          totalPages={TOTAL_PAGES}
          currentPageIndex={pageIndex}
          onPageChange={setPageIndex}
        />
        <Pagination.Next
          disabled={pageIndex === TOTAL_PAGES - 1}
          onClick={() => setPageIndex(pageIndex + 1)}
        />
      </Pagination.Content>
    </Pagination.Root>
  )
}
