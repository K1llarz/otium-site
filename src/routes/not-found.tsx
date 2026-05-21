import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useLocale, localePath } from '../hooks/use-locale'

export function NotFound() {
  const { t } = useTranslation()
  const locale = useLocale()

  return (
    <div className="flex min-h-dvh flex-col bg-sand-50">
      <header className="container-page flex h-16 items-center md:h-20">
        <Link to={localePath(locale)} className="text-lg font-medium tracking-tightest text-ink-900 md:text-xl">
          Reverance<span className="text-bronze">.</span>
        </Link>
      </header>

      <div className="container-page flex flex-1 items-center">
        <div className="max-w-2xl py-20">
          <p className="display text-[clamp(4rem,16vw,10rem)] leading-none text-sand-300">
            {t('notFound.code')}
          </p>
          <h1 className="display mt-6 text-[clamp(1.75rem,5vw,3rem)] leading-tight">
            {t('notFound.headline')}
          </h1>
          <p className="mt-5 max-w-md text-base text-ink-500">{t('notFound.body')}</p>
          <Button as="link" to={localePath(locale)} className="mt-8">
            {t('notFound.cta')}
            <ArrowRight size={16} strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  )
}
