import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import { useLocale, localePath } from '../../hooks/use-locale'

const statKeys = ['roi', 'occupancy', 'rentalTax', 'purchaseTax'] as const

interface InvestmentStatsProps {
  /** Render on a light background instead of the default dark one. */
  light?: boolean
}

/** The 4 big stat cards. Reused on the home dark block and the investment page. */
export function InvestmentStats({ light = false }: InvestmentStatsProps) {
  const { t } = useTranslation()
  const valueColor = light ? 'text-ink-900' : 'text-sand-50'
  const labelColor = light ? 'text-ink-500' : 'text-sand-200/70'
  const border = light
    ? 'border-ink-900/10'
    : 'border-sand-50/15'

  return (
    <div className="grid grid-cols-2 gap-px lg:grid-cols-4">
      {statKeys.map((key, i) => (
        <motion.div
          key={key}
          className={`flex flex-col gap-3 border-t ${border} pt-6`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <span className={`display text-[clamp(2.25rem,5vw,3.5rem)] ${valueColor}`}>
            {t(`investmentBlock.stats.${key}.value`)}
          </span>
          <span className={`max-w-[16ch] text-sm leading-snug ${labelColor}`}>
            {t(`investmentBlock.stats.${key}.label`)}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

export function InvestmentBlock() {
  const { t } = useTranslation()
  const locale = useLocale()

  return (
    <section id="investment" className="bg-ink-900 text-sand-50">
      <div className="container-page py-24 md:py-32">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="md:w-[180px] md:shrink-0">
            <p className="eyebrow text-bronze">[ 02 ] {t('investmentBlock.sectionLabel')}</p>
          </div>
          <div className="flex-1">
            <h2 className="max-w-2xl font-serif text-[clamp(1.75rem,4vw,3rem)] font-medium leading-tight tracking-[-0.015em]">
              {t('investmentBlock.headline')}
            </h2>

            <div className="mt-14">
              <InvestmentStats />
            </div>

            <div className="hairline-t mt-14 flex flex-col gap-6 border-sand-50/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-sm text-sand-200/70">{t('investmentBlock.citation')}</p>
              <Button as="link" to={localePath(locale, 'investment')} variant="ghost">
                {t('investmentBlock.cta')}
                <ArrowRight size={16} strokeWidth={1.5} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
