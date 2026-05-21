import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface SectionHeaderProps {
  /** Two-digit section index, e.g. "01". */
  number?: string
  /** Tiny bronze label shown in the left column. */
  label: string
  children: ReactNode
  className?: string
}

/**
 * Two-column section pattern: a fixed ~180px left column carrying a
 * `[ NN ] Label` marker, and the section content on the right.
 */
export function SectionHeader({ number, label, children, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-8 md:flex-row md:gap-12', className)}>
      <div className="md:w-[180px] md:shrink-0">
        <p className="eyebrow">
          {number ? `[ ${number} ] ${label}` : label}
        </p>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
