import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Menu } from 'lucide-react'
import { useLocale, localePath } from '../../hooks/use-locale'
import { Logo } from './logo'
import { LanguageSwitcher } from './language-switcher'
import { MobileMenu, type NavItem } from './mobile-menu'
import { cn } from '../../lib/cn'

export function Header() {
  const { t } = useTranslation()
  const locale = useLocale()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems: NavItem[] = [
    { to: localePath(locale, 'apartments'), label: t('nav.residences') },
    { to: localePath(locale, 'investment'), label: t('nav.investment') },
    { to: localePath(locale, 'gallery'), label: t('nav.gallery') },
    { to: `${localePath(locale)}#location`, label: t('nav.location') },
    { to: `${localePath(locale)}#contact`, label: t('nav.contact') },
  ]

  return (
    <header className="sticky top-0 z-40 hairline-b bg-sand-50/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to={localePath(locale)} className="shrink-0" aria-label="Reverance — home">
          <Logo size="sm" />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === localePath(locale)}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium text-ink-500 transition-colors hover:text-ink-900',
                  isActive && 'text-ink-900',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden md:block" />
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t('nav.menu')}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-ink-900/5 md:hidden"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} items={navItems} />
    </header>
  )
}
