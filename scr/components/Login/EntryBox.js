import React, { Component } from 'react';
import {TextInput, View,StyleSheet} from "react-native";
class EntryBox extends Component {
    state = {  }
    render() { 
        return ( 
            <View style={[styles.container, this.props.style]}>
                <TextInput style={styles.inputStyle}
                placeholder={this.props.placeholder}
                onChangeText={this.props.onChangeText}
                value={this.props.value}
                secureTextEntry={this.props.secureTextEntry}
                keyboardType={this.props.keyboardType}
                placeholderTextColor="#92D7E7"
                />
            </View>
         );
    }
}

const styles = StyleSheet.create({
    container:{
        height: 50,
        width:"100%",
        borderRadius: 25,
        backgroundColor: "#4EC3C7",
    },
    inputStyle:{
        color: "#4D4D4D",
        marginLeft:20,
        fontWeight: "bold",
        fontSize: 20,
    },
});
export default EntryBox;