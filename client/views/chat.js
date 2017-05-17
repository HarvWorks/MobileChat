import io from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import React, { Component } from 'react';
import { Button, TouchableHighlight, View, Text } from 'react-native';
const { constants, styles } = require('../styles.js')

export class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        this.onSend = this.onSend.bind(this);
        this.socket = io('http://localhost:8000');
    };
    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    image: 'https://facebook.github.io/react/img/logo_og.png',
                    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                },
            ],
        });
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.user.email
    });

    onSend(messages = []) {
        console.log(messages);
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
    };

    socket.on('message', (message) => {
        var oldMessages = 'moo'
    });

    render() {
        return (
            <View style={styles.chatContainner} >
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend}
                    user={{
                        _id: 1,
                    }}
                />
            </View>
        );
    }
}
