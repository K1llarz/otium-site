import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Instagram, Facebook, Linkedin, Youtube, MessageCircle } from 'lucide-react'
import { useLocale, localePath } from '../../hooks/use-locale'
import { Logo } from './logo'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com', Icon: Instagram },
  { label: 'Facebook', href: 'https://facebook.com', Icon: Facebook },
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: Linkedin },
  { label: 'YouTube', href: 'https://youtube.com', Icon: Youtube },
  { label: 'WhatsApp', href: 'https://wa.me/995322111104', Icon: MessageCircle },
]

export function Footer() {
  const { t } = useTranslation()
  const locale = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="hairline-t bg-sand-50">
      <div className="container-page py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Link to={localePath(locale)} className="inline-block" aria-label="Reverance — home">
              <Logo size="lg" />
            </Link>
            <p className="mt-6 max-w-xs text-sm text-ink-500">{t('footer.tagline')}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:justify-items-end">
            <div className="space-y-2">
              <p className="eyebrow">{t('footer.address')}</p>
              <p className="text-sm text-ink-700">{t('contact.address')}</p>
            </div>
            <div className="space-y-2">
              <p className="eyebrow">{t('footer.phone')}</p>
              <a href={`tel:${t('contact.phone').replace(/\s/g, '')}`} className="block text-sm text-ink-700 transition-colors hover:text-ink-900">
                {t('contact.phone')}
              </a>
              <p className="eyebrow pt-4">{t('footer.email')}</p>
              <a href={`mailto:${t('contact.email')}`} className="block text-sm text-ink-700 transition-colors hover:text-ink-900">
                {t('contact.email')}
              </a>
            </div>
          </div>
        </div>

        <div className="hairline-t mt-14 flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-bronze">
            © {year} Otium Development. {t('footer.rights')}.
          </p>
          <ul className="flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-900/5 hover:text-ink-900"
                >
                  <Icon size={17} strokeWidth={1.5} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
