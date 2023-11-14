'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type FC, type PropsWithChildren } from 'react'
import { AuthProvider } from '@/auth/auth-provider'
import { Toaster } from 'react-hot-toast'

import './globals.css'

const queryClient = new QueryClient()

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang='en'>
      <head />
      <body>
        <main>
          <Toaster />
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </AuthProvider>
        </main>
      </body>
      <script
        async
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBEjehEkIFn2v5KMoOGery_454TWkkRIaY&libraries=places`}
      ></script>
    </html>
  )
}
export default RootLayout
