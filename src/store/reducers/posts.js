import { ADD_POST, ADD_COMMENT } from '../actions/actionTypes'

const initialState = {
  posts: [{
    id: Math.random(),
    nickname: 'Rafael Pereira',
    email: 'rafa@gmail.com',
    image: require('../../../assets/imgs/fence.jpg'),
    comments: [{
      nickname: 'John',
      comment: 'Stunning'
    }, {
      nickname: 'John 2',
      comment: 'Stunning 2'
    }]
  }, {
    id: Math.random(),
    nickname: 'Rafael Pereira2',
    email: 'rafa@gmail.com2',
    image: require('../../../assets/imgs/bw.jpg'),
    comments: []
  }]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return { // pega o estado atual e altera apenas o nome e o e-mail
        ...state,
        posts: state.posts.concat({
          ...action.payload
        })
      }
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.postId) {
            if (post.comments) {
              post.comments = post.comments.concat(
                action.payload.comment
              )
            } else {
              post.comments = [action.payload.comment]
            }
          }
          return post
        })
      }
    default:
      return state
  }
}

export default reducer