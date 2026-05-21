import { motion } from 'motion/react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '../ui/section-header'
import { Button } from '../ui/button'
import { useLocale, localePath } from '../../hooks/use-locale'
import { apartments, type Apartment } from '../../data/apartments'
import { formatPrice } from '../../lib/format'

const tints = ['bg-sand-200', 'bg-sand-300', 'bg-sand-400']

interface ApartmentCardProps {
  apartment: Apartment
  index: number
}

export function ApartmentCard({ apartment, index }: ApartmentCardProps) {
  const { t } = useTranslation()
  const locale = useLocale()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <Link to={localePath(locale, `apartments/${apartment.slug}`)} className="group block">
        <div className={`ph-image relative aspect-square w-full overflow-hidden rounded-sm ${tints[index % tints.length]}`}>
          <img
            src={apartment.image}
            alt={t(`apartments.types.${apartment.nameKey}.name`)}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            onError={(event) => {
              // Gracefully fall back to the gradient placeholder if the file is missing.
              event.currentTarget.style.display = 'none'
            }}
          />
          <div className="relative flex h-full items-start justify-end p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-sand-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-2">
          <h3 className="text-lg font-medium tracking-tightest text-ink-900">
            {t(`apartments.types.${apartment.nameKey}.name`)}
          </h3>
          <span className="text-sm text-bronze">
            {apartment.area} {t('common.metric.sqm')}
          </span>
        </div>
        <p className="mt-1 text-sm text-ink-500">
          {t('common.from')} {t('common.currency')}
          {formatPrice(apartment.priceFrom, locale)}
        </p>
      </Link>
    </motion.div>
  )
}

export function ApartmentsPreview() {
  const { t } = useTranslation()
  const locale = useLocale()
  const preview = apartments.slice(0, 3)

  return (
    <section id="residences" className="container-page py-24 md:py-32">
      <SectionHeader number="03" label={t('apartments.sectionLabel')}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display max-w-xl text-[clamp(1.75rem,4vw,3rem)] leading-tight">
            {t('apartments.headline')}
          </h2>
          <Button as="link" to={localePath(locale, 'apartments')} variant="outline" className="self-start md:self-auto">
            {t('apartments.cta')}
          </Button>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((apartment, index) => (
            <ApartmentCard key={apartment.slug} apartment={apartment} index={index} />
          ))}
        </div>
      </SectionHeader>
    </section>
  )
}
