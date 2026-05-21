import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { SectionHeader } from '../components/ui/section-header'
import { Lightbox } from '../components/ui/lightbox'
import { galleryItems, type GalleryCategory } from '../data/apartments'
import { cn } from '../lib/cn'

type Filter = 'all' | GalleryCategory

const filters: Filter[] = ['all', 'exterior', 'interior', 'facilities']

const tintClass: Record<'sand-200' | 'sand-300' | 'sand-400', string> = {
  'sand-200': 'bg-sand-200',
  'sand-300': 'bg-sand-300',
  'sand-400': 'bg-sand-400',
}

export function Gallery() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<Filter>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const visible = useMemo(
    () => (filter === 'all' ? galleryItems : galleryItems.filter((item) => item.category === filter)),
    [filter],
  )

  const lightboxImages = visible.map((item) => ({
    id: item.id,
    caption: t(`galleryPage.captions.${item.captionKey}`),
    aspect: item.aspect,
    tint: item.tint,
  }))

  return (
    <div className="container-page py-20 md:py-28">
      <SectionHeader label={t('galleryPage.sectionLabel')}>
        <h1 className="display max-w-2xl text-[clamp(2rem,5vw,3.5rem)] leading-tight">
          {t('galleryPage.headline')}
        </h1>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label={t('galleryPage.sectionLabel')}>
          {filters.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setFilter(value)
                setLightboxIndex(null)
              }}
              aria-pressed={filter === value}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                filter === value
                  ? 'border-ink-900 bg-ink-900 text-sand-50'
                  : 'border-ink-900/15 text-ink-500 hover:border-ink-900/40 hover:text-ink-900',
              )}
            >
              {t(`galleryPage.filters.${value}`)}
            </button>
          ))}
        </div>
      </SectionHeader>

      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {visible.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            layout
            onClick={() => setLightboxIndex(index)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
            className="group block w-full break-inside-avoid overflow-hidden rounded-sm text-left"
            aria-label={t(`galleryPage.captions.${item.captionKey}`)}
          >
            <div className={cn('ph-image w-full', item.aspect, tintClass[item.tint])}>
              <div className="flex h-full items-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="relative z-1 rounded-full bg-sand-50/85 px-3 py-1.5 text-xs font-medium text-ink-700 backdrop-blur-sm">
                  {t(`galleryPage.captions.${item.captionKey}`)}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <Lightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
        closeLabel={t('galleryPage.close')}
      />
    </div>
  )
}
