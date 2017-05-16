import { NavigationActions } from 'react-navigation';
import React, { Component } from 'react';
import { AsyncStorage, Button, TouchableHighlight, View, Text } from 'react-native';
import { apiCall } from '../components/apiCall.js'
const { constants, styles } = require('../styles.js')

export class SplashScreen extends Component {
    componentDidMount () {
        this._checkToken()
    }

    async _checkToken() {
        try {
            const token = await AsyncStorage.getItem('myChatToken');
            if (token !== null){
                console.log(token);
                return apiCall(this.props.navigation.navigate, this.state, 'users/login', token, 'Main', 'Intro')
            }
        } catch (error) {
            return this._navigateTo('Intro')
        }
    }

    _navigateTo(routeName) {
        const actionToDispatch = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName })]
        })
        this.props.navigation.dispatch(actionToDispatch)
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.splashContainer}>
                <Text>This is the Splash Screen.</Text>
            </View>
        );
    }
}
