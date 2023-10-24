'use client'

import Image from 'next/image'
import heroimg from '@/assets/hero-img.png'
import { useContext } from 'react'
import { AuthContext } from '@/auth/Auth-context'
export const HeroImage = () => {

    const { isLoggedIn } = useContext(AuthContext)

    return <>
        {!isLoggedIn &&
            <Image
                src={heroimg}
                alt='Imagen'
                className={`h-full w-full object-cover`}
            />
        }
    </>
}