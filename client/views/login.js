import React, { Component } from 'react';
import { TouchableHighlight, View, Text, TextInput } from 'react-native';
import { apiCall } from '../components/apiCall.js'
const { constants, styles } = require('../styles.js')

export class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
        };
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.loginContainer}>
                <View style={styles.statusBar} />
                <Text style={styles.loginTitle}>Login</Text>
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
                <TouchableHighlight
                    onPress={() => apiCall(navigate, this.state, 'user/login', 'POST', 'token', 'Main')}
                    style={styles.loginButton}
                    underlayColor={constants.loginButtonColor}
                    >
                    <Text style={styles.loginBigButton}>Login</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => navigate('Register')}
                    style={styles.loginButton}
                    underlayColor={constants.loginButtonColor}
                    >
                    <Text style={styles.loginSmallButton}>Not Registered? Please Signup Here.</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
