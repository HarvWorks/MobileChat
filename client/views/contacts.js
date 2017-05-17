import React, { Component } from 'react';
import { AsyncStorage, Button, TouchableHighlight, View, Text, ListView } from 'react-native';
import { apiCall } from '../components/apiCall.js'
const { constants, styles } = require('../styles.js')
const { ListUser } = require('../components/listUser.js');

export class ContactsScreen extends Component {
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
        title: 'All Contacts',
    });

    async checkUsers(term = 'u=') {
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
            </View>
        );
    }
}
