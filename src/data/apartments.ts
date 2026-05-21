export type GalleryCategory = 'exterior' | 'interior' | 'facilities'

export interface Apartment {
  slug: string
  number: string
  /** Lookup key under `apartments.types.<nameKey>` in the locale files. */
  nameKey: string
  /** Net internal area in square metres. */
  area: number
  bedrooms: number
  bathrooms: number
  /** Balcony area in square metres. */
  balconyArea: number
  /** Starting price in USD. */
  priceFrom: number
}

export const apartments: Apartment[] = [
  {
    slug: 'studio',
    number: '01',
    nameKey: 'studio',
    area: 38,
    bedrooms: 0,
    bathrooms: 1,
    balconyArea: 4,
    priceFrom: 52000,
  },
  {
    slug: 'one-bedroom-a',
    number: '02',
    nameKey: 'oneBedroomA',
    area: 54,
    bedrooms: 1,
    bathrooms: 1,
    balconyArea: 6,
    priceFrom: 78000,
  },
  {
    slug: 'one-bedroom-b',
    number: '03',
    nameKey: 'oneBedroomB',
    area: 58,
    bedrooms: 1,
    bathrooms: 1,
    balconyArea: 6,
    priceFrom: 84000,
  },
  {
    slug: 'two-bedroom-a',
    number: '04',
    nameKey: 'twoBedroomA',
    area: 82,
    bedrooms: 2,
    bathrooms: 2,
    balconyArea: 9,
    priceFrom: 124000,
  },
  {
    slug: 'two-bedroom-b',
    number: '05',
    nameKey: 'twoBedroomB',
    area: 94,
    bedrooms: 2,
    bathrooms: 2,
    balconyArea: 10,
    priceFrom: 142000,
  },
]

export function getApartmentBySlug(slug: string | undefined): Apartment | undefined {
  return apartments.find((apartment) => apartment.slug === slug)
}

export interface GalleryItem {
  id: string
  category: GalleryCategory
  /** Lookup key under `galleryPage.captions.<captionKey>`. */
  captionKey: string
  /** Tailwind aspect-ratio utility to vary the masonry rhythm. */
  aspect: string
  /** Placeholder tint, one of the sand tokens. */
  tint: 'sand-200' | 'sand-300' | 'sand-400'
}

export const galleryItems: GalleryItem[] = [
  { id: 'exterior1', category: 'exterior', captionKey: 'exterior1', aspect: 'aspect-[4/5]', tint: 'sand-400' },
  { id: 'interior1', category: 'interior', captionKey: 'interior1', aspect: 'aspect-[4/3]', tint: 'sand-300' },
  { id: 'facilities1', category: 'facilities', captionKey: 'facilities1', aspect: 'aspect-square', tint: 'sand-200' },
  { id: 'exterior2', category: 'exterior', captionKey: 'exterior2', aspect: 'aspect-[3/4]', tint: 'sand-300' },
  { id: 'interior2', category: 'interior', captionKey: 'interior2', aspect: 'aspect-square', tint: 'sand-400' },
  { id: 'facilities2', category: 'facilities', captionKey: 'facilities2', aspect: 'aspect-[4/5]', tint: 'sand-300' },
  { id: 'interior3', category: 'interior', captionKey: 'interior3', aspect: 'aspect-[4/3]', tint: 'sand-200' },
  { id: 'exterior3', category: 'exterior', captionKey: 'exterior3', aspect: 'aspect-square', tint: 'sand-400' },
  { id: 'facilities3', category: 'facilities', captionKey: 'facilities3', aspect: 'aspect-[3/4]', tint: 'sand-200' },
  { id: 'interior4', category: 'interior', captionKey: 'interior4', aspect: 'aspect-[4/5]', tint: 'sand-300' },
  { id: 'exterior4', category: 'exterior', captionKey: 'exterior4', aspect: 'aspect-[4/3]', tint: 'sand-200' },
  { id: 'facilities4', category: 'facilities', captionKey: 'facilities4', aspect: 'aspect-square', tint: 'sand-400' },
  { id: 'interior5', category: 'interior', captionKey: 'interior5', aspect: 'aspect-[3/4]', tint: 'sand-400' },
  { id: 'exterior5', category: 'exterior', captionKey: 'exterior5', aspect: 'aspect-[4/5]', tint: 'sand-300' },
  { id: 'interior6', category: 'interior', captionKey: 'interior6', aspect: 'aspect-[4/3]', tint: 'sand-200' },
  { id: 'facilities5', category: 'facilities', captionKey: 'facilities5', aspect: 'aspect-[3/4]', tint: 'sand-300' },
]

export interface LocationPlace {
  /** Lookup key under `location.places.<key>`. */
  key: string
  minutes: number
}

export const locationPlaces: LocationPlace[] = [
  { key: 'boulevard', minutes: 5 },
  { key: 'shopping', minutes: 7 },
  { key: 'medical', minutes: 8 },
  { key: 'stadium', minutes: 10 },
  { key: 'airport', minutes: 7 },
]

export const amenityKeys = [
  'indoorPool',
  'outdoorPool',
  'spa',
  'gym',
  'yoga',
  'library',
  'children',
  'solar',
  'paths',
] as const
