import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import {
  FaceContainer,
  FaceButton,
  ButtonText
} from './Styles'

export default class TrainFace extends React.Component {
  static navigationOptions = {
    title: 'Facial Recognition',
    headerStyle: {
      backgroundColor: '#222',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    base64Photo: ""
  };
  
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePhoto = async () => {
    if (this.camera) {
      const {base64} = await this.camera.takePictureAsync({
        base64: true
      })

      this.setState({base64})
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
        <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type}>
        <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
        }}>
        </View>
          <TouchableOpacity
          style={{
            flex: 0.1,
            alignSelf: 'flex-end',
            alignItems: 'center',
          }}
          onPress={() => {
            this.setState({
              type: this.state.type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back,
            });
          }}>
            <Text
            style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
            {' '}Flip{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{
            flex: 0.1,
            alignSelf: 'flex-end',
            alignItems: 'center',
          }}
          onPress={this.takePhoto}>
            <Text
            style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
            {' '}Take Photo{' '}
            </Text>
          </TouchableOpacity>
        </Camera>
        </View>
      );
    }
  }
  
}