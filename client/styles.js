const {StyleSheet} = require('react-native');

export const constants = {
    loginButtonColor: '#ffffff',
    addActionColor: '#4db8ff',
    openActionColor: '#ffffff',
    delActionColor: '#4db8ff',
    editActionColor: '#4db8ff',
    editTitleColor: '#4db8ff',
    datePickerStyles: {
        dateIcon: {
            height: 30,
            width: 30,
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
        },
        dateInput: {
            borderColor: '#6f8f9f',
            borderWidth: 0.5,
            height: 35,
            marginLeft: 34,
            backgroundColor: '#ffffff'
        },
        },
};

export const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: '#ffffff',
        height: 22,
    },

    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    introContainer: {
        flex: 1,
        backgroundColor: '#eeeeee',
    },
    introTitleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    introTitle: {
        color: '#333333',
        fontSize: 30,
        fontWeight: '600',
    },
    introButtons: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
    },
    introButtonContainer: {
        flex: 0.5,
    },
    introButton: {

    },

    loginContainer: {
        flex: 1,
        backgroundColor: '#eeeeee',
        alignItems: 'center',
    },
    loginTitle: {
        color: '#333333',
        fontSize: 20,
        fontWeight: '600',
    },
    loginInput: {
        backgroundColor: '#ffffff',
        borderColor: '#6f8f9f',
        borderWidth: 0.5,
        paddingLeft: 7,
        paddingRight: 5,
        marginLeft: 20,
        marginRight: 20,
        height: 35,
        fontSize: 16,
    },
    loginButton: {

    },
    loginBigButton: {
        fontSize: 20,
        color: '#0c42fd',
    },
    loginSmallButton: {
        fontSize: 10,
        color: '#0c42fd',
    },


    container: {
        backgroundColor: '#f2f2f2',
        flex: 1,
    },
    listview: {
        flex: 1,
    },
    li: {
        backgroundColor: '#ffffff',
        borderBottomColor: '#eeeeee',
        borderColor: 'transparent',
        borderWidth: 1,
    },
    liTitle: {
        flexDirection: 'row',
    },
    liContainer: {
        flex: 2,
    },
    liText: {
        color: '#333333',
        fontSize: 16,
    },
    liTextBox: {
        flex: 0.88,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
    },
    liEdit: {
        flex: 0.13,
        paddingLeft: 15,
        paddingTop: 15,
        paddingBottom: 16,
    },
    liDel: {
        flex: 0.11,
        paddingLeft: 12,
        paddingTop: 8,
        paddingBottom: 8,
        borderLeftWidth: 2,
        borderLeftColor: '#eeeeee',
        marginTop: 7,
        marginBottom: 7,
    },
    expandedTextBox: {
        paddingTop: 5,
        paddingBottom: 5,
    },
    expandedText: {
        paddingLeft: 16,
        paddingBottom: 10,
    },
    editText: {
        color: '#0099ff',
        fontSize: 14,
    },
    delText: {
        color: '#ff0000',
        fontSize: 14,
    },
    navbar: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderBottomColor: '#eeeeee',
        borderColor: 'transparent',
        borderWidth: 1,
        justifyContent: 'center',
        height: 44,
        flexDirection: 'row',
        paddingTop: 2,
        paddingBottom: 5,
    },
    navbarTitle: {
        color: '#444444',
        fontSize: 16,
        fontWeight: "500"
    },
    center: {
        textAlign: 'center',
    },
    actionText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    },
    action: {
        backgroundColor: constants.addActionColor,
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalInnerContainer: {
        borderRadius: 15,
        backgroundColor: '#f9f9f9',
    },
    textInput: {
        backgroundColor: '#ffffff',
        borderColor: '#6f8f9f',
        borderWidth: 0.5,
        paddingLeft: 7,
        paddingRight: 5,
        marginLeft: 20,
        marginRight: 20,
    },
    popupTitle: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: "600",
    },
    popupDesc: {
        fontSize: 14,
        fontWeight: "400",
        paddingTop: 16,
        paddingBottom: 8,
        marginLeft: 20,
    },
    datePickerContainer: {
        alignItems:'flex-end',
        padding: 10,
        paddingRight: 20,
        marginRight: 20,
        marginTop: 2,
    },
    popupButtons: {
        marginTop: 5,
        borderTopColor: '#dbdbdf',
        borderTopWidth: 0.5,
        flexDirection: 'row',
    },
    popupButton: {
        paddingTop: 10,
        flex: 0.5,
        alignItems: 'center',
        paddingBottom: 10,
    },
    popupButtonText: {
        fontSize: 17,
        color: '#007aff',
    },
    centerStuff: {
        alignItems: 'center',
    }
});
