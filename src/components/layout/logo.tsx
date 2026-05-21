import { cn } from '../../lib/cn'

interface LogoProps {
  className?: string
  size?: 'sm' | 'lg'
  /** Show the "by Otium" line with flanking rules under the wordmark. */
  subtitle?: boolean
}

const sizes = {
  sm: {
    word: 'text-[1.55rem] md:text-[1.7rem]',
    sub: 'mt-1.5 text-[0.5rem] tracking-[0.32em]',
  },
  lg: {
    word: 'text-5xl md:text-6xl',
    sub: 'mt-2.5 text-[0.7rem] md:text-[0.8rem] tracking-[0.4em]',
  },
}

/**
 * The Reverance wordmark lockup: an elegant Playfair Display "Reverance"
 * above a small letter-spaced "by Otium", flanked by hairline rules.
 */
export function Logo({ className, size = 'sm', subtitle = true }: LogoProps) {
  const s = sizes[size]
  return (
    <span className={cn('inline-flex flex-col items-center leading-none text-ink-900', className)}>
      <span className={cn('font-serif font-medium tracking-[0.01em]', s.word)}>Reverance</span>
      {subtitle && (
        <span className={cn('flex w-full items-center font-medium uppercase text-bronze', s.sub)}>
          <span className="h-px flex-1 bg-bronze/40" />
          <span className="whitespace-nowrap px-[0.7em]">by Otium</span>
          <span className="h-px flex-1 bg-bronze/40" />
        </span>
      )}
    </span>
  )
}
