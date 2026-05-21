import { Navigate, type RouteObject } from 'react-router'
import { DEFAULT_LOCALE } from './i18n/config'
import { LayoutWrapper } from './components/layout/layout-wrapper'
import { NotFound } from './routes/not-found'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={`/${DEFAULT_LOCALE}`} replace />,
  },
  {
    path: '/:locale',
    element: <LayoutWrapper />,
    // Rendered while a lazy route chunk loads on first paint (avoids React
    // Router's "No HydrateFallback element provided" dev warning).
    HydrateFallback: () => null,
    children: [
      { index: true, lazy: async () => ({ Component: (await import('./routes/home')).Home }) },
      { path: 'apartments', lazy: async () => ({ Component: (await import('./routes/apartments-list')).ApartmentsList }) },
      { path: 'apartments/:slug', lazy: async () => ({ Component: (await import('./routes/apartment-detail')).ApartmentDetail }) },
      { path: 'investment', lazy: async () => ({ Component: (await import('./routes/investment')).Investment }) },
      { path: 'gallery', lazy: async () => ({ Component: (await import('./routes/gallery')).Gallery }) },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]
