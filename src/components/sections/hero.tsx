import type { CSSProperties } from 'react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import { useLocale, localePath } from '../../hooks/use-locale'

const lines = ['line1', 'line2', 'line3', 'line4'] as const

// TODO: drop a real photo at `public/images/hero.jpg` (landscape, ≈2400px wide,
// dark/dusk tones work best with the overlay). Until then the layered sunset
// gradient below stands in as the backdrop, so the section never looks empty.
const heroBackground: CSSProperties = {
  backgroundImage:
    "url('/images/hero.jpg'), " +
    'radial-gradient(120% 90% at 18% 25%, rgba(223, 212, 187, 0.45) 0%, transparent 55%), ' +
    'linear-gradient(158deg, #20232b 0%, #4a4334 42%, #8A8578 72%, #c9bda4 100%)',
  backgroundSize: 'cover, cover, cover',
  backgroundPosition: 'center, center, center',
  backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
}

export function Hero() {
  const { t } = useTranslation()
  const locale = useLocale()

  return (
    <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden md:min-h-[100svh]">
      {/* Full-bleed image, with a sunset gradient fallback underneath. */}
      <div className="absolute inset-0 -z-20" style={heroBackground} aria-hidden="true" />
      {/* Legibility overlays — darker toward the bottom and left, where the text sits. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900/85 via-ink-900/40 to-ink-900/10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900/55 via-ink-900/15 to-transparent"
        aria-hidden="true"
      />

      <div className="container-page w-full pt-28 pb-16 md:pb-24">
        <div className="max-w-3xl">
          <motion.p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-sand-300"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('hero.eyebrow')}
          </motion.p>

          <h1 className="mt-6 font-serif text-[clamp(2.75rem,9vw,6rem)] font-medium leading-[1.02] tracking-[-0.015em] text-sand-50">
            {lines.map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              >
                {t(`hero.headline.${line}`)}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-8 max-w-md text-base leading-relaxed text-sand-200/85"
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
            <Button as="link" to={localePath(locale, 'apartments')} variant="light">
              {t('hero.ctaPrimary')}
              <ArrowRight size={16} strokeWidth={1.5} />
            </Button>
            <Button as="link" to={localePath(locale, 'investment')} variant="ghost">
              {t('hero.ctaSecondary')}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
