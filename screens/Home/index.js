import React from 'react';
import {
    HomeContainer,
    HomeButton,
    ButtonText
} from './Styles'

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
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
      <HomeContainer>
        <HomeButton onPress={this.goToPricing}>
          <ButtonText>HOUSE PRICES</ButtonText>
        </HomeButton>
        <HomeButton onPress={this.goToFaceRecognition}>
          <ButtonText>FACE RECOGNITION</ButtonText>
        </HomeButton>
      </HomeContainer>
    );
  }

  goToPricing = () => {
    this.props.navigation.navigate("Pricing")
  }

  goToFaceRecognition = () => {
    this.props.navigation.navigate("FaceRecognition")
  }
}
