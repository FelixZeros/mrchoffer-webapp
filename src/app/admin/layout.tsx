'use client'

import { useMutation } from '@tanstack/react-query'
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
import { Arow } from '@/components/icons/arow'
import Footer from '@/app/admin/components/footer'
import { AuthContext } from '@/auth/Auth-context'

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)

  const { isLoggedIn, user } = useContext(AuthContext)

  useEffect(() => {
    if (!isLoggedIn || user?.type !== 'company' && user?.type !== 'admin' ) router.replace('/')
    return;
  }, [isLoggedIn])

  useEffect(()=>{
    router.refresh()
  },[])

  return (
    <div className='flex justify-end'>
      {isLoggedIn && user?.type ==='company' && (
        <>
          <div>
            <div
              className={
                isVisible
                  ? ' fixed w-[20vw] h-screen transform -translate-x-full transition-transform duration-500 ease-in-out'
                  : 'fixed w-[20vw] h-screen transform -translate-x-full transition-transform duration-500 ease-in-out'
              }
            >
              <AsideBar />
            </div>
            <button
              className={`transition-all w-6 h-1/5 bg-[#181818] rounded-tr-full fixed rounded-br-full  bottom-1/2 ${
                isVisible
                  ? '  self-center transition-transform duration-500 ease-in-out'
                  : ' transform  transition-transform duration-500 ease-in-out'
              }`}
              onClick={() => {
                setIsVisible(!isVisible)
              }}
            >
              <div
                className={
                  isVisible
                    ? 'rotate-0 transition-all duration-500 text-white'
                    : `text-white rotate-180 transition-all duration-500`
                }
              >
                <Arow />
              </div>
            </button>
          </div>

          <div
            className={`${
              isVisible
                ? ' w-[80vw] transform-origin: right duration-500 ease-in-out '
                : 'w-full transform-origin: left duration-500 ease-in-out '
            }`}
          >
            <section className='w-full h-full'>
              <div className='p-4 pl-8 '>
                <HeaderAdmin />
                <div className='w-full p-4 shadow rounded-lg flex items-center justify-center'>
                  {children}
                </div>
              </div>
              <Footer
                width={`${
                  isVisible
                    ? 'w-[80vw] transition-all'
                    : 'w-full transition-all'
                }`}
              ></Footer>
            </section>
          </div>
        </>
      )}
    </div>
  )
}

export default RootLayout
