import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxImage {
  id: string
  src: string
  /** Accessibility label only — not rendered as a visible caption. */
  alt: string
}

interface LightboxProps {
  images: LightboxImage[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
  closeLabel: string
}

export function Lightbox({ images, index, onClose, onNavigate, closeLabel }: LightboxProps) {
  const isOpen = index !== null

  useEffect(() => {
    if (!isOpen) return

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onNavigate((index + 1) % images.length)
      if (event.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length)
    }

    document.addEventListener('keydown', handleKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, index, images.length, onClose, onNavigate])

  const current = isOpen ? images[index] : null

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-ink-900/90 p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-sand-50/30 text-sand-50 transition-colors hover:bg-sand-50/10 md:right-8 md:top-8"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous"
                onClick={(event) => {
                  event.stopPropagation()
                  onNavigate((index! - 1 + images.length) % images.length)
                }}
                className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-sand-50/30 text-sand-50 transition-colors hover:bg-sand-50/10 md:left-8"
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={(event) => {
                  event.stopPropagation()
                  onNavigate((index! + 1) % images.length)
                }}
                className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-sand-50/30 text-sand-50 transition-colors hover:bg-sand-50/10 md:right-8"
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
            </>
          )}

          <motion.img
            key={current.id}
            src={current.src}
            alt={current.alt}
            className="max-h-[85vh] w-auto max-w-full rounded-sm object-contain"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
