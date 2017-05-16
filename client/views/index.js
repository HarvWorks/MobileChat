import io from 'socket.io-client';
import React, { Component } from 'react';
import { Button, TouchableHighlight, View, Text } from 'react-native';

export class IndexScreen extends Component {
    constructor(props) {
        super(props);
        this.socket = io('http://localhost:8000');
    }

    logout(navigate) {
        navigate('Intro')
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>This is the Index Screen.</Text>
                <Button
                    onPress={() => navigate('Chat')}
                    title="Chat with Janice"
                    />
                <Button
                    title='Log Out'
                    onPress={() => this.logout(this.props.navigation.navigate)}
                    />
            </View>
        );
    }
}
