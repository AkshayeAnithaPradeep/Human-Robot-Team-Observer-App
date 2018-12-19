import React, { Component } from 'react';
import { Alert, ScrollView, StyleSheet, View, Button } from 'react-native';
import StickyFooter from './subviews/StickyFooter';

var t = require('tcomb-form-native');

var Form = t.form.Form;
// here we define our domain model

let Role = t.struct({
   title: t.String,
   name: t.String,
   abbreviation: t.String
});

let Session = t.struct({
    sessionName: t.String,       // a required string
    sessionDescription: t.maybe(t.String),
    missionName: t.String,
    missionDescription: t.maybe(t.String),
    role_1: Role,
    role_2: t.maybe(Role),
    role_3: t.maybe(Role),
    role_4: t.maybe(Role),
    role_5: t.maybe(Role)
});


const options = {
    fields: {
        sessionName: {
            error: "Session Name cannot be empty"
        },
        missionName: {
            error: "Mission Name cannot be empty"
        },
        sessionDescription: {
            multiline: true,
            numberOfLines: 3
        },
        role_1:{
            fields: {
                title: {
                    error: "At least one role should be added"
                }
            }
        }
    }
};

export default class SetupScreen extends Component {
    static navigationOptions = {
        title: 'Setup',
    };
    _onCancelPressButton() {
        this.props.navigation.navigate("Home");
    }
    _onProceedPressButton() {
        let value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            console.log(value); // value here is an instance of Person
            this.props.navigation.navigate("PreMission", {setupData: value});
        }
    }
    render() {
        return (
            <View style = {{flex: 1}}>
                <ScrollView style = {styles.formContainer}>
                    <Form
                        ref="form"
                        type={Session}
                        options={options}
                    />
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