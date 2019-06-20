import { ADD_POST, ADD_COMMENT } from './actionTypes'
import axios from 'axios'

// passa post por parâmetro e retorna post pelo payload
export const addPost = post => {
  return dispatch => {
    // armazena em um arquivo posts.json
    axios.post('/posts.json', { ...post })
      .catch(err => console.log(err))
      .then(res => console.log(res.data))
  }
  // return {
  //   type: ADD_POST,
  //   payload: post
  // }
}

export const addComment = payload => {
  return {
    type: ADD_COMMENT,
    payload // mesma coisa que payload: payload
  }
}