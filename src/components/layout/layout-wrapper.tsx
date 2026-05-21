import { useEffect } from 'react'
import { Outlet, useLocation, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { isLocale } from '../../i18n/config'
import { Header } from './header'
import { Footer } from './footer'
import { ChatWidget } from '../ui/chat-widget'
import { NotFound } from '../../routes/not-found'

export function LayoutWrapper() {
  const { locale } = useParams<{ locale: string }>()
  const { i18n } = useTranslation()
  const location = useLocation()

  // Sync i18next language and <html lang> with the URL locale.
  useEffect(() => {
    if (isLocale(locale)) {
      if (i18n.language !== locale) {
        void i18n.changeLanguage(locale)
      }
      document.documentElement.lang = locale
    }
  }, [locale, i18n])

  // Scroll handling: jump to a #hash target, otherwise scroll to top on navigation.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname, location.hash])

  // Invalid locale segment → render the 404 page (without a locale chrome mismatch).
  if (!isLocale(locale)) {
    return <NotFound />
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* TODO: replace these demo contacts with Otium's real numbers / handle. */}
      <ChatWidget
        whatsappNumber="995322111104"
        viberNumber="995322111104"
        telegramUsername="otium"
        whatsappMessage="Hello — I'm interested in Reverance residences."
        accentColor="#0A0A0A"
      />
    </div>
  )
}
