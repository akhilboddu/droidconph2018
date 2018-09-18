import { createStackNavigator } from 'react-navigation';
import {
    Home,
    Pricing,
    FaceRecognition,
    TrainFace
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
  }
},
{
    initialRouteName: "Home"
});