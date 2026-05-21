import { useTranslation } from 'react-i18next'
import { SectionHeader } from '../components/ui/section-header'
import { ApartmentCard } from '../components/sections/apartments-preview'
import { apartments } from '../data/apartments'

export function ApartmentsList() {
  const { t } = useTranslation()

  return (
    <div className="container-page py-20 md:py-28">
      <SectionHeader label={t('apartmentsPage.sectionLabel')}>
        <h1 className="display max-w-2xl text-[clamp(2rem,5vw,3.5rem)] leading-tight">
          {t('apartmentsPage.headline')}
        </h1>
        <p className="mt-6 max-w-md text-base text-ink-500">{t('apartmentsPage.subhead')}</p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {apartments.map((apartment, index) => (
            <ApartmentCard key={apartment.slug} apartment={apartment} index={index} />
          ))}
        </div>
      </SectionHeader>
    </div>
  )
}
