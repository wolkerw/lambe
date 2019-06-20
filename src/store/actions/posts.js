import { ADD_POST, ADD_COMMENT } from './actionTypes'

// passa post por parâmetro e retorna post pelo payload
export const addPost = post => {
  return {
    type: ADD_POST,
    payload: post
  }
}

export const addComment = payload => {
  return {
    type: ADD_COMMENT,
    payload // mesma coisa que payload: payload
  }
}