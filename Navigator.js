import { createStackNavigator } from 'react-navigation';
import {
    Home,
    Pricing,
    FaceRecognition,
    TrainFace,
    PredictFace,
    PredictPrice
} from './screens'

export default createStackNavigator({
  Home: {
    screen: Home,
  },
  Pricing: {
    screen: Pricing
  },
  FaceRecognition: {
    screen: FaceRecognition
  },
  TrainFace: {
    screen: TrainFace
  },
  PredictFace: {
    screen: PredictFace
  },
  PredictPrice: {
    screen: PredictPrice
  }
},
{
    initialRouteName: "Home"
});