'use client'

import { AuthContext } from '@/auth/Auth-context'
import { AvatarIcon } from '@/components/icons/avatar'
import Image from 'next/image'
import { useContext } from 'react'

export const HeaderAdmin = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className='h-[60px] mb-4 rounded flex justify-end font-bold items-center gap-2 shadow bg-white text-black px-10'>
      {user?.company.name}
      <div className='border bg-[--main-yellow] w-10 h-10 grid place-content-center rounded-full'>
        {!user?.company.photo ? (
          <AvatarIcon />
        ) : (
          <Image
            width={300}
            height={300}
            alt={`Logo de ${user.company.name}`}
            src={user.company.photo}
          />
        )}
      </div>
    </div>
  )
}
