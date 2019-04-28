import React, { Component } from 'react';
import {View, StyleSheet, Alert} from "react-native";
import EntryBox from "./EntryBox";
import ButtonGeneric from "../buttonComp/ButtonGeneric";

import axios from "axios";
import baseUrl from "../../../scr/baseUrl";
axios.defaults.baseURL = baseUrl;


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            emailAddress:"",
            validEmail:true,
            password:""
         }
         this.onEmailValidation = this.onEmailValidation.bind(this);
         this.handleSignIn = this.handleSignIn.bind(this);
    }

    // Email Adddress validation client Side
    onEmailValidation(inputText){
        let reg  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(inputText )){
            console.log("Valid Email");
            this.setState({emailAddress:inputText, validEmail:true});
        }else{
            console.log("check Email");
            this.setState({validEmail:false});
        }
    }

    async handleSignIn(){
        console.log("SignInPresssed");
         const {emailAddress, password} = this.state;
         axios.post('http://192.168.43.211:3000/api/users/login', {
            email: emailAddress,
            password: password
          })
          .then(function (response) {
            console.log(response);
            Alert.alert("you did it.", response.data.firstName );
          })
          .catch(function (error) {
            console.log(error);
        });
    }

    render() { 
        return ( 
                <View>
                   <EntryBox  style={[styles.null, !this.state.validEmail? styles.error:styles.allowed]}
                   value={this.state.value}
                   onChangeText={(inputText) => this.onEmailValidation(inputText)}
                   placeholder="Email"
                   keyboardType="email-address"
                   />
                   <View style={styles.spacing} />
                   <EntryBox  placeholder="Password"
                   onChangeText={(inputText) => this.setState({password:inputText})}
                   value = {this.state.password}
                   secureTextEntry={true}
                   />
                   <View style={styles.spacing} />
                   <ButtonGeneric buttonTitle="Sign In"
                    onPress={this.handleSignIn}
                   />
                </View>
         );
    }
}

const styles = StyleSheet.create({
    spacing:{
        marginBottom: 20,
    },
    error:{
        borderWidth:3,
        borderColor:"#C1272D",
    },
    allowed:{
        borderWidth:0,
    }
});
export default LoginForm;