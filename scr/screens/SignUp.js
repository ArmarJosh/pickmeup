import React, { Component } from 'react';
import {View, Text, ScrollView, StyleSheet} from "react-native";
import EntryBox from "../components/Login/EntryBox";
import ButtonGeneric from "../components/buttonComp/ButtonGeneric";

import axios from "axios";
import baseUrl from "../baseUrl";
axios.defaults.baseURL = baseUrl;

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            givenName:"",
            validGivenName:true,
            sirName:"",
            validSirName:true,

            phoneNumber:0,
            validPhone:true,

            emailAddress:"",
            validEmail: true,

            passwordOne:"",
            validPasswordOne: true,
            passwordTwo:"",
            validPasswordTwo: true,

            allValidate:false,

            errorMessage:"",
        }
        this.onValidateNames = this.onValidateNames.bind(this);
        this.onValidatePhoneNumber = this.onValidatePhoneNumber.bind(this);
        this.onValidateEmail = this.onValidateEmail.bind(this);
        this.onPasswordValidation = this.onPasswordValidation.bind(this);
        this.onAllformValidation = this.onAllformValidation.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.printErrorMassage = this.printErrorMassage.bind(this);
    }

    // Given Name and Sir Name validation client side.
    onValidateNames(text, type, isbool){
        let reg =  /^[A-Za-z]+$/;
        if(reg.test(text)){
            if(type == "givenName" || type == "sirName"){
                this.setState({
                    [type]:text,
                    [isbool]:true,
                });
            }

        }else {
            if(type == "givenName"){
                this.setState({validGivenName:false});
            }else{
                this.setState({validSirName:false});
            }
        }
    }

    // Phone number Validation client side.
    onValidatePhoneNumber(inputText){
        if(isNaN(inputText)){
            this.setState({validPhone:false});
        }else{
            this.setState({phoneNumber:parseInt(inputText), validPhone:true})
        }
    }

    // Email validation client side
    onValidateEmail(inputText){
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(reg.test(inputText)){
            this.setState({emailAddress:inputText, validEmail:true});
        }else{
            this.setState({validEmail:false});
        }
    }

    // Compare if passwords match
    onPasswordValidation(){
        console.log("Password Validation Called");
        if(this.state.passwordOne.trim() === "" || this.state.passwordTwo.trim()===""){
            console.log("Password Required");
            this.setState({validPasswordOne:false, validPasswordTwo:false})
            return false;
        }else{
            if(this.state.passwordOne == this.state.passwordTwo){
                console.log("password One is " + this.state.passwordOne + " passwordTwo is " + this.state.passwordTwo );
                this.setState({validPasswordOne:true, validPasswordTwo:true, allValidate:true});
                return;
            }else{
                console.log("passwords Dont match ");
                this.setState({validPasswordOne:false, validPasswordTwo:false, allValidate:false});
                return false;
            }
        }
    }

   
    // Make Sure that all the forms are not null
    onAllformValidation(){
        this.onPasswordValidation();

        if(!this.state.givenName){
            this.setState({validGivenName:false})
            return;
        }
        if (!this.state.sirName){
            this.setState({validSirName:false})
            return;
        }
        if (!this.state.phoneNumber){
            this.setState({validPhone:false})
            return;
        }
        if (!this.state.emailAddress){
            this.setState({validEmail:false})
         return;
        }
        if(!this.state.allValidate){
            return;
        }
        if(this.state.allValidate === true){
            console.log("YA! Login!");
            this.handleCreateUser();
        }

    }

   async handleCreateUser(){
        const {givenName, sirName, phoneNumber, emailAddress, passwordOne} = this.state;
        await axios.post('http://192.168.43.211:3000/api/users', {
            firstName: givenName,
            lastName: sirName,
            phoneNumber: phoneNumber,
            email:emailAddress,
            password:passwordOne
          })
          .then(function (response) {
            console.log(response);
            this.printErrorMassage(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    printErrorMassage(error){
        this.setState({errorMessage:error});
    }


    render() { 
        const extraButtonStyles = {marginBottom:50}
        return ( 
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.signUpWord}> Sign Up</Text>
                    <View style={styles.divider}/>
                    <View style={styles.entryElements}>
                        <Text style={styles.titleText}>Enter given name:</Text>
                        <EntryBox placeholder="Enter Given name:" 
                        style={[styles.null, !this.state.validGivenName? styles.error:styles.allowed]} 
                        onChangeText={(inputText) => this.onValidateNames(inputText, "givenName", "validGivenName" )}
                        value={this.state.inputText}
                        />

                            <View style={styles.spacing} />
                        
                        <Text style={styles.titleText}>Enter sir name:</Text>
                        <EntryBox placeholder="Enter Sir name" 
                        style={[styles.null, !this.state.validSirName? styles.error:styles.allowed]}
                        onChangeText={(inputText) => this.onValidateNames(inputText, "sirName", "validSirName")}
                        value={this.state.inputText}
                        />

                             <View style={styles.spacing} />

                        <Text style={styles.titleText}>Enter phone number:</Text>
                        <EntryBox placeholder="0770 000 000" keyboardType="phone-pad"
                        style={[styles.null, !this.state.validPhone? styles.error:styles.allowed]}
                        onChangeText={(inputText) => this.onValidatePhoneNumber(inputText)}
                        value={this.state.inputText}
                        />

                            <View style={styles.spacing} />

                        <Text style={styles.titleText}>Enter e-mail address:</Text>
                        <EntryBox placeholder="email@gmail.com"  keyboardType="email-address"
                        style={[styles.null, !this.state.validEmail? styles.error:styles.allowed]}
                        onChangeText={(inputText)=> this.onValidateEmail(inputText)}
                        value={this.state.inputText}
                        />

                            <View style={styles.spacing} />

                        <Text style={styles.titleText}>Enter password:</Text>
                        <EntryBox placeholder="Password"  secureTextEntry={true}
                        style={[styles.null, !this.state.validPasswordOne? styles.error:styles.allowed]}
                        onChangeText={(inputText) => this.setState({passwordOne:inputText})}
                        value={this.state.passwordOne}
                        />

                            <View style={styles.spacing} />

                        <Text style={styles.titleText}>Re-enter password</Text>
                        <EntryBox placeholder="Re-password" secureTextEntry={true}
                        style={[styles.null, !this.state.validPasswordTwo? styles.error:styles.allowed]}
                        onChangeText={(inputText) => this.setState({passwordTwo:inputText})}
                        value={this.state.passwordTwo}
                        />

                        <View style={[styles.spacing, extraButtonStyles]} />
                       { /*<Text style={styles.errorText}>{this.state.errorMessage}</Text>*/}

                        <ButtonGeneric buttonTitle="Sign Up"
                        onPress={this.onAllformValidation}
                        />
                    </View>
                </View>
            </ScrollView>
         );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:"#4D4D4D",
        alignItems: "center",
        padding:30,
    },
    entryElements:{
        width: "100%",
        marginTop: 20,
    },
    signUpWord:{
        fontSize: 30,
        color: "#5AB2B9",
        fontWeight: "bold",
    },
    titleText:{
        fontSize: 20,
        color: "#999999",
        marginBottom: 10,
        marginLeft: 20,
    },
    spacing:{
        marginBottom:10,
    },
    divider:{
        marginTop:10,
        height:1,
        width:"100%",
        backgroundColor:"#999999",
    },
    error:{
        borderWidth:3,
        borderColor:"#C1272D",
    },
    allowed:{
        borderWidth:0,
    },
    errorText:{
        color:"red",
        marginBottom:5,
    },
});
export default SignUp;