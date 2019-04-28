/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,} from 'react-native';
import Passenger from "./scr/screens/Passenger";
import Driver from "./scr/screens/Driver";

import ButtonComp from "./scr/components/buttonComp/ButtonComp";

//import Icon from 'react-native-vector-icons/Ionicons';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isDriver: false,
      isPassenger: false
    };
  }
  render() {
    if (this.state.isPassenger === true){
      return <Passenger/>
    }
    if(this.state.isDriver === true){
      return <Driver/>
    }
    return (
      <View style={styles.container} >
       <ButtonComp
          buttonTitle="I need a ride" 
          iconPath={require("./scr/images/icons/passenger/Icons_passenger.png")}
          onPress={() => this.setState({isPassenger:true})}
        />
        <ButtonComp 
          buttonTitle="I need passengers" 
          iconPath={require("./scr/images/icons/driver/Icons_driver.png")}
          onPress={()=> this.setState({isDriver:true})}
       />
          <View style={styles.logoFooter}>
          <Text style={styles.logoText}>Logo Here</Text>
          </View>
      </View>
      
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#4D4D4D",
  },
  logoFooter:{
    position:"absolute",
    bottom: 10,
  },
  logoText:{
    color:"#FFFFFF",
    fontSize: 20,
  },
});
