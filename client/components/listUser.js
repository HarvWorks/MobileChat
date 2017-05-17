import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
const { constants, styles } = require('../styles.js')

export class ListUser extends Component {
    render() {
        return (
            <View style={styles.liTitle}>
                <TouchableHighlight
                    style={styles.liTextBox}
                    underlayColor={constants.openActionColor}
                    onPress={() => this.props.onChatPress()}
                    >
                    <Text style={styles.liText}>{this.props.user.email}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
