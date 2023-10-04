'use client'

import SignInForm from '@/components/auth/sign-in'
import { Inter } from '@next/font/google'
import { type FC } from 'react'
import {Footer} from "@/components/auth/sign-in/footer";

const inter = Inter({ subsets: ['latin'] })

const Home: FC = () => {
  return (
    <main className={inter.className}>
      <div className=" px-0 py-0 rounded dark:bg-neutral-800 flex content-center">
        <SignInForm/>
      </div>
    </main>
  )
}

export default Home
