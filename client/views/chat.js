import io from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import React, { Component } from 'react';
import { AsyncStorage, Button, TouchableHighlight, View, Text } from 'react-native';
const { constants, styles } = require('../styles.js')

export class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        this.onReceivedMessage = this.onReceivedMessage.bind(this);
        this.onSend = this.onSend.bind(this);
        this._storeMessages = this._storeMessages.bind(this);
        this.socket = io('http://localhost:8000');
        this.socket.on('chat message', this.onReceivedMessage);
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

    async _checkToken() {
        return await AsyncStorage.getItem('chatToken');
    }

    _storeMessages(messages) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
    }

    onReceivedMessage(messages) {
      this._storeMessages(messages);
    }

    onSend(messages = []) {
        console.log(messages);
        this.socket.emit('chat message', messages[0])
        this._storeMessages(messages)
    };

    render() {
        return (
            <View style={styles.chatContainner} >
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend}
                    user={this._checkToken()}
                />
            </View>
        );
    }
}
