import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default class MenuScreen extends Component {
    static navigationOptions = {
        title: 'Menu',
    };
    render() {
        let gridVals = {
            premission: [],
            mission: [],
            postmission: []
        };
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 10}}>
                <View style={{padding: 5}}>
                    <Button
                        title="Start Session"
                        onPress={() => navigate('Setup')}
                    />
                </View>
                <View style={{padding: 5}}>
                    <Button
                        title="Resume Session"
                        onPress={() => navigate('Setup', {gridVals: gridVals})}
                    />
                </View>
                <View style={{padding: 5}}>
                    <Button
                        title="Library of Sessions"
                        onPress={() => navigate('Library')}
                    />
                </View>
            </View>
        );
    }
}