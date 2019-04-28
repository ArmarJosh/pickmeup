import React from 'react';
import {View, Text, Component, Image, TouchableOpacity, StyleSheet} from "react-native";

export default class ButtonComp extends React.Component{
    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress} style={styles.mainButton} activeOpacity={.8}>
                <View style={styles.button}>
                    <View style={styles.innerCircle}>
                        <Image source={this.props.iconPath}/>
                    </View>
                    <Text style={styles.titleText}>{this.props.buttonTitle}</Text>
                </View>


            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        height:100,
        width:370,
        backgroundColor:"#197BE1",
        borderRadius: 50,
        flexDirection:"row",
        alignItems:"center",
    },
    innerCircle:{
        backgroundColor:"#D0ECF4",
        height:70,
        width:70,
        borderRadius:35,
        alignItems:"center",
        justifyContent:"center",
        marginLeft:20,
        marginRight:10,
    },
    titleText:{
        fontSize: 30,
        color:"rgba(255, 255, 255, .8)",
        marginRight:30,

    },
    mainButton:{
        marginBottom:30,
        shadowColor:"#151722",
        shadowOffset: {width:5, height:5},
    },
});
