import { useTranslation } from 'react-i18next'

const statKeys = ['residences', 'typologies', 'boulevard', 'roi', 'tax'] as const

export function StatsMarquee() {
  const { t } = useTranslation()
  const items = statKeys.map((key) => t(`stats.${key}`))
  // Duplicate the sequence so the -50% translate loop is seamless.
  const loop = [...items, ...items]

  return (
    <section className="hairline-y overflow-hidden bg-sand-50" aria-label="Key facts">
      <div className="marquee-track py-5 motion-reduce:animate-none">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center" aria-hidden={i >= items.length}>
            <span className="whitespace-nowrap px-8 text-sm font-medium tracking-wide text-ink-700">
              {item}
            </span>
            <span className="text-bronze/40" aria-hidden>
              —
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
