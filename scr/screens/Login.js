import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView} from "react-native";
import LoginForm from "../components/Login/LoginForm";
import PhoneNumber from "../components/Login/PhoneNumber";

class Login extends Component {
   
    render() { 
        return ( 
        
            <View style={styles.container}>
                <View style={styles.topTextContainer}>
                    <Text style={styles.topText}> Don't have an account</Text>
                    <TouchableOpacity>
                        <Text style={styles.signUpText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.phoneNumberContainer}>
                    <Text style={styles.loginText}>Signin with phone number:</Text>
                   <PhoneNumber/>
                </View>
                <KeyboardAvoidingView behavior="padding" enabled style={styles.KeyBoardContainer}>
                    <View style={styles.emailForm}>
                        <Text style={styles.loginText}>Sign in with email:</Text>
                        <LoginForm />
                    </View>
                </KeyboardAvoidingView>   

            </View>
         );
    }
}
 
const styles = StyleSheet.create({
    KeyBoardContainer:{
        flex:1,
        width: "100%",
        backgroundColor:"#4D4D4D",
    },
    container:{
        flex:1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor:"#4D4D4D",
        //padding:30,
        paddingRight:30,
        paddingLeft:30,
    },
    loginText:{
        color: "#999999",
        fontSize: 20,
        marginBottom: 10,

    },
    topTextContainer:{
        marginTop: 30,
        alignItems:"center",
        marginBottom: 50,
    },
    topText:{
        fontSize: 30,
        color:"#999999"
    },
    signUpText:{
        fontSize:30,
        color:"#5AB2B9",
        fontWeight: "bold",
    },
    phoneNumberContainer:{
        marginBottom: 50,
        width:"100%",
        marginRight: 10,
        marginLeft:10,
    },
    emailForm:{
        width: "100%",
        position:"absolute",
        bottom: 20,
    },
});
export default Login;