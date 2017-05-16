import React, { Component } from 'react';
import { Button, TouchableHighlight, View, Text } from 'react-native';
const { constants, styles } = require('../styles.js')

export class IntroScreen extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.introContainer}>
                <View style={styles.introTitleContainer}>
                    <Text style={styles.introTitle}>MyChat 3.0</Text>
                </View>
                <View style={styles.introButtons}>
                    <View style={styles.introButtonContainer}>
                        <Button
                            style={styles.introButton}
                            onPress={() => navigate('Login')}
                            title='Login'
                        />
                    </View>
                    <View style={styles.introButtonContainer}>
                        <Button
                            style={styles.introButton}
                            onPress={() => navigate('Register')}
                            title='Register'
                        />
                    </View>
                </View>
            </View>
        );
    }
}
