import React, { Component } from 'react';
import {ScrollView, StyleSheet, View, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import StickyFooter from './subviews/StickyFooter';
import { AsyncStorage } from "react-native";
import {getObject, getPrefillValue, setupGridVals} from './../apis/helper';
var t = require('tcomb-form-native');

var Form = t.form.Form;
// here we define our domain model

let Role = t.struct({
   title: t.String,
   name: t.String,
   abbreviation: t.String
});

let Location = t.struct({
    latitude: t.String,
    longitude: t.String
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
    role_5: t.maybe(Role),
    location: Location
});


const options = {
    fields: {
        sessionName: {
            error: "Session Name cannot be empty",
            autoFocus: true,
            selectTextOnFocus: true
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
        },
        location: {
            label: " ",
            fields: {
                latitude: {
                    hidden: true
                },
                longitude: {
                    hidden: true
                }
            }
        }
    }
};

export default class SetupScreen extends Component {
    static navigationOptions = {
        title: 'Setup',
        headerStyle: {
            backgroundColor: '#1e90ff',
        },
        headerTintColor: '#fff'
    };
    navParams = this.props.navigation.state.params;


    componentDidMount() {
        if(this.navParams && this.navParams.setupData) {
            let setupData = this.navParams.setupData;
            AsyncStorage.getItem(setupData.missionName + '-' + setupData.sessionName, (err, result) => {
                result = JSON.parse(result);
                let formVal = getPrefillValue(result, setupData.sortieName, this.navParams.newFlight);
                if(this.navParams.newFlight) {
                    navigator.geolocation.getCurrentPosition(
                        position => {
                            const latitude = JSON.stringify(position.coords.latitude);
                            const longitude = JSON.stringify(position.coords.longitude);
                            formVal["location"] = {
                                latitude: latitude,
                                longitude: longitude
                            };
                            this.setState({
                                formVal: formVal
                            })
                        },
                        err => {
                            formVal["location"] = {
                                latitude: 'not available',
                                longitude: 'not available'
                            };
                            this.setState({
                                formVal: formVal
                            })
                        },
                        {enableHighAccuracy: true, timeout: 6000, maximumAge: 1000}
                    );
                }
                else
                    setupGridVals(result.sorties, setupData.sortieName).then(function (gridVals) {
                        this.setState({
                            formVal: formVal,
                            gridVals: gridVals,
                            timeStamps: result.sorties[setupData.sortieName].timeStamps
                        })
                    }.bind(this));
            });
        }
        else
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = JSON.stringify(position.coords.latitude);
                    const longitude = JSON.stringify(position.coords.longitude);
                    let formVal = {
                        sessionName: new Date().toLocaleDateString(),
                        location: {
                            latitude: latitude,
                            longitude: longitude
                        }
                    };
                    this.setState({
                        formVal: formVal
                    })
                },
                err => {
                    let formVal = {
                        sessionName: new Date().toLocaleDateString(),
                        location: {
                            latitude: 'not available',
                            longitude: 'not available'
                        }
                    };
                    this.setState({
                        formVal: formVal
                    })
                },
                {enableHighAccuracy: true, timeout: 6000, maximumAge: 1000}
            );
    }

    _onCancelPressButton() {
        this.props.navigation.navigate("Home");
    }
    _onProceedPressButton() {
        let value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            let value_obj = getObject(value, this.state && this.state.timeStamps? this.state.timeStamps : null);
            let value_json = JSON.stringify(value_obj);
            AsyncStorage.mergeItem(value.missionName + '-' + value.sessionName, value_json, () => {
                AsyncStorage.getItem(value.missionName + '-' + value.sessionName, (err, result) => {
                });
            });
            if(this.state.gridVals)
                this.props.navigation.navigate("PreMission", {setupData: value, gridVals: this.state.gridVals});
            else {
                let gridVals = {
                    premission: [],
                    mission: [],
                    postmission: []
                };
                this.props.navigation.navigate("PreMission", {setupData: value, gridVals: gridVals});
            }
        }
    }
    render() {
        if(this.state && this.state.formVal)
            return (
                <KeyboardAvoidingView style = {{flex: 1}} behavior="padding" enabled>
                    <ScrollView style = {styles.formContainer}>
                        <Form
                            ref="form"
                            type={Session}
                            options={options}
                            value={this.state.formVal}
                        />
                    </ScrollView>
                    <StickyFooter cancelFunc = {this._onCancelPressButton.bind(this)} proceedFunc = {this._onProceedPressButton.bind(this)}/>
                </KeyboardAvoidingView>
            );
        else
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
    }
}

let styles = StyleSheet.create({
    formContainer: {
        flex: .8, paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 25
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});