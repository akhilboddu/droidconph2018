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
        <PricingButton>
          <ButtonText>PREDICT PRICE</ButtonText>
        </PricingButton>
      </PricingContainer>
    );
  }
}
