import { USER_LOGGED_IN, USER_LOGGED_OUT } from './actionTypes'

// action creator, that always returns a type and a payload
export const login = user => {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export const logout = user => {
  return {
    type: USER_LOGGED_OUT
  }
}