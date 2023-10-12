'use client'

import {useMutation} from '@tanstack/react-query'
import {useRouter} from 'next/navigation'
import {type FC, type PropsWithChildren, useEffect, useState} from 'react'
import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'
import {AsideBar} from './components/asidebar'
import {HeaderAdmin} from './components/header'
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
    <>
      <div className="flex flex-row">
        <div
          className={`${isVisible ? "w-1/5" : "hidden"} container content-center`}>

          <AsideBar isVisible={isVisible}/>
        </div>
        <div style={isVisible ? {left: "20%"} : {}}
             className="h-full absolute flex flex-col top-0 left-0  justify-center items-center">
          <button

            className="w-6 h-1/6 bg-[#181818] rounded-tr-full rounded-br-full self-center"
            onClick={toggleAside}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                 className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"/>
            </svg>

          </button>
        </div>
        <div className={`${isVisible ? "w-4/5" : "w-full"}`}>

          <section className="w-full">
            <div className="p-4 pl-8">

              <HeaderAdmin/>
              <div className="w-full p-4 shadow rounded-lg">
                {children}
              </div>
            </div>
            <div>

              <Footer></Footer>
            </div>


          </section>

        </div>
      </div>
      <div>
      </div>


    </>
  )
}

export default RootLayout
