'use client'

import {useMutation} from '@tanstack/react-query'
import {useRouter} from 'next/navigation'
import {type FC, type PropsWithChildren, useEffect, useState} from 'react'
import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'
import {AsideBar} from './components/asidebar'
import {HeaderAdmin} from './components/header'
import {Arow} from "@/components/icons/arow";
import Footer from "@/app/admin/components/footer";

const RootLayout: FC<PropsWithChildren> = ({children}) => {
  const supabase = useSupabaseClient()
  const router = useRouter()

  const {mutate} = useMutation(async () => {
    const {error} = await supabase.auth.signOut()
    if (error != null) throw error
  }, {
    onSuccess: () => {
      router.replace('/')
    }
  })
  const signOut = async () => {
    mutate()
  }
  const session = useSession()

  useEffect(() => {
    supabase.auth.getSession().then(session => {
      if (session.data === null) {
        console.log('No session in supabase')
        router.replace('/')
      }
      console.log('Session in supabase', session.data)
    })
  }, [session, supabase])

  const toggleAside = () => {
    setIsVisible(!isVisible);
  }
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div className="flex justify-end">
      <div
      >
        <div

          className={isVisible ? " fixed w-1/4 h-screen transform -translate-x-full transition-transform duration-500 ease-in-out" : "fixed w-1/4 h-screen transform -translate-x-full transition-transform duration-500 ease-in-out"}>
          <AsideBar isVisible={isVisible}/>

        </div>
        <button
          className={`transition-all w-6 h-1/5 bg-[#181818] rounded-tr-full fixed rounded-br-full  bottom-1/2 ${isVisible ? "  self-center transition-transform duration-500 ease-in-out" : " transform -translate-x-1/4  transition-transform duration-500 ease-in-out"}`}
          onClick={() => {
            setIsVisible(!isVisible)
          }}
        >
          <div
            className={isVisible ? "rotate-0 transition-all duration-500 text-white" : `text-white rotate-180 transition-all duration-500`}>

            <Arow/>
          </div>
        </button>
      </div>


      <div
        className={`${isVisible ? " w-3/4 transform-origin: right duration-500 ease-in-out " : "w-full transform-origin: left duration-500 ease-in-out "}`}>
        <section className="w-full h-full">
          <div className="p-4 pl-8 ">
            <HeaderAdmin/>
            <div
              className="w-full p-4 shadow rounded-lg flex items-center justify-center">
              {children}
            </div>
          </div>
          <Footer
            width={`${isVisible ? "w-4/5 transition-all" : "w-full transition-all"}`}></Footer>
        </section>
      </div>
    </div>
  )
}

export default RootLayout
