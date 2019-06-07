import React, { Component } from 'react'
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
    Alert.alert('Imagem adicionada!', this.state.comment)
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Updalod de foto</Text>
          <Text>teste3</Text>
          <Image source={this.state.image} style={styles.image} />

          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={this.pickImage} style={styles.buttom}>
              <Text style={styles.buttomText}>Escolha a foto</Text>
            </TouchableOpacity>

            <TextInput placeholder='Algum comentário para a foto?' style={styles.input}
              value={this.state.comment} onChangeText={comment => this.setState({ comment })} />
            <TouchableOpacity onPress={this.save} style={styles.buttom}>
              <Text style={styles.buttomText}>Salvar</Text>
            </TouchableOpacity>
          </View>
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
    height: Dimensions.get('window').height / 2,
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

export default AddPhoto