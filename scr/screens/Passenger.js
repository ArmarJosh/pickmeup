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
import Icon from "react-native-vector-icons/Ionicons"

import PolyLine from "@mapbox/polyline";
import apiKey from "../googleApiKey";

export default class Passenger extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: "",
      latitude: 0.347596,
      longitude: 32.582520,
      destination: "",
      predictions:[],
      pointCoords:[]
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
    this.getRouteDirection();
  }

  // Function to get polyline on route Direction
async getRouteDirection(placeId, destinationName){
  // Declaire API Key Globally
  const apiKey = "AIzaSyAkG848wgOUnk5w3YiRCBjlplh3Nj-fjaE";
  try{
    const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.latitude},${this.state.longitude}&destination=place_id:${placeId}&key=${apiKey}`);
    const json = await response.json();

    const points = PolyLine.decode(json.routes[0].overview_polyline.points);
    const pointCoords = points.map(point => {
      return {latitude:point[0], longitude:point[1]}
    });
    this.setState({pointCoords, 
      predictions:[], 
      destination: destinationName
    });
    Keyboard.dismiss();
    this.map.fitToCoordinates(pointCoords, {edgePadding:{ top: 20, bottom: 20, right:20, left:20}});
  }catch (err){
    console.log(err);
  }
}
  
  // Function to call destination with AutoComplete
 async onChangeDestination(destination){
     // Declaire API Key Globally
      console.log(destination)
      const apiKey = "AIzaSyAkG848wgOUnk5w3YiRCBjlplh3Nj-fjaE";
      this.setState({
        destination:destination
      });
      const apiURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${destination}&location=${this.state.latitude},${this.state.longitude}&radius=2000`;
          return fetch (apiURL).then((result)=> result.json())
      .then((resultJson) =>{
        console.log(resultJson);
        this.setState({
          predictions: resultJson.predictions
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {

    let marker = null;
    if (this.state.pointCoords.length > 1){
      marker=(
        <Marker coordinate={this.state.pointCoords[this.state.pointCoords.length -1]}/>
      );
    }
    const predictionsOut = this.state.predictions.map(prediction=>( 
        <TouchableOpacity key={prediction.id} 
        onPress={() => this.getRouteDirection(prediction.place_id, prediction.structured_formatting.main_text)}>
            <View>
              <Text style={styles.suggestion}>
              {prediction.structured_formatting.main_text}
              </Text>
           </View>
      </TouchableOpacity>
    ));
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
              strokeWidth= {3}
              strokeColor = "red"
          />
          {marker}
          </MapView>
            <View style={styles.inputContainer}>
           <View style={styles.iconContainer}>
             <Icon name="md-pin" size={25} color="red" style={styles.pin}/>
           <Text style={styles.desText}>WHERE TO?</Text>
           </View>
           <TextInput placeholder="Enter Destination.." 
            style={styles.destinationInput}
            value={this.state.destination} 
            onChangeText={destination => this.onChangeDestination(destination)}/>
            </View>
          <View>
            {predictionsOut}
          </View>
         
      </View>
      
    );
  }
}
const styles = StyleSheet.create({
  destinationInput:{
    height:40,
    borderWidth:1,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 20,
    backgroundColor: "#D0ECF4",
    borderColor:"#92D7E7",

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
  inputContainer:{
    marginTop:20,
    marginHorizontal: 5,
    backgroundColor: "rgba(208, 236, 244, .7)",
    borderRadius: 10,
  },
  iconContainer:{
    flexDirection:"row",
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
  pin:{
    marginTop:5,
    marginLeft: 5,
  },
});
