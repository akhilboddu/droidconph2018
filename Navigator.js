import { createStackNavigator } from 'react-navigation';
import {
    Home
} from './screens'

export default createStackNavigator({
  Home: {
    screen: Home,

  },
},
{
    initialRouteName: "Home"
});