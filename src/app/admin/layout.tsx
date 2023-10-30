'use client'

import { useRouter } from 'next/navigation'
import {
  type FC,
  type PropsWithChildren,
  useEffect,
  useState,
  useContext
} from 'react'
import { AsideBar } from './components/asidebar'
import { HeaderAdmin } from './components/header'
import Footer from '@/app/admin/components/footer'
import { AuthContext } from '@/auth/Auth-context'

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { isLoggedIn, user } = useContext(AuthContext)

  useEffect(() => {
    if (!isLoggedIn || (user?.type !== 'company' && user?.type !== 'admin'))
      router.replace('/')
    return
  }, [isLoggedIn])

  return (
    <div className='flex justify-end'>
      {isLoggedIn && (
        <>
          <AsideBar />
          <div
            className={`w-[85vw] transform-origin: right duration-500 ease-in-out'`}
          >
            <section className='flex-1 w-full h-full'>
              <div className='p-4 pl-8 '>
                <HeaderAdmin />
                <div className='w-full flex-1 p-4 shadow rounded-lg flex items-center justify-center overflow-auto'>
                  {children}
                </div>
              </div>
              <Footer></Footer>
            </section>
          </div>
        </>
      )}
    </div>
  )
}

export default RootLayout
