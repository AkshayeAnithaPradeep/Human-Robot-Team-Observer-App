import React, { Component } from 'react';
import {Text, View} from "react-native";

export default class TableCell extends Component {
    render() {
        return (
            <View key={this.props.id} style={{flex: 1/this.props.flexVal, borderStyle: 'solid', borderColor: '#000000', borderRadius: 1, borderWidth: 0.5}}>
                <Text style={{fontSize: 24-2*this.props.flexVal, textAlign: 'center'}}>{this.props.children}</Text>
            </View>
        );
    }
}

const colors = ['powderblue', 'skyblue', 'steelblue'];