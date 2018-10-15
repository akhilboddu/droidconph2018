import React from 'react';
import { ActivityIndicator, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import {
  CenterButton,
  NameBox
} from './Styles'

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const mutation = gql`
  mutation TrainFace($name: String!, $base64: String!) {
    addFace(name: $name, imageData: $base64) {
      ok
    }
  }
`

class TrainFace extends React.Component {
  static navigationOptions = {
    title: 'Add Face',
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
    name: "",
    loading: false
  };
  
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePhoto = addFace => async () => {
    if (this.camera) {
      const { base64 } = await this.camera.takePictureAsync({
        base64: true
      })

      try {
        this.setState({loading: true})

        const {name} = this.state

        const response = await addFace({variables: {
          name,
          base64
        }})

        this.setState({loading: false})

        console.log(response)
      } catch (err) {
        this.setState({loading: false})

        console.log("Query Failed")
        console.log(err)
      }
    }
  }

  setName = name => this.setState({name})

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
            (addFace, {_data}) => (
              <View style={{ flex: 1 }}>
                <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }} type={this.state.type}>
                  <NameBox onChangeText={this.setName} placeholder="Enter Name Here" value={this.state.name} />
                  <CenterButton onPress={this.takePhoto(addFace)}>
                    { loading
                      ? <ActivityIndicator size="large" animating={loading} color="#00ff00" style={{marginBottom: 10}} />
                      : <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                          Add Face
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

export default TrainFace