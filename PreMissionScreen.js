import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class PreMissionScreen extends Component {
    static navigationOptions = {
        title: 'Pre Mission',
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>Fill Pre Mission screen</Text>
            </View>
        );
    }
}