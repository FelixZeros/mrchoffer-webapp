'use client'

import { Inter } from '@next/font/google'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type FC, type PropsWithChildren } from 'react'
import './globals.css'
import Image from 'next/image'
import heroimg from '@/assets/hero-img.png'
const queryClient = new QueryClient()
const inter = Inter({ subsets: ['latin'] })

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <html lang='en'>
      <head />
      <body>
        <main className={inter.className}>
          <SessionContextProvider supabaseClient={supabase}>
            <QueryClientProvider client={queryClient}>
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
            </QueryClientProvider>
          </SessionContextProvider>
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
