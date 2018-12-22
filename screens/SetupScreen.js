import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import StickyFooter from './subviews/StickyFooter';
import { AsyncStorage } from "react-native";
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
    navParams = this.props.navigation.state.params;
    constructor(props) {
        super(props);
        this.state =  {
                value: {
                    sessionName: 'Giulio',
                    missionName: 'Canti',
                    role_1: {
                        title: 'Pilot',
                        name: 'Akshaye',
                        abbreviation: 'AP'

                    }
                }
        };
    }

    onChange(value) {
        this.setState({value});
    }
    _onCancelPressButton() {
        this.props.navigation.navigate("Home");
    }
    _onProceedPressButton() {
        let value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            let temp = {
                timeStamp: new Date().getTime(),
                step: 'setup',
                event: 0,
                role: 0
            };
            let value_json = JSON.stringify(value);
            let value_obj = JSON.parse(value_json);
            value_obj["timeStamps"] = [temp];
            value_json = JSON.stringify(value_obj);
            AsyncStorage.setItem(value.missionName + '-' + value.sessionName, value_json, () => {
                AsyncStorage.getItem(value.missionName + '-' + value.sessionName, (err, result) => {
                    console.log(result);
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
            <View style = {{flex: 1}}>
                <ScrollView style = {styles.formContainer}>
                    <Form
                        ref="form"
                        type={Session}
                        options={options}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
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