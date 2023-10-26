'use client'
import { createContext } from 'react'

export interface IUserSession {
  type: string
  company: {
    id: number
    userId: number
    name: string
    address: string
    city: string
    phone: string
    photo: string
  }
}
export interface ContextProps {
  isLoggedIn: boolean
  user?: IUserSession
  logout: () => void
  loginUser: (username: string, passowrd: string) => Promise<any>
}

export const AuthContext = createContext<ContextProps>({} as ContextProps)
