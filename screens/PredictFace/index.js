import React from 'react';
import { ActivityIndicator, Alert, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import {
  CenterButton
} from './Styles'

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const mutation = gql`
  mutation PredictFace($base64: String) {
    recognizeFaces(imageData: $base64) {
        names
    }
  }
`

class PredictFace extends React.Component {
  static navigationOptions = {
    title: 'Recognize Face',
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
    base64Photo: "",
    loading: false
  };
  
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePhoto = recognizeFaces => async () => {
    this.setState({loading: true})

    if (this.camera) {
      const { base64 } = await this.camera.takePictureAsync({
        base64: true
      })

      try {
        const response = await recognizeFaces({variables: {
          base64
        }})

        this.setState({loading: false})

        const {names} = response.data.recognizeFaces

        Alert.alert("Predicted Faces", names.join(', '))
      } catch (err) {
        this.setState({loading: false})
        console.log("Query Failed")
        console.log(err)
      }
    }
  }

  render() {
    const { hasCameraPermission, loading } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <Mutation mutation={mutation}>
          {
            (recognizeFaces, {_data}) => (
              <View style={{ flex: 1 }}>
                <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }} type={this.state.type}>
                  <CenterButton disabled={loading} onPress={this.takePhoto(recognizeFaces)}>
                    { loading
                        ? <ActivityIndicator size="large" animating={loading} color="#00ff00" style={{marginBottom: 10}} />
                        : <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                            Recognize
                          </Text>
                    }
                  </CenterButton>
                </Camera>
              </View>
            )
          }
        </Mutation>
      );
    }
  }
  
}

export default PredictFace