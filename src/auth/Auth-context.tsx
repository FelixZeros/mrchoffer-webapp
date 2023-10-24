'use client'
import { createContext } from 'react'

export interface IUserSession {
  type: 'company'
  company: {
    id: 1
    userId: 1
    name: 'Afinia'
    address: 'TV 27 # 19 A 60'
    city: 'Valledupar'
    phone: '3184926452'
    photo: 'https://cu.epm.com.co/Portals/institucional/EasyDNNnews/105/img-ejercicio9.jpg'
    createdAt: '2023-10-18T15:22:53.000Z'
    updatedAt: '2023-10-18T15:22:53.000Z'
  }
}
export interface ContextProps {
  isLoggedIn: boolean
  user?: IUserSession
  logout: () => void
  loginUser: (username: string, passowrd: string) => Promise<any>
}

export const AuthContext = createContext<ContextProps>({} as ContextProps)
