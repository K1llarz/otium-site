import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { SectionHeader } from '../ui/section-header'
import { amenityKeys } from '../../data/apartments'

export function Amenities() {
  const { t } = useTranslation()

  return (
    <section id="amenities" className="bg-sand-100">
      <div className="container-page py-24 md:py-32">
        <SectionHeader number="04" label={t('amenities.sectionLabel')}>
          <h2 className="display max-w-2xl text-[clamp(1.75rem,4vw,3rem)] leading-tight">
            {t('amenities.headline')}
          </h2>

          <ul className="mt-14 grid gap-x-8 gap-y-px sm:grid-cols-2 lg:grid-cols-3">
            {amenityKeys.map((key, i) => (
              <motion.li
                key={key}
                className="hairline-t flex items-baseline gap-4 py-5"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              >
                <span className="text-xs font-medium tabular-nums text-bronze">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-base text-ink-700">{t(`amenities.items.${key}`)}</span>
              </motion.li>
            ))}
          </ul>
        </SectionHeader>
      </div>
    </section>
  )
}
