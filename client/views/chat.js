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
        this._checkStore()
        this.state = {
            token: '',
            userData: '',
            messages: []
        }
    };

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.user.email
    });

    async _checkStore() {
        const token = await AsyncStorage.getItem('chatToken');
        const userData = await AsyncStorage.getItem('userData');
        this.setState({token:token});
        this.setState({userData:JSON.parse(userData)});
    }

    _storeMessages(messages) {
        AsyncStorage.setItem('chatLog_' + this.props.navigation.state.params.user.email, JSON.stringify(this.state.messages));
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
        this.socket.emit('chat message', messages[0])
        this._storeMessages(messages)
    };

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={{_id: this.state.userData.id}}
            />
        );
    }
}
