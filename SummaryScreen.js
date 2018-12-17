import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class SummaryScreen extends Component {
    static navigationOptions = {
        title: 'Summary',
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>Fill summary screen</Text>
            </View>
        );
    }
}