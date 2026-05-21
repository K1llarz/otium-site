import { useParams } from 'react-router'
import { DEFAULT_LOCALE, isLocale, type Locale } from '../i18n/config'

/**
 * Reads the active locale from the `:locale` route param.
 * Falls back to the default locale if the param is missing or invalid.
 */
export function useLocale(): Locale {
  const { locale } = useParams<{ locale: string }>()
  return isLocale(locale) ? locale : DEFAULT_LOCALE
}

/** Prefixes a path with the active locale, e.g. `localePath('en', '/gallery')`. */
export function localePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+/, '')
  return clean ? `/${locale}/${clean}` : `/${locale}`
}
