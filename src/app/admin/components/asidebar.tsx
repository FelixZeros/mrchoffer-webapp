
import { PowerIcon } from '@/components/icons/power'
import NextLink from 'next/link'
import { Routes } from '../utils/aside-items'

export const AsideBar = () => {


    return <aside className="fixed bg-[#181818] top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4">
            <div className="flex-col text-center font-medium my-2 h-fit">
                {Routes.map(({ href, name }) => (

                    <div className='py-5 rounded-lg my-1'>
                        <NextLink
                            href={href}
                        >
                            {name}
                        </NextLink>
                    </div>
                ))}

            </div>

            <div className='grid justify-center left-0 right-0 bottom-20 fixed'>
                <div className='flex justify-center'>

                    <PowerIcon />
                </div>
                Cerrar sesión
            </div>
        </div>
    </aside>
}