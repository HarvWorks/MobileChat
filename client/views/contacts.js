import React, { Component } from 'react';
import { Button, TouchableHighlight, View, Text } from 'react-native';

export class ContactsScreen extends Component {
    static navigationOptions = {
        title: 'All Contacts',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>This is the Contacts Screen.</Text>
                <Button
                    onPress={() => navigate('Chat')}
                    title="Chat with Janice"
                />
                <Button
                    onPress={() => navigate('Chat')}
                    title="Chat with Harvey"
                />
            </View>
        );
    }
}
