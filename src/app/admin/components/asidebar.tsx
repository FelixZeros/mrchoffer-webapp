import {PowerIcon} from '@/components/icons/power'
import NextLink from 'next/link'
import {Routes} from '../utils/aside-items'
import {useState} from "react";

interface Props {
  isVisible: boolean;
}

export const AsideBar = ({isVisible}: Props) => {

  return <aside
    className={"w-full h-screen bg-[#181818] "}

    aria-label="Sidebar"
  >
    <div className="h-full px-3 py-4">
      <div className="flex-col text-center font-medium my-2 h-fit">
        {Routes.map(({href, name, Icon}) => (

          <div
            className='py-5 rounded-lg  my-1 transition-all cursor-pointer hover:bg-[--main-yellow]'>
            <NextLink
              href={href}
              className='flex justify-center items-center gap-1'
            >
              <Icon/>
              {name}
            </NextLink>
          </div>
        ))}

      </div>

      <div className='grid justify-center left-0 right-0 bottom-20 fixed'>
        <div className='flex justify-center'>

          <PowerIcon/>
        </div>
        Cerrar sesión
      </div>
    </div>
  </aside>
}
