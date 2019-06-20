import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../store/actions/posts'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback as TWF,
  Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

class AddComment extends Component {
  state = {
    comment: '',
    editMode: false
  }

   // 1 handleAddComment
  handleAddComment = () => {
    // 2 aqui
    //Alert.alert('Adicionado!', this.state.comment)
    this.props.onAddComment({
      postId: this.props.postId,
      comment: {
        nickname: this.props.name,
        comment: this.state.comment
      }
    })

    this.setState({ comment: '', editMode: false })
  }

  render() {
    let commentArea = null
    if (this.state.editMode) {
      // Alert.alert('Editando!')
      commentArea = (
        <View style={styles.container}>
          <TextInput placeholder='Pode comentar...'
            style={styles.input} autoFocus={true}
            value={this.state.comment}
            onChangeText={comment => this.setState({ comment })}
            onSubmitEditing={this.handleAddComment} />
            
          <TWF onPress={() => this.setState({ editMode: false })}>
            <Icon name='times' size={15} color='#555' />
          </TWF>
        </View>
      )
    } else {
      commentArea = (
        <TWF onPress={() => this.setState({ editMode: true })}>
          <View style={styles.container}>
            <Icon name='comment-o' size={25} color='#555' />
            <Text style={styles.caption}>Adicione um comentário...</Text>
          </View>
        </TWF>
      )
    }

    return (
      <View style={{ flex: 1 }}>
        {commentArea}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  caption: {
    marginLeft: 10,
    fontSize: 12,
    color: '#CCC',
  },
  input: {
    width: '90%'
  }
})

//export default AddComment
const mapStateToProps = ({ user }) => {
  return {
    user: user.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // 3 passo entra aqui, 4 chama o actionCreator addComment abaixo
    onAddComment: payload => dispatch(addComment(payload))
    // 5 actions/posts addComment
    // 6 dispara o ADD_COMMENT chamado em store/actions/posts addComment no reducers/posts
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)