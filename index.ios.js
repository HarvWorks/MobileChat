import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { AppRegistry, Button } from 'react-native';

const { SplashScreen } = require('./client/views/splash.js');
const { IntroScreen } = require('./client/views/intro.js');
const { LoginScreen } = require('./client/views/login.js');
const { RegisterScreen } = require('./client/views/register.js');
const { IndexScreen } = require('./client/views/index.js');
const { ContactsScreen } = require('./client/views/contacts.js')
const { ChatScreen } = require('./client/views/chat.js');

const MainScreen = TabNavigator({
  Recent: { screen: IndexScreen },
  All: { screen: ContactsScreen },
});

const MainApp = StackNavigator({
    Index: { screen: MainScreen },
    Chat: { screen: ChatScreen },
});

const MobileChat = StackNavigator({
    Splash:  { screen: SplashScreen },
    Intro: { screen: IntroScreen },
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen },
    Main: { screen: MainApp}
}, {
    headerMode: 'screen',
    navigationOptions: {
        header: null
    }
});

MainScreen.navigationOptions = {
    title: 'My Chats',
};

AppRegistry.registerComponent('MobileChat', () => MobileChat);
