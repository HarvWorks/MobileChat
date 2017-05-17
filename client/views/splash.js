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
            const key = await AsyncStorage.getAllKeys();
            var keyExists = false
            for (i = 0, j = key.length; i < j; i++) {
                if (key[i] == 'chatToken') {
                    keyExists = true
                    break
                }
            }
            if (keyExists) {
                try {
                    const token = await AsyncStorage.getItem('chatToken');
                    console.log(token);
                    if (token !== null){
                        return apiCall(this.props.navigation.navigate, {'token': token}, 'user/token', 'POST', token, 'Main', 'Intro')
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            return this._navigateTo('Intro')
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
                    <Button
                        title='Next'
                        onPress={() => navigate('Intro')}
                        />
            </View>
        );
    }
}
