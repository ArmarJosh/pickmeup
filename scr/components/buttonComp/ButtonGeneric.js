import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";

export default class ButtonGeneric extends React.Component{
    render(){
        const shadowStyle={
            shadowOpacity: 1,
            shadowRadius:10,
            shadowColor:"#000000",
            shadowOffset: {width:1, height:2}
        }
        return(
            <TouchableOpacity onPress={this.props.onPress} 
                    style={styles.mainButton} activeOpacity={.8}>
                   <View style={[styles.button, shadowStyle]}>
                    <Text style={styles.titleText}>{this.props.buttonTitle}</Text>
                   </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        height:50,
        width:"100%",
        backgroundColor:"#197BE1",
        borderRadius: 25,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        
    },
    titleText:{
        fontSize: 25,
        color:"rgba(255, 255, 255, .8)",
        fontWeight: "bold",
    },
    mainButton:{
      
    },

});
