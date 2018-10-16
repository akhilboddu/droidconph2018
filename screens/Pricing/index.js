import React from 'react';
import {
    PricingContainer,
    PricingButton,
    ButtonText
} from './Styles'

export default class Pricing extends React.Component {
  static navigationOptions = {
    title: 'Pricing',
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
      <PricingContainer>
        <PricingButton onPress={this.goToPredictPrice}>
          <ButtonText>PREDICT PRICE</ButtonText>
        </PricingButton>
      </PricingContainer>
    );
  }

  goToPredictPrice = () => {
    this.props.navigation.navigate("PredictPrice")
  }
}
