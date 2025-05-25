import * as React from 'react'

import { Button, buttonVariants } from '@alison-ui/./button'

import { cn } from '@libs/helpers/className'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />
}

function PaginationAutoItems({
  totalPages,
  currentPageIndex,
  max = 5,
  onPageChange,
}: {
  totalPages: number
  currentPageIndex: number
  max?: number
  onPageChange: (pageIndex: number) => void
}) {
  if (totalPages <= max) {
    return (
      <>
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={() => onPageChange(index)}
              isActive={index === currentPageIndex}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </>
    )
  }
  // For more than 5 pages, show smart pagination
  const startPage = Math.max(0, currentPageIndex - 1)
  const endPage = Math.min(totalPages - 1, currentPageIndex + 1)

  return (
    <>
      {/* Show first page if not in range */}
      {startPage > 0 && (
        <>
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(0)}
              isActive={currentPageIndex === 0}
            >
              1
            </PaginationLink>
          </PaginationItem>
          {startPage > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
        </>
      )}

      {/* Show current page range */}
      {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
        const pageIndex = startPage + index
        return (
          <PaginationItem key={pageIndex}>
            <PaginationLink
              onClick={() => onPageChange(pageIndex)}
              isActive={currentPageIndex === pageIndex}
            >
              {pageIndex + 1}
            </PaginationLink>
          </PaginationItem>
        )
      })}

      {/* Show last page if not in range */}
      {endPage < totalPages - 1 && (
        <>
          {endPage < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(totalPages - 1)}
              isActive={currentPageIndex === totalPages - 1}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        </>
      )}
    </>
  )
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size' | 'disabled'> &
  React.ComponentProps<'a'>

function PaginationLink({
  className,
  isActive,
  size = 'icon',
  disabled,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
          disabled,
        }),
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination as Root,
  PaginationContent as Content,
  PaginationLink as Link,
  PaginationItem as Item,
  PaginationPrevious as Previous,
  PaginationNext as Next,
  PaginationEllipsis as Ellipsis,
  PaginationAutoItems as AutoItems,
}
