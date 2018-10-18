import React from 'react';
import {
    PricingContainer
} from './Styles'
import Config from 'react-native-config'

export default class PredictPrice extends React.Component {
  static navigationOptions = {
    title: 'Predict Price',
    headerStyle: {
      backgroundColor: '#222',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  async componentDidMount() {
    try {
      const response = await fetch(process.env.AZURE_ML_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.AZURE_ML_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "Inputs": {
            "input1": {
              "ColumnNames": [
                "id",
                "date",
                "price",
                "bedrooms",
                "bathrooms",
                "sqft_living",
                "sqft_lot",
                "floors",
                "waterfront",
                "view",
                "condition",
                "grade",
                "sqft_above",
                "sqft_basement",
                "yr_built",
                "yr_renovated",
                "zipcode",
                "lat",
                "long",
                "sqft_living15",
                "sqft_lot15"
              ],
              "Values": [
                [
                  "0",
                  "value",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0"
                ],
              ]
            }
          },
          "GlobalParameters": {}
        })
      })

      const jsonResponse = await response.json()

      console.log(jsonResponse)
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    return (
      <PricingContainer>
        
      </PricingContainer>
    );
  }
}
