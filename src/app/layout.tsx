'use client'

import { Inter } from '@next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState, type FC, type PropsWithChildren } from 'react'

import { AuthProvider } from '@/auth/auth-provider'
import { useRouter } from 'next/navigation'

import './globals.css'
import { HeroImage } from './admin/components/hero-image'

const queryClient = new QueryClient()
const inter = Inter({ subsets: ['latin'] })


const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const [pathname, setPathname] = useState<string>('')

  useEffect(() => {
    setPathname(location.pathname)
  }, [location.pathname])

  return (
    <html lang='en'>
      <head />
      <body>
        <main className={inter.className}>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              {pathname === '/' && (
                <div className='grid grid-cols-2'>
                  <div className='grid-cols-1'>
                    <HeroImage/>
                  </div>
                  <div className='grid-cols-1 w-full'>{children}</div>
                </div>
              )}
              {pathname !== '/' && pathname !== '/password-reset' && (
                <div>{children}</div>
              )}
            </QueryClientProvider>
          </AuthProvider>
        </main>
      </body>
      <script
        async
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_KEY}&libraries=places`}
      ></script>
    </html>
  )
}

export default RootLayout
