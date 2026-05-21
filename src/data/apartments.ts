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
  /** Public path to the apartment render (served from /public). */
  image: string
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
    image: '/images/apartments/studio.png',
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
    image: '/images/apartments/one-bedroom.png',
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
    image: '/images/apartments/one-bedroom.png',
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
    image: '/images/apartments/two-bedroom.png',
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
    image: '/images/apartments/two-bedroom2.png',
  },
]

export function getApartmentBySlug(slug: string | undefined): Apartment | undefined {
  return apartments.find((apartment) => apartment.slug === slug)
}

export interface GalleryItem {
  id: string
  category: GalleryCategory
  /** Public path to the photo (served from /public). */
  image: string
}

export const galleryItems: GalleryItem[] = [
  { id: 'g12', category: 'exterior', image: '/images/gallery/gallery-12.jpg' },
  { id: 'g01', category: 'interior', image: '/images/gallery/gallery-01.jpg' },
  { id: 'g04', category: 'facilities', image: '/images/gallery/gallery-04.jpg' },
  { id: 'g05', category: 'exterior', image: '/images/gallery/gallery-05.jpg' },
  { id: 'g02', category: 'interior', image: '/images/gallery/gallery-02.jpg' },
  { id: 'g10', category: 'facilities', image: '/images/gallery/gallery-10.jpg' },
  { id: 'g06', category: 'exterior', image: '/images/gallery/gallery-06.jpg' },
  { id: 'g09', category: 'facilities', image: '/images/gallery/gallery-09.jpg' },
  { id: 'g03', category: 'facilities', image: '/images/gallery/gallery-03.jpg' },
  { id: 'g08', category: 'exterior', image: '/images/gallery/gallery-08.jpg' },
  { id: 'g11', category: 'facilities', image: '/images/gallery/gallery-11.jpg' },
  { id: 'g07', category: 'facilities', image: '/images/gallery/gallery-07.jpg' },
]

export interface LocationPlace {
  /** Lookup key under `location.places.<key>`. */
  key: string
  minutes: number
  /** Public path to the place photo (served from /public). */
  image: string
}

export const locationPlaces: LocationPlace[] = [
  { key: 'boulevard', minutes: 5, image: '/images/location/boulevard.jpg' },
  { key: 'shopping', minutes: 7, image: '/images/location/shopping.jpg' },
  { key: 'medical', minutes: 8, image: '/images/location/medical.jpg' },
  { key: 'stadium', minutes: 10, image: '/images/location/stadium.jpg' },
  { key: 'airport', minutes: 7, image: '/images/location/airport.jpg' },
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
