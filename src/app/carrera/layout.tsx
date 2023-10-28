import { FC, PropsWithChildren } from 'react'
import { HeadBar } from './components/head'
import { Footer } from './components/footer'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className='w-screen h-screen'>
      <HeadBar />
      {children}
      <Footer />
    </main>
  )
}

export default Layout
