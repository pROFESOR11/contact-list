export const CONFIG = {
  // use vercel url if exists, otherwise fallback to localhost
  API_ROUTE:
    (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000') +
    '/api',
}
