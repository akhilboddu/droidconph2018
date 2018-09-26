import { createStackNavigator } from 'react-navigation';
import {
    Home,
    Pricing,
    FaceRecognition,
    TrainFace,
    PredictFace
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
  }
},
{
    initialRouteName: "Home"
});