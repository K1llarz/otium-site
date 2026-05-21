import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import { useLocale, localePath } from '../../hooks/use-locale'

const lines = ['line1', 'line2', 'line3', 'line4'] as const

export function Hero() {
  const { t } = useTranslation()
  const locale = useLocale()

  return (
    <section className="container-page pt-16 pb-20 md:pt-24 md:pb-32">
      <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('hero.eyebrow')}
          </motion.p>

          <h1 className="display mt-6 text-[clamp(2.75rem,9vw,6rem)]">
            {lines.map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              >
                {t(`hero.headline.${line}`)}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-8 max-w-md text-base leading-relaxed text-ink-500"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            {t('hero.subhead')}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <Button as="link" to={localePath(locale, 'apartments')} variant="primary">
              {t('hero.ctaPrimary')}
              <ArrowRight size={16} strokeWidth={1.5} />
            </Button>
            <Button as="link" to={localePath(locale, 'investment')} variant="outline">
              {t('hero.ctaSecondary')}
            </Button>
          </motion.div>
        </div>

        <motion.figure
          className="relative"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="ph-image aspect-[4/5] w-full rounded-sm bg-sand-400" />
          <figcaption className="absolute bottom-4 left-4 rounded-full bg-sand-50/85 px-3 py-1.5 text-xs font-medium text-ink-700 backdrop-blur-sm">
            {t('hero.imageCaption')}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
