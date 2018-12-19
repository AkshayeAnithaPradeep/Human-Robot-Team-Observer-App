import React, { Component } from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default class StickyFooter extends Component {
    render() {
        return (
            <View style={styles.stickyFooter}>
                <View style={styles.buttonContainer}>
                    <Button title="Back" onPress={this.props.cancelFunc}/>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Proceed" onPress={this.props.proceedFunc}/>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    buttonContainer: {
        flex:1,
        padding: 5,
        margin: 20
    },
    stickyFooter: {
        flex: .15,
        flexDirection: 'row',
        shadowColor: '#888888',
        shadowOffset: { width: 10, height: 5 },
        shadowRadius: 18
    }
});