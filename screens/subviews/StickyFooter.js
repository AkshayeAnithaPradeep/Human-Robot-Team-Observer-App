import React, { Component } from 'react';
import {Button, StyleSheet, View} from 'react-native';

export default class StickyFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backTitle: this.props.backVal ? this.props.backVal : "Back",
            proceedTitle: this.props.proceedVal ? this.props.proceedVal : "Proceed"
        }
    }
    render() {
        return (
            <View style={styles.stickyFooter}>
                <View style={styles.buttonContainer}>
                    <Button title={this.state.backTitle} onPress={this.props.cancelFunc}/>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title={this.state.proceedTitle} onPress={this.props.proceedFunc}/>
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