'use client'

import { Inter } from '@next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type FC, type PropsWithChildren, useContext } from 'react'

import { AuthProvider } from '@/auth/auth-provider'
import { HeroImage } from './admin/components/hero-image'
import { AuthContext } from '@/auth/Auth-context'
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
              <Layout children={children} />
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

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { isLoggedIn } = useContext(AuthContext)
  return !isLoggedIn && location.pathname !== '/carrera' ? (
    <div className='grid grid-cols-2'>
      <div className='grid-cols-1'>
        <HeroImage />
      </div>
      <div className='grid-cols-1 w-full'>{children}</div>
    </div>
  ) : (
    <div>{children}</div>
  )
}
