'use client'
import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { AsideBar } from '../admin/components/asidebar'
import { AuthContext } from '@/auth/Auth-context'

const Layout = ({ children }: any) => {
  const router = useRouter()
  const { isLoggedIn, user } = useContext(AuthContext)

  useEffect(() => {
    if (isLoggedIn && user?.type !== 'company') {
      router.replace('/')
    }
  }, [isLoggedIn])

  if (user?.type !== 'company') {
    return null
  } else {
    return (
      <div className='flex justify-end'>
        <>
          <AsideBar />
          <div className='w-[80vw] transform-origin: right duration-500 ease-in-out'>
            <section className='flex-1 w-full h-full'>
              <div className='py-6 px-11 w-full'>{children}</div>
            </section>
          </div>
        </>
      </div>
    )
  }
}

export default Layout
