import { FC, PropsWithChildren } from 'react'
import { HeadBar } from './components/head'
import { Footer } from './components/footer'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className='absolute left-0 top-0 w-screen bg-white h-fit'>
      <HeadBar />
      {children}
      <Footer />
    </main>
  )
}

export default Layout
