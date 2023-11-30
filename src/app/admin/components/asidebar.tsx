'use State'
import { PowerIcon } from '@/components/icons/power'
import NextLink from 'next/link'
import { Route, routes, routes_admin } from '../utils/aside-items'
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

const NavLink = ({ route, activeRoute, setActiveRoute }: any) => {
  const { isOpen } = useContext(AsideContext)
  const { Icon, href, name } = route

  const isActive = activeRoute === href // Comprueba si la ruta actual es la activa

  const handleClick = () => {
    setActiveRoute(href) // Actualiza la ruta activa al hacer clic en la ruta
  }
  return (
    <div
      className={`rounded-lg text-white hover:text-black my-1 transition-all cursor-pointer ${
        isActive ? 'bg-[--main-yellow] ' : 'hover:bg-[--main-yellow]'
      }`}
    >
      <NextLink href={href} passHref>
        <div
          className={`flex py-5 2xl:px-10 ${
            isOpen ? 'gap-4 px-5' : 'justify-end pr-[17%]'
          } w-full h-full items-center gap-1`}
          onClick={handleClick} // Manejar el clic en la ruta
        >
          <div className={isActive ? 'text-black' : 'text-white'}>
            <Icon />
          </div>
          <p className={isActive ? 'text-black' : 'text-white'}>
            {isOpen && name}
          </p>
        </div>
      </NextLink>
    </div>
  )
}

export const AsideBar = ({}) => {
  const { user, logout } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [activeRoute, setActiveRoute] = useState<string>('admin/empresas') // Estado para la ruta activa

  console.log(user?.type)

  return (
    <Provider
      value={{
        isOpen,
        setIsOpen
      }}
    >
      <aside
        className={`${!isOpen && '-translate-x-1/2'}  transition-all h-screen ${
          user?.type === 'admin' ? 'w-[15vw]' : 'w-[20vw]'
        } bg-[#181818] fixed left-0 uppercase`}
        aria-label='Sidebar'
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`absolute text-white top-0 bottom-0 my-auto right-0 translate-x-full bg-[#181818] rounded-r-2xl h-fit py-6 pr-2 z-50 hover:text-[--main-yellow]`}
        >
          <div
            className={`${
              !isOpen ? 'transition-all rotate-180' : 'transition-all rotate-0'
            }`}
          >
            <Arow />
          </div>
        </button>

        <div
          className={`w-full flex items-center  pt-5 ${
            isOpen ? 'justify-center' : 'justify-end pr-[12%]'
          } `}
        >
          <div className={`${!isOpen && 'scale-75'}`}>
            <Image width={100} src={Logo} alt='Logo de Mr.Choffer' />
          </div>
        </div>
        <div className='h-full px-3 py-4'>
          <div className='flex-col text-center font-bold my-2 h-fit'>
            {user?.type === 'company'
              ? routes.map(route => (
                  <NavLink
                    key={route.href}
                    route={route}
                    activeRoute={activeRoute}
                    setActiveRoute={setActiveRoute}
                  />
                ))
              : routes_admin.map(route => (
                  <NavLink
                    key={route.href}
                    route={route}
                    activeRoute={activeRoute}
                    setActiveRoute={setActiveRoute}
                  />
                ))}
          </div>

          <div
            onClick={() => logout()}
            className={`flex flex-col items-center justify-center${
              isOpen ? 'justify-center' : 'justify-end pr-[17%]'
            } hover:text-white text-[--main-yellow] cursor-pointer transition-all left-0 right-0 -bottom-10 relative`}
          >
            <div className='flex justify-center'>
              <PowerIcon />
            </div>
            {isOpen && <span className='text-xs'>Cerrar sesión</span>}
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
