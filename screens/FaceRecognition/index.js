import React from 'react';
import {
    FaceContainer,
    FaceButton,
    ButtonText
} from './Styles'

export default class FaceRecognition extends React.Component {
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

  render() {
    return (
      <FaceContainer>
        <FaceButton onPress={this.goToTrainFace}>
          <ButtonText>TRAIN FACE</ButtonText>
        </FaceButton>
        <FaceButton>
          <ButtonText>PREDICT FACE</ButtonText>
        </FaceButton>
      </FaceContainer>
    );
  }

  goToTrainFace = () => {
    this.props.navigation.navigate("TrainFace")
  }
}
