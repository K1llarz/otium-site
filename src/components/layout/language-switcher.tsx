import { useEffect, useRef, useState, useTransition, type KeyboardEvent } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import { Check, ChevronDown } from 'lucide-react'
import { SUPPORTED_LOCALES, type Locale } from '../../i18n/config'
import { useLocale } from '../../hooks/use-locale'
import { cn } from '../../lib/cn'

// Stable display order — the active locale is highlighted in place rather
// than reordered, so the menu never jumps around when you switch.
const ORDER: Locale[] = ['ka', 'en', 'ru']

interface LanguageSwitcherProps {
  onSelect?: () => void
  className?: string
  /** Direction the menu opens. Use "up" inside the mobile drawer. */
  direction?: 'down' | 'up'
  /** Stretch the trigger + menu to fill the container (mobile drawer). */
  block?: boolean
}

/* --------------------------------------------------------------- flags */

function Flag({ locale }: { locale: Locale }) {
  return (
    <span className="inline-block h-3.5 w-5 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-ink-900/10">
      {locale === 'ka' && <GeorgiaFlag />}
      {locale === 'en' && <UKFlag />}
      {locale === 'ru' && <RussiaFlag />}
    </span>
  )
}

function RussiaFlag() {
  return (
    <svg viewBox="0 0 9 6" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="9" height="6" fill="#fff" />
      <rect y="2" width="9" height="2" fill="#0039A6" />
      <rect y="4" width="9" height="2" fill="#D52B1E" />
    </svg>
  )
}

function GeorgiaFlag() {
  // White field, central red St George's cross + four small Bolnisi crosses.
  const small = (cx: number, cy: number) => (
    <>
      <rect x={cx - 2.2} y={cy - 0.5} width={4.4} height={1} />
      <rect x={cx - 0.5} y={cy - 2.2} width={1} height={4.4} />
    </>
  )
  return (
    <svg viewBox="0 0 30 20" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="30" height="20" fill="#fff" />
      <rect x="12.5" width="5" height="20" fill="#FF0000" />
      <rect y="7.5" width="30" height="5" fill="#FF0000" />
      <g fill="#FF0000">
        {small(6.25, 3.75)}
        {small(23.75, 3.75)}
        {small(6.25, 16.25)}
        {small(23.75, 16.25)}
      </g>
    </svg>
  )
}

function UKFlag() {
  return (
    <svg viewBox="0 0 60 30" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0,0 L27,13.5 M33,16.5 L60,30 M60,0 L33,13.5 M27,16.5 L0,30"
        stroke="#C8102E"
        strokeWidth="4"
      />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}

/* --------------------------------------------------------------- component */

export function LanguageSwitcher({ onSelect, className, direction = 'down', block = false }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation()
  const activeLocale = useLocale()
  const navigate = useNavigate()
  const location = useLocation()
  const [, startTransition] = useTransition()

  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])

  const changeLocale = (next: Locale) => {
    setOpen(false)
    if (next === activeLocale) {
      onSelect?.()
      return
    }
    // Swap the leading /:locale segment, keep the rest of the path.
    const segments = location.pathname.split('/').filter(Boolean)
    if (SUPPORTED_LOCALES.includes(segments[0] as Locale)) {
      segments[0] = next
    } else {
      segments.unshift(next)
    }
    const nextPath = `/${segments.join('/')}`

    startTransition(() => {
      void i18n.changeLanguage(next)
      navigate(nextPath)
      onSelect?.()
    })
  }

  // Close on outside click.
  useEffect(() => {
    if (!open) return
    const handlePointer = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handlePointer)
    return () => document.removeEventListener('mousedown', handlePointer)
  }, [open])

  // Move focus to the active option when the menu opens.
  useEffect(() => {
    if (!open) return
    const index = ORDER.indexOf(activeLocale)
    const id = window.setTimeout(() => optionRefs.current[index]?.focus(), 20)
    return () => window.clearTimeout(id)
  }, [open, activeLocale])

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
    }
  }

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const count = ORDER.length
    const current = optionRefs.current.findIndex((el) => el === document.activeElement)
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      optionRefs.current[(current + 1) % count]?.focus()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      optionRefs.current[(current - 1 + count) % count]?.focus()
    } else if (event.key === 'Home') {
      event.preventDefault()
      optionRefs.current[0]?.focus()
    } else if (event.key === 'End') {
      event.preventDefault()
      optionRefs.current[count - 1]?.focus()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
      triggerRef.current?.focus()
    }
  }

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: direction === 'down' ? -8 : 8,
      scale: 0.97,
      transition: { duration: 0.14, ease: 'easeIn' as const },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.32, 0.72, 0, 1] as const,
        staggerChildren: 0.04,
        delayChildren: 0.04,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -6 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <div ref={rootRef} className={cn('relative', block && 'w-full', className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('language.switch')}
        className={cn(
          'inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-sand-50/60 px-3 py-1.5 text-sm font-medium text-ink-900 transition-colors hover:border-ink-900/30 hover:bg-sand-100',
          block && 'w-full justify-between',
        )}
      >
        <span className="inline-flex items-center gap-2">
          <Flag locale={activeLocale} />
          <span>{t(`language.native.${activeLocale}`)}</span>
        </span>
        <ChevronDown
          size={15}
          strokeWidth={1.75}
          className={cn('text-bronze transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t('language.switch')}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onKeyDown={handleMenuKeyDown}
            style={{
              transformOrigin: direction === 'down'
                ? (block ? 'top center' : 'top right')
                : (block ? 'bottom center' : 'bottom right'),
            }}
            className={cn(
              'absolute z-50 overflow-hidden rounded-2xl border border-ink-900/10 bg-sand-50 p-1.5 shadow-[0_14px_44px_rgba(10,10,10,0.12)]',
              block ? 'left-0 right-0' : 'right-0 min-w-[208px]',
              direction === 'down' ? 'top-[calc(100%+0.5rem)]' : 'bottom-[calc(100%+0.5rem)]',
            )}
          >
            {ORDER.map((locale, index) => {
              const isActive = locale === activeLocale
              return (
                <motion.li key={locale} variants={itemVariants}>
                  <button
                    ref={(el) => {
                      optionRefs.current[index] = el
                    }}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => changeLocale(locale)}
                    className={cn(
                      'flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                      isActive
                        ? 'bg-sand-100 text-ink-900'
                        : 'text-ink-500 hover:bg-sand-100/70 hover:text-ink-900',
                    )}
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Flag locale={locale} />
                      <span className="font-medium">{t(`language.native.${locale}`)}</span>
                    </span>
                    {isActive && <Check size={15} strokeWidth={2} className="text-bronze-dark" />}
                  </button>
                </motion.li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
