import { GiftedChat } from 'react-native-gifted-chat';
import React, { Component } from 'react';
import { Button, TouchableHighlight, View, Text } from 'react-native';

export class ChatScreen extends Component {
    static navigationOptions = {
        title: 'Chat with Janice',
    };
    render() {
        return (
            <View>
                <Text>This is the Chat Screen.</Text>
            </View>
        );
    }
}
