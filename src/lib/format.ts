/** Formats a number using the locale's grouping conventions (no decimals). */
export function formatPrice(value: number, locale: string): string {
  const intlLocale = locale === 'ka' ? 'ka-GE' : locale === 'ru' ? 'ru-RU' : 'en-US'
  return new Intl.NumberFormat(intlLocale, { maximumFractionDigits: 0 }).format(value)
}
