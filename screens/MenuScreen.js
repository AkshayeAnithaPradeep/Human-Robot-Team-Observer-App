import React, { Component } from 'react';
import { Button, StyleSheet, View, TouchableHighlight, Text, AsyncStorage} from 'react-native';

export default class MenuScreen extends Component {
    static navigationOptions = {
        title: 'Menu',
        headerStyle: {
            backgroundColor: '#1e90ff',
        },
        headerTintColor: '#fff'
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 10}}>
                <View style={{padding: 5}}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => navigate('Setup')}
                    >
                        <Text style={styles.buttonText}> Start Session </Text>
                    </TouchableHighlight>
                </View>
                <View style={{padding: 5}}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => navigate('Library', {flow: 'resume'})}
                    >
                        <Text style={styles.buttonText}> Resume Session </Text>
                    </TouchableHighlight>
                </View>
                <View style={{padding: 5}}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => navigate('Library', {flow: 'library'})}
                    >
                        <Text style={styles.buttonText}> Library of Sessions </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

let styles=StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#1e90ff',
        padding: 10,
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontWeight: '500'
    }
});