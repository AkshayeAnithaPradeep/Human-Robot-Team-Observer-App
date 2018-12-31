import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import StickyFooter from './subviews/StickyFooter';
import { AsyncStorage } from "react-native";
import {getObject} from './../apis/helper';
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
    sortieName: t.String,
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
        },
        sortieName: {
            error: "Sortie Name cannot be empty"
        }
    }
};

export default class SetupScreen extends Component {
    static navigationOptions = {
        title: 'Setup',
    };
    navParams = this.props.navigation.state.params;

    _onCancelPressButton() {
        this.props.navigation.navigate("Home");
    }
    _onProceedPressButton() {
        let value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            let value_obj = getObject(value);
            let value_json = JSON.stringify(value_obj);
            AsyncStorage.mergeItem(value.missionName + '-' + value.sessionName, value_json, () => {
                AsyncStorage.getItem(value.missionName + '-' + value.sessionName, (err, result) => {
                    // console.log(result);
                });
            });
            let gridVals = {
                premission: [],
                mission: [],
                postmission: []
            };
            this.props.navigation.navigate("PreMission", {setupData: value, gridVals: gridVals});
        }
    }
    render() {
        return (
            <KeyboardAvoidingView style = {{flex: 1}} behavior="padding" enabled>
                <ScrollView style = {styles.formContainer}>
                    <Form
                        ref="form"
                        type={Session}
                        options={options}
                        value={(this.navParams && this.navParams.prefillData) ? this.navParams.prefillData : {}}
                    />
                </ScrollView>
                <StickyFooter cancelFunc = {this._onCancelPressButton.bind(this)} proceedFunc = {this._onProceedPressButton.bind(this)}/>
            </KeyboardAvoidingView>
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