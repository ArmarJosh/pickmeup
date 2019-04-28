/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Polyline, Marker} from 'react-native-maps';
import Icon from "react-native-vector-icons/Ionicons";

import PolyLine from "@mapbox/polyline";
import apiKey from "../googleApiKey";

import ButtonGeneric from "../components/buttonComp/ButtonGeneric";
import DriverTripDetails from "./DriverTripDetails";

export default class Driver extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: "",
      latitude: 0.347596,
      longitude: 32.5825,
      pickupPoint:"",
      destination: "",
      predictionsPickUp:[],
      predictionsDestination:[],

      pointCoords:[],

      pickUpPlaceName:"",
      PickUpPlaceId:"",
      destinationName:"",
      destinationPlaceId:"",

      isTripConfirmed: false
    };
  }
  componentDidMount(){
    //Get Current location and set initial Region to this.
    navigator.geolocation.getCurrentPosition(
      position =>{
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
       
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 20000, maximumAge:2000}
    );
  }

  // Function to get polyline on route Direction
async getRouteDirection(){
  console.log("get route Direction is being called.");
  // Declaire API Key Globally
  const apiKey = "AIzaSyAkG848wgOUnk5w3YiRCBjlplh3Nj-fjaE";
  try{
    //const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.PickUpPlaceId}&destination=place_id:${this.state.destinationPlaceId}&key=${apiKey}`);
    const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${this.state.PickUpPlaceId}&destination=place_id:${this.state.destinationPlaceId}&key=${apiKey}`);
    const json = await response.json();

    console.log(json);
    const points = PolyLine.decode(json.routes[0].overview_polyline.points);
    const pointCoords = points.map(point => {
      return {latitude:point[0], longitude:point[1]}
    });
    this.setState({pointCoords 
        //destination: destinationName
    });
    Keyboard.dismiss();
    this.map.fitToCoordinates(pointCoords, {edgePadding:{ top: 400, bottom: 250, right:20, left:20}});
  }catch (err){
    console.log(err);
  }
}
  async getRouteDirectionPickUp(pickUpId, PickUpName){
        console.log("place is is: " + pickUpId);
        console.log("place Name is: " + PickUpName);
        //let myPickUpId= pickUpId;
        
        await this.setState({
        pickUpPlaceName:PickUpName,
        PickUpPlaceId:pickUpId,
        pickupPoint:PickUpName,
        predictionsPickUp:[]
       
      });
      Keyboard.dismiss();
    console.log("this pick up place id is: " + this.state.PickUpPlaceId);
  } 

  async getRouteDirectionDestination(destinationId, destinationName){
    console.log("Destination ID is: " + destinationId);
     await this.setState({
        destinationPlaceId:destinationId,
        destinationName:destinationName,
        destination:destinationName,
        predictionsDestination:[]
      });
      Keyboard.dismiss();
      this.getRouteDirection();
  }

 // Function to call PickUp Point AutoComplete
 async onChangePickUpPoint(pickUpPoint){
  // Declaire API Key Globally
   console.log(pickUpPoint)
   const apiKey = "AIzaSyAkG848wgOUnk5w3YiRCBjlplh3Nj-fjaE";
   this.setState({
     pickupPoint:pickUpPoint
   });
   const apiURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${pickUpPoint}&location=${this.state.latitude},${this.state.longitude}&radius=2000`;
       return fetch (apiURL).then((result)=> result.json())
   .then((resultJson) =>{
     console.log(resultJson);
     this.setState({
       predictionsPickUp: resultJson.predictions
     });
   }).catch((error) => {
     console.log(error);
   });
}
  
  // Function to call Destination AutoComplete
 async onChangeDestination(destination){
     // Declaire API Key Globally
      console.log(destination)
      const apiKey = "AIzaSyAkG848wgOUnk5w3YiRCBjlplh3Nj-fjaE";
      this.setState({
        destination:destination
      });
      const apiURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${destination}&key=${apiKey}`;
          return fetch (apiURL).then((result)=> result.json())
      .then((resultJson) =>{
        console.log(resultJson);
        this.setState({
          predictionsDestination: resultJson.predictions
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    // Show Destination Maker
    let marker = null;
    if (this.state.pointCoords.length > 1){
      marker=(
        <Marker coordinate={this.state.pointCoords[this.state.pointCoords.length -1]}/>
      );
    }

    if(this.state.isTripConfirmed === true){
      console.log("this.state is:" + this.state.isTripConfirmed);
      return<DriverTripDetails/>
    }
    // Show confirm Trip Button at the bottom
    const predictionsOutPickUp = this.state.predictionsPickUp.map(prediction=>( 
        <TouchableOpacity key={prediction.id} 
        onPress={() => this.getRouteDirectionPickUp(prediction.place_id, prediction.structured_formatting.main_text)}>
            <View>
              <Text style={styles.suggestion}>
              {prediction.structured_formatting.main_text}
              </Text>
           </View>
      </TouchableOpacity>
    ));

    const predictionsOutDestination = this.state.predictionsDestination.map(prediction=>( 
      <TouchableOpacity key={prediction.id} 
      onPress={() => this.getRouteDirectionDestination(prediction.place_id, prediction.structured_formatting.main_text)}>
          <View>
            <Text style={styles.suggestion}>
            {prediction.structured_formatting.main_text}
            </Text>
         </View>
    </TouchableOpacity>
  ));
    const dropOffStyle={
      marginBottom:10,
    }
    
    return (
      <View style={styles.container}>
             <MapView 
              ref={map=> {
                this.map = map;
              }}
              style={styles.mapStyle}
              initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.00121,
            }}
            provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          >
          <Polyline
              coordinates = {this.state.pointCoords}
              strokeWidth= {4}
              strokeColor = "red"
          />
          {marker}
          </MapView>
            <View style={styles.inputContainer}>
                <View style={styles.pinContainer}>
                  <Icon name="md-pin" size={25} color="red" style={styles.pin}/>
                <Text style={styles.desText}>PICK UP</Text>
                </View>
            <TextInput placeholder="Enter Pickup Location.." 
              style={styles.destinationInput}
              onChangeText={pickUpPoint => this.onChangePickUpPoint(pickUpPoint)}
              value={this.state.pickupPoint} 
              />
                
                <View style={styles.pinContainer}>
                <Icon name="md-pin" size={25} color="red" style={styles.pin}/>
                 <Text style={styles.desText}>DROP OFF</Text>
             </View>
              <TextInput placeholder="Enter Final Destination.." 
              style={[styles.destinationInput, dropOffStyle]}
              onChangeText={destination => this.onChangeDestination(destination)}
              value={this.state.destination} 
              />
          </View>
            
          <View>
            {predictionsOutPickUp}
            {predictionsOutDestination}
          </View>
            <View style={styles.buttonBottom}>
               <ButtonGeneric buttonTitle="CONFIRM TRIP" 
               onPress={()=> this.setState({isTripConfirmed:true})}/>
           </View>
      </View>
      
    );
  }
}
const styles = StyleSheet.create({
  inputContainer:{
    marginTop:20,
    marginHorizontal: 5,
    backgroundColor:"rgba(208, 236, 244, .7)",
    borderRadius: 10,

  },
  destinationInput:{
    height:40,
    borderWidth:1,
    borderRadius: 20,
    borderColor:"#5AB2B9",
    marginTop: 2,
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 20,
    backgroundColor: "#D0ECF4",
  },
  container:{
    ...StyleSheet.absoluteFillObject
  },
  mapStyle:{
    ...StyleSheet.absoluteFillObject
  },
  suggestion:{
    backgroundColor: "rgba(90, 178, 185, .9)",
    color:"rgba(255,255,255, .8)",
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor:"#D0ECF4",
    marginLeft: 5,
    marginRight:5,
    paddingLeft:20,
    paddingTop:5,
    paddingBottom:5,
    paddingRight:20,

  },
  desText:{
    color:"#5AB2B9",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    marginLeft:20,
    marginTop:5,
    marginBottom:5,
  },
  buttonBottom:{
    position:'absolute',
    bottom:20,
    alignSelf:"center",
  },
  pinContainer:{
    flexDirection:'row',
  },
  pin:{
    marginTop: 5,
    marginLeft:10,
  },
});
