'use client'

import { Inter } from '@next/font/google'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type FC, type PropsWithChildren } from 'react'
import './globals.css'

const queryClient = new QueryClient()
const inter = Inter({ subsets: ['latin'] })

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <html lang="en">
    <head/>
    <body>
    <main className={inter.className}>
      <SessionContextProvider supabaseClient={supabase}>
        <QueryClientProvider client={queryClient}>

              <div>{children}</div>
        </QueryClientProvider>
      </SessionContextProvider>
    </main>
    </body>
    <script async defer
    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_KEY}&libraries=places`}>
  </script>

    </html>
  )
}

export default RootLayout
