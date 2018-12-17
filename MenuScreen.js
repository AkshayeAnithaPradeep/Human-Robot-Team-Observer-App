import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default class MenuScreen extends Component {
    static navigationOptions = {
        title: 'Menu',
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <Button
                title="Start Mission"
                onPress={() => navigate('Setup')}
            />
        );
    }
}