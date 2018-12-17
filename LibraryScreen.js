import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class LibraryScreen extends Component {
    static navigationOptions = {
        title: 'Library',
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>Fill library screen</Text>
            </View>
        );
    }
}