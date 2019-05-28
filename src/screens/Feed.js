import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  FlatList
} from 'react-native'
import Header from '../components/Header'
import Post from '../components/Post'

class Feed extends Component {
  state = {
    posts: [{
      id: Math.random(),
      nickname: 'Rafael Pereira',
      email: 'rafa@gmail.com',
      image: require('../../assets/imgs/fence.jpg'),
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
      image: require('../../assets/imgs/bw.jpg'),
      comments: []
    }]
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <FlatList data={this.state.posts}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) =>
            <Post key={item.id}{...item} />} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})

export default Feed