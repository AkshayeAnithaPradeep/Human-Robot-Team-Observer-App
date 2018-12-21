import React, { Component } from 'react';
import {Text, StyleSheet, View, TouchableHighlight} from 'react-native';
import TableCell from "./TableCell";

const rowVals = ['distracted', 'slips', 'mistakes', 'confused/hesitant', 'asked questions', 'bugs', 'ergonomics'];

export default class Grid extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                {rowVals.map((key, index) => {
                    return (
                        <View key = {index} style={{flex:1, flexDirection: 'row', height: 30 + 10*this.props.colCount}}>
                            <TableCell id={0} flexVal={ this.props.colCount }>{rowVals[index]}</TableCell>
                            {Array.from(Array(this.props.colCount-1),(key2, index2) => {
                                return (
                                    <View key={index2} style={{flex: 1/this.props.colCount, borderStyle: 'solid', borderColor: '#000000', borderRadius: 1, borderWidth: 0.5}}>
                                        <TouchableHighlight style={{height: 30 + 10*this.props.colCount, justifyContent: 'center', alignItems: 'center' }}
                                            onPress={() => this.props.gridCellPress(index, index2)}>
                                            <Text style={{fontSize: 20}}>
                                                {this.props.gridVals[index][index2]}
                                            </Text>
                                        </TouchableHighlight>
                                    </View>
                                );
                            })}
                        </View>
                    );
                })}
            </View>
        );
    }
}