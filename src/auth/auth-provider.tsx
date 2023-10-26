'use client'
import { FC, useReducer } from 'react'
import { AuthContext, IUserSession } from './Auth-context'
import { AuthState, authReducer } from './auth-reducer'
import axios from 'axios'

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined
}

export const AuthProvider: FC<any> = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API! + 'auth'}`, {
        email,
        password
      })
      if (!response) return false

      dispatch({
        type: '[Auth] - Login',
        payload: response.data.user as IUserSession
      })

      return true
    } catch (error) {
      console.error('Error during login:', error)
      return false
    }
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