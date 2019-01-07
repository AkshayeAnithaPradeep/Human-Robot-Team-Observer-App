import React, { Component } from 'react';
import {Text, View, StyleSheet} from "react-native";

export default class TableCell extends Component {
    render() {
        return (
            <View key={this.props.id} style={[styles.container, {flex: 1/this.props.flexVal, backgroundColor: colors[(this.props.id+1)%2]}]}>
                <Text style={{fontSize: 26-2*this.props.flexVal, textAlign: 'center'}}>{this.props.children}</Text>
            </View>
        );
    }
}

const colors= ['#d3d3d3', '#fff'];

let styles = StyleSheet.create({
    container: {
        borderStyle: 'solid',
        borderColor: '#CED0CE',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
