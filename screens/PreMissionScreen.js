import React, { Component } from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import StickyFooter from "./subviews/StickyFooter";

export default class PreMissionScreen extends Component {
    constructor(props) {
        super(props);
        let count = 0;
        let data = this.props.navigation.state.params.setupData;
        for(let x in data) {
            if (!data.hasOwnProperty(x)) continue;
            if(x.startsWith('role') && data[x] != null){
                count++;
            }
        }
        this.state = {
            data: data,
            rowCount : 1 + count,
            columnCount : 8
        };
    }
    static navigationOptions = {
        title: 'Pre Mission',
    };

    _onCancelPressButton() {
        this.props.navigation.navigate("Setup");
    }
    _onProceedPressButton() {
        this.props.navigation.navigate("MissionExecution");
    }
    render() {
        return (
            <View style = {{flex: 1}}>
                <ScrollView style = {styles.formContainer}>
                </ScrollView>
                <StickyFooter cancelFunc = {this._onCancelPressButton.bind(this)} proceedFunc = {this._onProceedPressButton.bind(this)}/>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    formContainer: {
        flex: .8, paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20
    }
});