import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity  } from "react-native";
import ButtonGeneric from "../components/buttonComp/ButtonGeneric";
import Icon  from "react-native-vector-icons/Ionicons";

class DriverTripDetails  extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            MeetingTime:"",
            counter: 0
         }
    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
    }

    incrementCounter(){
        this.setState({
            counter: this.state.counter + 1
        });
    }
    decrementCounter(){
        if (this.state.counter <= 0){
            return
        }
        else{
            this.setState({counter: this.state.counter - 1});
        }
    }
    render() { 
        return ( 
          <ScrollView style={styles.containerScrolStyle}>
            <View style={styles.container}>
                <View style={[styles.tripInfo, {marginTop:40}]}>
                    <View style={styles.iconStyles}>
                    <Icon name="md-pin" color="red" size={25}/>             
                    <Text style={styles.tripInfoText}>PICKUP POINT:</Text>
                    </View>
                    <Text style={styles.tripInfortxt}>Rail Way Stage</Text>
                  
                </View>

                <View style={styles.hairline}/>

                <View style={styles.tripInfo}>
                    <View style={styles.iconStyles}>
                    <Icon name="md-pin" color="red" size={25}/>  
                    <Text style={styles.tripInfoText}>FINAL DESTINATION:</Text>
                    </View>
                    <Text style={styles.tripInfortxt}>Entebbe Kitoro</Text>
                    
                </View>
                                    
                <View style={styles.hairline}/>

                <View style={styles.entryView}>
                    <TextInput placeholder="Pickup Time: "
                        style={styles.textBox}
                    />
                </View>
                <View style={styles.entryView}>
                    <TextInput placeholder="Fee: "
                        style={styles.textBox}
                    />
                </View>
                <View style={styles.entryView}>
                    <TextInput placeholder="Route: "
                        style={styles.textBox}
                    />
                </View>
                <View style={styles.entryView}>
                    <TextInput placeholder="Number Plate: "
                        style={styles.textBox}
                    />
                </View>
                <View style={styles.seats}>
                    <Text style={styles.seatsText}>
                        Total Seats: 
                    </Text>
                    <Text style={styles.seatsTextNumber}>
                        {this.state.counter} 
                    </Text>
                   <TouchableOpacity onPress={this.decrementCounter} activeOpacity={.8}>
                     <Icon name="md-remove-circle" size={40} color="#197BE1"/>
                   </TouchableOpacity>
                    
                    <View style={styles.nativeButtonStyle} />
                    <TouchableOpacity onPress={this.incrementCounter} activeOpacity={.8}>
                    <Icon name="md-add-circle" size={40} color="#197BE1" />
                    </TouchableOpacity>
                </View>

                <View style={styles.entryView}>
                    <TextInput placeholder="Additional information "
                        style={styles.textBox}
                    />
                </View>

                <View styles={styles.postButton}>
                    <ButtonGeneric buttonTitle="Post" />
                </View>
            </View>
            </ScrollView>
        );
    }
}
 
const styles = StyleSheet.create({
    containerScrolStyle:{
        //flex:1,
       // padding:30,
       backgroundColor: "#D0ECF4"
    },
    container:{
        flex: 1,
        alignItems:"center",
        //justifyContent: "center",
        backgroundColor: "#D0ECF4",
        //...StyleSheet.absoluteFillObject

    },
    tripInfo:{
        //marginTop: 20,
        //flexDirection:'row',
        alignSelf:'flex-start',
        marginLeft: 40,
       // marginBottom: 20,    
    },
    tripInfoText:{
        fontSize: 20,
        color: "#808080",
        marginRight: 10,
        marginLeft: 10,
        fontWeight: "bold",
        fontStyle: "italic",
    },
    tripInfortxt:{
        fontSize:20,
        color: "#197BE1",
    },
    entryView:{
        marginBottom: 20,
    },
    textBox:{
        height: 50,
        width: 350,
        backgroundColor: "#92D7E7",
        borderRadius: 25,
        paddingLeft: 20,
        color: "#808080",
        fontSize: 20,
        alignItems:"center",

    },
    hairline: {
        backgroundColor: '#92D7E7',
        height: 2,
        width: 350,
        marginTop: 10,
        marginBottom: 10,
      },

    postButton:{
        height: 100,
        paddingTop: 100,
        position:"absolute",
        bottom:20,
        paddingBottom: 50,
    },
    seats:{
        alignSelf: "flex-start",
        marginLeft: 40,
        marginBottom: 10,
        flexDirection: "row",
        alignItems:"center",
    },

    seatsText:{
        fontSize: 20,
        color: "#808080",
        marginRight: 20,
    },
    seatsTextNumber:{
        fontSize: 35,
        fontWeight: "bold",
        color: "#197BE1",
        marginRight: 50,
    },
    nativeButtonStyle:{
        marginRight: 40,
    },
    iconStyles:{
        flexDirection:"row",
    },

});
export default DriverTripDetails ;
