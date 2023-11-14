import type { FC, PropsWithChildren } from 'react'
import TripProvider from '@/context/TripState'
import { HeadBar } from '@/app/carrera/components/head'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <TripProvider>
      <main className='w-screen h-screen'>
        <HeadBar />
        {children}
      </main>
    </TripProvider>
  )
}

export default Layout
