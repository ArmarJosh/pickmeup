import React, { Component } from 'react';
import {View, StyleSheet} from "react-native";
import EntryBox from "./EntryBox";
import ButtonGeneric from "../buttonComp/ButtonGeneric";

class PhoneNumber extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            phoneNumber:0,
            validatenNum:true
        }
    }
    //Phone Number Entry Numeric Validation client side
    onValidateNumber(textInput){
        if(isNaN(textInput)){
            console.log('its not a number');
            this.setState({validatenNum:false});
            
        }else{
            console.log("Ok!");
            this.setState({phoneNumber:textInput, validatenNum:true});
        }

    }
    render() { 
        return ( 
            <View>
                <EntryBox style={[styles.null, !this.state.validatenNum? styles.error:styles.allowed]}
                placeholder="0770 000 000"
                keyboardType="phone-pad"
                onChangeText={(textInput)=>this.onValidateNumber(textInput)}
                value={this.state.value}
                />
                <View style={styles.spacing} />
                <ButtonGeneric  buttonTitle="OK"/>
            </View>
         );
    }
}

const styles = StyleSheet.create({
    spacing:{
        marginTop: 20,
    },
    error:{
        borderWidth:3,
        borderColor:"#C1272D",
    },
    allowed:{
        borderWidth:0,
    },
    
});
 
export default PhoneNumber;