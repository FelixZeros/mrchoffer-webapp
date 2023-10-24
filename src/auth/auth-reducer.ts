'use client'
import { IUserSession } from './Auth-context'

export type AuthActionType = { type: string; payload: IUserSession}

export interface AuthState {
  isLoggedIn: boolean
  user?: IUserSession
}

export const authReducer = (
  state: AuthState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case '[Auth] - Login': {
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      }
    }
    case '[Auth] - Logout': {
      return {
        ...state,
        user: undefined,
        isLoggedIn: false
      }
    }
    default:
      return state
  }
}
