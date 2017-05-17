import React, { Component } from 'react';
import { TouchableHighlight, View, Text, TextInput } from 'react-native';
import { apiCall } from '../components/apiCall.js'
const { constants, styles } = require('../styles.js')

export class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            password_confirm:'',
        };
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.loginContainer}>
                <View style={styles.statusBar} />
                <Text style={styles.loginTitle}>Register</Text>
                <TextInput
                    autoFocus={true}
                    autoCorrect={false}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    style={styles.loginInput}
                    onChangeText={(text) => {this.setState({email: text})} }
                    placeholder={"Email"}
                    />
                <TextInput
                    autoCorrect={false}
                    autoCapitalize='none'
                    style={styles.loginInput}
                    onChangeText={(text) => {this.setState({password: text})} }
                    placeholder={"Password"}
                    />
                <TextInput
                    autoCorrect={false}
                    autoCapitalize='none'
                    style={styles.loginInput}
                    onChangeText={(text) => {this.setState({password_confirm: text})} }
                    placeholder={"Confirm Password"}
                    />
                <TouchableHighlight
                    onPress={() => apiCall(navigate, this.state, 'user', 'POST', 'token', 'Main')}
                    style={styles.loginButton}
                    underlayColor={constants.loginButtonColor}
                    >
                    <Text style={styles.loginBigButton}>Register</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => navigate('Login')}
                    style={styles.loginButton}
                    underlayColor={constants.loginButtonColor}
                    >
                    <Text style={styles.loginSmallButton}>Registered Already? Please Sign In Here.</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
