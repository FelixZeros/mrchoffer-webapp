'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type FC, type PropsWithChildren, useEffect } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { AsideBar } from './components/asidebar'
import { HeaderAdmin } from './components/header'

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const supabase = useSupabaseClient()
  const router = useRouter()

  const { mutate } = useMutation(async () => {
    const { error } = await supabase.auth.signOut()
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

  return (
    <section>

      <AsideBar />

      <div className="p-4 sm:ml-64">

        <HeaderAdmin/>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          {children}
        </div>
      </div>
    </section>
  )
}

export default RootLayout
