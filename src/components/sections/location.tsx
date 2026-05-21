import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { MapPin } from 'lucide-react'
import { SectionHeader } from '../ui/section-header'
import { locationPlaces } from '../../data/apartments'

export function Location() {
  const { t } = useTranslation()

  return (
    <section id="location" className="container-page py-24 md:py-32">
      <SectionHeader number="05" label={t('location.sectionLabel')}>
        <h2 className="display max-w-2xl text-[clamp(1.75rem,4vw,3rem)] leading-tight">
          {t('location.headline')}
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {locationPlaces.map((place, i) => (
            <motion.article
              key={place.key}
              className="ph-image relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-sm bg-sand-300 p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <img
                src={place.image}
                alt={t(`location.places.${place.key}`)}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                onError={(event) => {
                  // Fall back to the gradient placeholder if the file is missing.
                  event.currentTarget.style.display = 'none'
                }}
              />
              {/* Dark gradient for legibility of the label at the bottom. */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/15 to-ink-900/10" />

              <span className="relative z-1 flex h-8 w-8 items-center justify-center rounded-full bg-sand-50/85 text-ink-900 backdrop-blur-sm">
                <MapPin size={15} strokeWidth={1.5} />
              </span>
              <div className="relative z-1">
                <p className="text-sm font-medium leading-snug text-sand-50">
                  {t(`location.places.${place.key}`)}
                </p>
                <p className="mt-1 text-xs text-sand-200">
                  {place.minutes} {t('common.metric.min')}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </SectionHeader>
    </section>
  )
}
