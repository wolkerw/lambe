import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../store/actions/posts'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  Alert
} from 'react-native'
import ImagePicker from 'react-native-image-picker'

import icon from '../../assets/imgs/icon.png'

const noUser = 'Você precisa estar logado para adicionar imagens'

class AddPhoto extends Component {
  state = {
    image: null,
    comment: '',
  }

  pickImage = () => {
    /*ImagePicker.showImagePicker({
      title: 'Escolhar a imagem',
      maxHeight: 600,
      maxWidth: 800
    },
    ImagePicker.showImagePicker({
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      }
    },
      (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };

          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };

          this.setState({
            avatarSource: source,
          });
        }
      });*/

    if (!this.props.name) {
      Alert.alert('Falha!', noUser)
      return
    }

    ImagePicker.showImagePicker({
      title: 'Escolhar a imagem',
      maxHeight: 600,
      maxWidth: 800
    }, res => {
      if (!res.didCancel) {
        this.setState({
          image: { uri: res.uri, base64: res.data }
        })
      }
    })
  }

  save = async () => {
    if (!this.props.name) {
      Alert.alert('Falha!', noUser)
      return
    }

    //Alert.alert('Imagem adicionada!', this.state.comment)
    this.props.onAddPost({
      id: Math.random(),
      nickname: this.props.name,
      email: this.props.email,
      image: this.state.image,
      comments: [{
        nickname: this.props.name,
        comment: this.state.comment
      }]
    })

    this.setState({ image: null, comment: '' })
    this.props.navigation.navigate('Feed')
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Updalod de foto</Text>
          <Image source={this.state.image} style={styles.image} />

          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={this.pickImage} style={styles.buttom}>
              <Text style={styles.buttomText}>Escolha a foto</Text>
            </TouchableOpacity>
            <TextInput placeholder='Algum comentário para a foto?' style={styles.input}
              editable={this.props.name != null}
              value={this.state.comment} onChangeText={comment => this.setState({ comment })} />
          </View>
          <TouchableOpacity onPress={this.save} style={styles.buttom}>
            <Text style={styles.buttomText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    fontWeight: 'bold'
  },
  imageContainer: {
    width: '90%',
    height: Dimensions.get('window').width / 2,
    backgroundColor: '#EEE',
    marginTop: 10
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').height / 3,
    resizeMode: 'center'
  },
  buttom: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#4286f4'
  },
  buttomText: {
    fontSize: 20,
    color: '#000'
  },
  input: {
    marginTop: 20,
    width: '90%'
  }
})

//export default AddPhoto
const mapStateToProps = ({ user }) => {
  return {
    email: user.email,
    name: user.name
    // could pass only user or user: user that would also work
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAddPost: post => dispatch(addPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)