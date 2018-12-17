import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class MissionExecutionScreen extends Component {
    static navigationOptions = {
        title: 'Mission Execution',
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>Fill Mission Execution screen</Text>
            </View>
        );
    }
}