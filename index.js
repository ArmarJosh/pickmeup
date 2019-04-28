/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//Remove When Done!
import Login from "./scr/screens/Login";
import SignUp from "./scr/screens/SignUp";
import Driver from "./scr/screens/Driver";
import DriverTripDetails from "./scr/screens/DriverTripDetails";




AppRegistry.registerComponent(appName, () => SignUp);
