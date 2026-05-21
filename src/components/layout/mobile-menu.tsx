import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { LanguageSwitcher } from './language-switcher'
import { Logo } from './logo'
import { useLocale, localePath } from '../../hooks/use-locale'

export interface NavItem {
  to: string
  label: string
}

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  items: NavItem[]
}

export function MobileMenu({ open, onClose, items }: MobileMenuProps) {
  const { t } = useTranslation()
  const locale = useLocale()

  useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previous
    }
  }, [open, onClose])

  // Rendered through a portal to <body> so it escapes the sticky header's
  // backdrop-filter, which otherwise becomes the containing block for these
  // position:fixed layers and clips the drawer to the header's height.
  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink-900/30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-dvh w-[82%] max-w-sm flex-col bg-sand-50 px-6 py-6 md:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.menu')}
          >
            <div className="flex items-center justify-between">
              <Link to={localePath(locale)} onClick={onClose} aria-label="Reverance — home">
                <Logo size="sm" />
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label={t('nav.close')}
                className="flex h-10 w-10 items-center justify-center rounded-full hairline text-ink-900"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-1">
              {items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className="border-b border-ink-900/5 py-4 text-2xl font-medium tracking-tightest text-ink-900 transition-colors hover:text-bronze"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8">
              <p className="eyebrow mb-3">{t('language.label')}</p>
              <LanguageSwitcher onSelect={onClose} direction="up" block />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}
