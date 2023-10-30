'use State'
import { PowerIcon } from '@/components/icons/power'
import NextLink from 'next/link'
import { Route, Routes, routes_admin } from '../utils/aside-items'
import Image from 'next/image'
import Logo from '../../../../public/logo.svg'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react'
import { AuthContext } from '@/auth/Auth-context'
import { Arow } from '@/components/icons/arow'

interface AsideContextProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const AsideContext = createContext({} as AsideContextProps)
const { Provider } = AsideContext

const NavLink = ({ route }: { route: Route }) => {
  const { isOpen } = useContext(AsideContext)

  const { Icon, href, name } = route

  return (
    <div
      className={` rounded-lg text-white hover:text-black my-1 transition-all cursor-pointer hover:bg-[--main-yellow]`}
    >
      <NextLink
        href={href}
        className={`flex py-5  ${
          isOpen ? 'justify-center' : 'justify-end pr-[17%]'
        } w-full h-full items-center gap-1`}
      >
        <Icon />
        {isOpen && name}
      </NextLink>
    </div>
  )
}

export const AsideBar = ({}) => {
  const { user, logout } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    <Provider
      value={{
        isOpen,
        setIsOpen
      }}
    >
      <aside
        className={`${
          !isOpen && '-translate-x-1/2'
        } w-[15vw] transition-all h-screen bg-[#181818] relative`}
        aria-label='Sidebar'
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`absolute text-white top-0 bottom-0 my-auto right-0 translate-x-full bg-[#181818] rounded-r-full h-1/5 z-50 hover:text-[--main-yellow]`}
        >
          <div
            className={`${
              !isOpen ? 'transition-all rotate-180' : 'transition-all rotate-0'
            }`}
          >
            <Arow />
          </div>
        </button>

        <div className={`w-full flex items-center  pt-5 ${isOpen ? 'justify-center' : 'justify-end pr-[12%]'} `}>
          <div className={`${!isOpen && 'scale-75'}`}>
            <Image width={100} src={Logo} alt='Logo de Mr.Choffer' />
          </div>
        </div>
        <div className='h-full px-3 py-4'>
          <div className='flex-col text-center font-medium my-2 h-fit'>
            {user?.type === 'company'
              ? Routes.map(route => <NavLink route={route} />)
              : routes_admin.map(route => <NavLink route={route} />)}
          </div>

          <div
            onClick={() => logout()}
            className={`grid ${
              isOpen ? 'justify-center' : 'justify-end pr-[17%]'
            } hover:text-white text-[--main-yellow] cursor-pointer transition-all left-0 right-0 -bottom-60 relative`}
          >
            <div className='flex justify-center'>
              <PowerIcon />
            </div>
            {isOpen && 'Cerrar sesión'}
          </div>
        </div>
      </aside>
    </Provider>
  )
}

/* <button
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
*/
