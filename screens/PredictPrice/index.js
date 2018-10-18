import React from 'react';
import {Alert} from 'react-native'
import {
  ScrollingContainer,
  PricingContainer,
  InputBox,
  PricingButton,
  ButtonText
} from './Styles'

const columnNames = [
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
]

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

  state = {
    id: "0",
    date: "2018-01-01",
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqft_living: "",
    sqft_lot: "",
    floors: "",
    waterfront: "",
    view: "",
    condition: "",
    grade: "",
    sqft_above: "",
    sqft_basement: "",
    yr_built: "",
    yr_renovated: "",
    zipcode: "",
    lat: "",
    long: "",
    sqft_living15: "",
    sqft_lot15: ""
  }

  render() {
    const {
      price, bedrooms,
      bathrooms, sqft_living,
      sqft_lot, floors,
      waterfront, view,
      condition, grade,
      sqft_above, sqft_basement,
      yr_built, yr_renovated,
      zipcode, lat,
      long, sqft_living15,
      sqft_lot15
    } = this.state

    return (
      <PricingContainer behavior="padding" enabled>
        <ScrollingContainer contentContainerStyle={{flex: 1, alignItems: "center", paddingTop: 20}}>
          <InputBox placeholderTextColor="#AAA" placeholder="price" onChangeText={this.setPrice} keyboardType="numeric" value={price} />
          <InputBox placeholderTextColor="#AAA" placeholder="bedrooms" onChangeText={this.setBedrooms} keyboardType="numeric" value={bedrooms} />
          <InputBox placeholderTextColor="#AAA" placeholder="bathrooms" onChangeText={this.setBathrooms} keyboardType="numeric" value={bathrooms} />
          <InputBox placeholderTextColor="#AAA" placeholder="Living Room Square Feet" onChangeText={this.setSqftLiving} keyboardType="numeric" value={sqft_living} />
          <InputBox placeholderTextColor="#AAA" placeholder="Lot Square Feet" onChangeText={this.setSqftLot} keyboardType="numeric" value={sqft_lot} />
          <InputBox placeholderTextColor="#AAA" placeholder="Floors" onChangeText={this.setFloors} keyboardType="numeric" value={floors} />
          <InputBox placeholderTextColor="#AAA" placeholder="Waterfront" onChangeText={this.setWaterfront} keyboardType="numeric" value={waterfront} />
          <InputBox placeholderTextColor="#AAA" placeholder="View" onChangeText={this.setView} keyboardType="numeric" value={view} />
          <InputBox placeholderTextColor="#AAA" placeholder="Condition" onChangeText={this.setCondition} keyboardType="numeric" value={condition} />
          <InputBox placeholderTextColor="#AAA" placeholder="Grade" onChangeText={this.setGrade} keyboardType="numeric" value={grade} />
          <InputBox placeholderTextColor="#AAA" placeholder="Above Square Feet" onChangeText={this.setSqftAbove} keyboardType="numeric" value={sqft_above} />
          <InputBox placeholderTextColor="#AAA" placeholder="Basement Square Feet" onChangeText={this.setSqftBasement} keyboardType="numeric" value={sqft_basement} />
          <InputBox placeholderTextColor="#AAA" placeholder="Year Built" onChangeText={this.setYrBuilt} keyboardType="numeric" value={yr_built} />
          <InputBox placeholderTextColor="#AAA" placeholder="Year Renovated" onChangeText={this.setYrRenovated} keyboardType="numeric" value={yr_renovated} />
          <InputBox placeholderTextColor="#AAA" placeholder="Zip Code" onChangeText={this.setZipcode} keyboardType="numeric" value={zipcode} />
          <InputBox placeholderTextColor="#AAA" placeholder="Latitude" onChangeText={this.setLat} keyboardType="numeric" value={lat} />
          <InputBox placeholderTextColor="#AAA" placeholder="Longitude" onChangeText={this.setLong} keyboardType="numeric" value={long} />
          <InputBox placeholderTextColor="#AAA" placeholder="Living Room Square Feet 15" onChangeText={this.setSqftLiving15} keyboardType="numeric" value={sqft_living15} />
          <InputBox placeholderTextColor="#AAA" placeholder="Lot Square Feet 15" onChangeText={this.setSqftLot15} keyboardType="numeric" value={sqft_lot15} />        
        
          <PricingButton onPress={this.guess}>
            <ButtonText>Submit</ButtonText>
          </PricingButton>
        </ScrollingContainer>
      </PricingContainer>
    );
  }

  setPrice = price => this.setState({price})
  setBedrooms = bedrooms => this.setState({bedrooms})
  setBathrooms = bathrooms => this.setState({bathrooms})
  setSqftLiving = sqft_living => this.setState({sqft_living})
  setSqftLot = sqft_lot => this.setState({sqft_lot})
  setFloors = floors => this.setState({floors})
  setWaterfront = waterfront => this.setState({waterfront})
  setView = view => this.setState({view})
  setCondition = condition => this.setState({condition})
  setGrade = grade => this.setState({grade})
  setSqftAbove = sqft_above => this.setState({sqft_above})
  setSqftBasement = sqft_basement => this.setState({sqft_basement})
  setYrBuilt = yr_built => this.setState({yr_built})
  setYrRenovated = yr_renovated => this.setState({yr_renovated})
  setzipcode = zipcode => this.setState({zipcode})
  setLat = lat => this.setState({lat})
  setLong = long => this.setState({long})
  setSqftLiving15 = sqft_living15 => this.setState({sqft_living15})
  setSqftLot15 = sqft_lot15 => this.setState({sqft_lot15})

  guess = async () => {
    

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
              "ColumnNames": columnNames,
              "Values": this.getValues()
            }
          },
          "GlobalParameters": {}
        })
      })

      const jsonResponse = await response.json()

      const values = jsonResponse.Results.output1.value.Values[0]
      const mean = values[values.length-2]

      Alert.alert("Predicted Price", `$${mean}`)
    } catch(err) {
      console.log(err)
    }
  }

  getValues = () => {
    const {
      id, date,
      price, bedrooms,
      bathrooms, sqft_living,
      sqft_lot, floors,
      waterfront, view,
      condition, grade,
      sqft_above, sqft_basement,
      yr_built, yr_renovated,
      zipcode, lat,
      long, sqft_living15,
      sqft_lot15
    } = this.state

    return [
      [
        id,
        date,
        price,
        bedrooms,
        bathrooms,
        sqft_living,
        sqft_lot,
        floors,
        waterfront,
        view,
        condition,
        grade,
        sqft_above,
        sqft_basement,
        yr_built,
        yr_renovated,
        zipcode,
        lat,
        long,
        sqft_living15,
        sqft_lot15
      ],
    ]
  }
}
