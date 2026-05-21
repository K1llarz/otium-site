import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { SectionHeader } from '../components/ui/section-header'
import { InvestmentStats } from '../components/sections/investment-block'
import { formatPrice } from '../lib/format'
import { useLocale, localePath } from '../hooks/use-locale'

const reasonKeys = ['growth', 'tax', 'entry', 'operator'] as const

export function Investment() {
  const { t } = useTranslation()
  const locale = useLocale()

  return (
    <div>
      {/* Hero */}
      <section className="container-page py-20 md:py-28">
        <SectionHeader label={t('investmentPage.hero.sectionLabel')}>
          <h1 className="display max-w-3xl text-[clamp(2rem,5.5vw,4rem)] leading-tight">
            {t('investmentPage.hero.headline')}
          </h1>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-ink-500">
            {t('investmentPage.hero.subhead')}
          </p>
          <Button as="link" to={`${localePath(locale)}#contact`} className="mt-8">
            {t('investmentPage.hero.cta')}
            <ArrowRight size={16} strokeWidth={1.5} />
          </Button>
        </SectionHeader>
      </section>

      {/* Stat cards (dark, reused styling) */}
      <section className="bg-ink-900 text-sand-50">
        <div className="container-page py-20 md:py-24">
          <InvestmentStats />
          <p className="mt-12 max-w-md text-sm text-sand-200/70">{t('investmentBlock.citation')}</p>
        </div>
      </section>

      {/* Why Batumi */}
      <section className="container-page py-24 md:py-32">
        <SectionHeader number="01" label={t('investmentPage.whyBatumi.sectionLabel')}>
          <h2 className="display max-w-2xl text-[clamp(1.75rem,4vw,3rem)] leading-tight">
            {t('investmentPage.whyBatumi.headline')}
          </h2>
          <div className="mt-12 grid gap-x-12 gap-y-px sm:grid-cols-2">
            {reasonKeys.map((key, i) => (
              <motion.article
                key={key}
                className="hairline-t flex gap-5 py-8"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
              >
                <span className="text-sm font-medium tabular-nums text-bronze">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg font-medium leading-snug tracking-tightest text-ink-900">
                    {t(`investmentPage.whyBatumi.reasons.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {t(`investmentPage.whyBatumi.reasons.${key}.body`)}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </SectionHeader>
      </section>

      {/* ROI calculator */}
      <RoiCalculator />

      {/* CTA */}
      <section className="bg-sand-100">
        <div className="container-page py-24 text-center md:py-32">
          <h2 className="display mx-auto max-w-2xl text-[clamp(1.75rem,4vw,3rem)] leading-tight">
            {t('investmentPage.cta.headline')}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base text-ink-500">{t('investmentPage.cta.body')}</p>
          <div className="mt-8 flex justify-center">
            <Button as="link" to={`${localePath(locale)}#contact`}>
              {t('investmentPage.cta.button')}
              <ArrowRight size={16} strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function RoiCalculator() {
  const { t } = useTranslation()
  const locale = useLocale()
  const [price, setPrice] = useState(84000)
  const [occupancy, setOccupancy] = useState(70)
  const [nightlyRate, setNightlyRate] = useState(70)

  const { annualIncome, grossYield } = useMemo(() => {
    const income = Math.round(nightlyRate * 365 * (occupancy / 100))
    const yieldPct = price > 0 ? (income / price) * 100 : 0
    return { annualIncome: income, grossYield: yieldPct }
  }, [price, occupancy, nightlyRate])

  const currency = t('common.currency')

  return (
    <section className="bg-ink-900 text-sand-50">
      <div className="container-page py-24 md:py-32">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="md:w-[180px] md:shrink-0">
            <p className="eyebrow text-bronze">[ 02 ] {t('investmentPage.calculator.sectionLabel')}</p>
          </div>
          <div className="flex-1">
            <h2 className="max-w-xl text-[clamp(1.75rem,4vw,3rem)] font-medium leading-tight tracking-tightest">
              {t('investmentPage.calculator.headline')}
            </h2>
            <p className="mt-5 max-w-md text-sm text-sand-200/70">
              {t('investmentPage.calculator.subhead')}
            </p>

            <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-8">
                <SliderField
                  id="calc-price"
                  label={t('investmentPage.calculator.labels.price')}
                  display={`${currency}${formatPrice(price, locale)}`}
                  min={40000}
                  max={200000}
                  step={1000}
                  value={price}
                  onChange={setPrice}
                />
                <SliderField
                  id="calc-occupancy"
                  label={t('investmentPage.calculator.labels.occupancy')}
                  display={`${occupancy}%`}
                  min={30}
                  max={95}
                  step={1}
                  value={occupancy}
                  onChange={setOccupancy}
                />
                <SliderField
                  id="calc-rate"
                  label={t('investmentPage.calculator.labels.nightlyRate')}
                  display={`${currency}${formatPrice(nightlyRate, locale)}`}
                  min={30}
                  max={250}
                  step={5}
                  value={nightlyRate}
                  onChange={setNightlyRate}
                />
              </div>

              <div className="flex flex-col justify-center gap-8 border-t border-sand-50/15 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                <div>
                  <p className="eyebrow text-bronze">{t('investmentPage.calculator.labels.result')}</p>
                  <p className="display mt-2 text-[clamp(2.5rem,6vw,4rem)] text-sand-50">
                    {currency}{formatPrice(annualIncome, locale)}
                  </p>
                </div>
                <div>
                  <p className="eyebrow text-bronze">{t('investmentPage.calculator.labels.yield')}</p>
                  <p className="display mt-2 text-[clamp(2rem,4vw,2.75rem)] text-sand-50">
                    {grossYield.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-12 text-xs text-sand-200/50">
              {t('investmentPage.calculator.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

interface SliderFieldProps {
  id: string
  label: string
  display: string
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
}

function SliderField({ id, label, display, min, max, step, value, onChange }: SliderFieldProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="eyebrow text-bronze">
          {label}
        </label>
        <span className="text-lg font-medium tabular-nums text-sand-50">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-4 h-1 w-full cursor-pointer appearance-none rounded-full bg-sand-50/20 accent-sand-50"
      />
    </div>
  )
}
