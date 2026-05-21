import { useTranslation } from 'react-i18next'
import { SectionHeader } from '../ui/section-header'

export function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="container-page py-24 md:py-32">
      <SectionHeader number="01" label={t('about.sectionLabel')}>
        <h2 className="display max-w-3xl text-[clamp(1.75rem,4vw,3rem)] leading-tight">
          {t('about.headline')}
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
          <p className="text-base leading-relaxed text-ink-500">{t('about.p1')}</p>
          <p className="text-base leading-relaxed text-ink-500">{t('about.p2')}</p>
        </div>
      </SectionHeader>
    </section>
  )
}
