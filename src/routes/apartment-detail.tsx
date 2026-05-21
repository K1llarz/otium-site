import { Link, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useLocale, localePath } from '../hooks/use-locale'
import { getApartmentBySlug } from '../data/apartments'
import { formatPrice } from '../lib/format'
import { NotFound } from './not-found'

export function ApartmentDetail() {
  const { t } = useTranslation()
  const locale = useLocale()
  const { slug } = useParams<{ slug: string }>()
  const apartment = getApartmentBySlug(slug)

  if (!apartment) {
    return <NotFound />
  }

  const specs = [
    { label: t('apartments.specs.area'), value: `${apartment.area} ${t('common.metric.sqm')}` },
    { label: t('apartments.specs.bedrooms'), value: String(apartment.bedrooms) },
    { label: t('apartments.specs.bathrooms'), value: String(apartment.bathrooms) },
    { label: t('apartments.specs.balcony'), value: `${apartment.balconyArea} ${t('common.metric.sqm')}` },
    {
      label: t('apartments.specs.priceFrom'),
      value: `${t('common.currency')}${formatPrice(apartment.priceFrom, locale)}`,
    },
  ]

  return (
    <div className="container-page py-12 md:py-16">
      <Link
        to={localePath(locale, 'apartments')}
        className="inline-flex items-center gap-2 text-sm text-ink-500 transition-colors hover:text-ink-900"
      >
        <ArrowLeft size={16} strokeWidth={1.5} />
        {t('apartmentDetail.back')}
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <figure>
          <div className="ph-image relative aspect-square w-full overflow-hidden rounded-sm bg-sand-300">
            <img
              src={apartment.image}
              alt={t(`apartments.types.${apartment.nameKey}.name`)}
              className="absolute inset-0 h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = 'none'
              }}
            />
          </div>
          <figcaption className="mt-3 text-xs text-bronze">{t('apartmentDetail.floorPlanCaption')}</figcaption>
        </figure>

        <div>
          <p className="eyebrow">[ {apartment.number} ] {t('apartments.sectionLabel')}</p>
          <h1 className="display mt-4 text-[clamp(2rem,5vw,3.25rem)] leading-tight">
            {t(`apartments.types.${apartment.nameKey}.name`)}
          </h1>

          <p className="mt-2 text-sm text-bronze">
            {t('common.from')} {t('common.currency')}
            {formatPrice(apartment.priceFrom, locale)}
          </p>

          <div className="mt-8">
            <p className="eyebrow">{t('apartmentDetail.overview')}</p>
            <p className="mt-3 max-w-md text-base leading-relaxed text-ink-500">
              {t(`apartments.types.${apartment.nameKey}.description`)}
            </p>
          </div>

          <div className="mt-10">
            <p className="eyebrow">{t('apartmentDetail.specifications')}</p>
            <dl className="mt-4">
              {specs.map((spec) => (
                <div key={spec.label} className="hairline-t flex items-center justify-between py-3.5">
                  <dt className="text-sm text-ink-500">{spec.label}</dt>
                  <dd className="text-sm font-medium text-ink-900">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hairline-t mt-10 pt-8">
            <h2 className="text-lg font-medium tracking-tightest text-ink-900">
              {t('apartmentDetail.interestedHeadline')}
            </h2>
            <p className="mt-2 max-w-sm text-sm text-ink-500">{t('apartmentDetail.interestedBody')}</p>
            <Button as="link" to={`${localePath(locale)}#contact`} className="mt-6">
              {t('common.requestInformation')}
              <ArrowRight size={16} strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
