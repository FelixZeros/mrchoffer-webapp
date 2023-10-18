'use State'
import { PowerIcon } from '@/components/icons/power'
import NextLink from 'next/link'
import { Routes } from '../utils/aside-items'
import Image from 'next/image'
import Logo from '../../../../public/logo.svg'
import { useContext } from 'react'
import { AuthContext } from '@/auth/Auth-context'

export const AsideBar = () => {
  const { logout } = useContext(AuthContext)
  return (
    <aside className={'w-full h-screen bg-[#181818] '} aria-label='Sidebar'>
      <div className='w-full grid place-content-center pt-5'>
        <Image width={100} src={Logo} alt='Logo de Mr.Choffer' />
      </div>
      <div className='h-full px-3 py-4'>
        <div className='flex-col text-center font-medium my-2 h-fit'>
          {Routes.map(({ href, name, Icon }) => (
            <div className='py-5 rounded-lg text-white hover:text-black my-1 transition-all cursor-pointer hover:bg-[--main-yellow]'>
              <NextLink
                href={href}
                className='flex justify-center items-center gap-1'
              >
                <Icon />
                {name}
              </NextLink>
            </div>
          ))}
        </div>

        <div
          onClick={() => logout()}
          className='grid justify-center  hover:text-white text-[--main-yellow] cursor-pointer transition-all left-0 right-0 -bottom-60 relative'
        >
          <div className='flex justify-center'>
            <PowerIcon />
          </div>
          Cerrar sesión
        </div>
      </div>
    </aside>
  )
}
