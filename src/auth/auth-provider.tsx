'use client'
import { FC, useReducer, useEffect } from 'react'
import { AuthContext, IUserSession } from './Auth-context'
import { AuthState, authReducer } from './auth-reducer'
import { useRouter } from 'next/navigation'

import axios from 'axios'

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined
}

export const AuthProvider: FC<any> = ({ children }: any) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const userParse = JSON.parse(user)
      setUser(userParse)
      if (userParse?.type === 'company') {
        router.push('/company/solicitudes')
      }
      if (userParse?.type === 'admin') {
        router.push('/admin/empresas')
      }
    }
  }, [])

  const loginUser = async (email: string, password: string): Promise<any> => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API! + 'auth'}`,
        {
          email,
          password
        }
      )
      if (!response) return false

      dispatch({
        type: '[Auth] - Login',
        payload: response.data.user as IUserSession
      })

      const userSave = {
        ...response.data.user,
        emal: email
      }

      localStorage.setItem('user', JSON.stringify(userSave))

      return {
        userSave,
        isLogged: true
      }
    } catch (error) {
      console.error('Error during login:', error)
      return false
    }
  }

  const setUser = (user: any) => {
    dispatch({
      type: 'SET_USER',
      payload: user
    })
  }

  const logout = () => {
    dispatch({
      type: '[Auth] - Logout'
    })
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,

        loginUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
