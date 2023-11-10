import type { FC, PropsWithChildren } from 'react'
import { HeadBar } from './components/head'
import TripProvider from '@/context/TripState'

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
