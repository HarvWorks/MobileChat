import React, { Component } from 'react';
import { AsyncStorage, Button, TouchableHighlight, View, Text, ListView  } from 'react-native';
import { apiCall } from '../components/apiCall.js'
const { constants, styles } = require('../styles.js')
const { ListUser } = require('../components/listUser.js');

export class IndexScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
        this.checkUsers()
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Recent',
    });

    logout(navigate) {
        AsyncStorage.removeItem('chatToken')
        navigate('Intro')
    }

    async checkUsers(term = 'r=') {
        try {
            const token = await AsyncStorage.getItem('chatToken');
            const allUsers = await apiCall('', 'null', 'search/' + term, 'GET', token)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(allUsers)
            });
        } catch (error) {
            console.log(error);
        }
    }

    _renderItem(user) {
        return (
            <View style={styles.li}>
                <ListUser
                    onChatPress={() => this.props.navigation.navigate('Chat', {user:user})}
                    user={user}
                    />
            </View>
        );
    }

    async _grabChatLog(callback) {
        const key = await AsyncStorage.getAllKeys();
        var keyExists = false
        for (i = 0, j = key.length; i < j; i++) {
            if (key[i] == 'chatLog_' + user.email) {
                keyExists = true
                break
            }
        }
        let messages = []
        if (keyExists) {
            rawMessages = await AsyncStorage.getItem('chatLog_' + user.email);
            messages = JSON.parse(rawMessages)
        }
        return callback(messages)
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    enableEmptySections={true}
                    removeClippedSubviews={false}
                    style={styles.listview}
                />
                <Button
                    title='Log Out'
                    onPress={() => this.logout(this.props.navigation.navigate)}
                    />
            </View>
        );
    }
}
