'use client'

import { Inter } from '@next/font/google'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type FC, type PropsWithChildren } from 'react'
import './globals.css'
import Image from 'next/image'
import heroimg from '@/assets/hero-img.png'
import { AuthContext } from '@/auth/Auth-context'
import { AuthProvider } from '@/auth/auth-provider'
const queryClient = new QueryClient()
const inter = Inter({ subsets: ['latin'] })

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const { pathname } = location

  return (
    <html lang='en'>
      <head />
      <body>
        <main className={inter.className}>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              {pathname === ('/' || 'password-reset') ? (
                <div className='grid grid-cols-2'>
                  <div className='grid-cols-1'>
                    <Image
                      src={heroimg}
                      alt='Imagen'
                      className='h-full w-full object-cover'
                    />
                  </div>
                  <div className='grid-cols-1 w-full'>{children}</div>
                </div>
              ) : (
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
