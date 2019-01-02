import React, { Component } from 'react';
import {AsyncStorage, Text, View, ScrollView, StyleSheet, Share, ActivityIndicator} from 'react-native';
import TableCell from "./subviews/TableCell";
import StickyFooter from "./subviews/StickyFooter";

const rowVals = ['distracted', 'slips', 'mistakes', 'confused/hesitant', 'asked questions', 'bugs', 'ergonomics'];

export default class SummaryScreen extends Component {

    navParams = this.props.navigation.state.params;
    jsonStringData = null;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let data = this.navParams.setupData;
        let sortieName = data.sortieName;
        AsyncStorage.getItem(data.missionName + '-' + data.sessionName, (err, result) => {
            this.jsonStringData = result;
            result = JSON.parse(result);
            // console.log(result);
            // console.log(sortieName);
            this.setState(previousState => ({
                    data: result,
                    sortieName: sortieName,
                    initDate: new Date(result.sorties[sortieName].timeStamps[0].timeStamp)
            }))
        });
    }

    static navigationOptions = {
        title: 'Summary',
    };

    _onCancelPressButton() {
        Share.share({
            message: this.jsonStringData,
            title: this.state.data.missionName + '-' + this.state.data.sessionName + ' Result'
        }, {
            // Android only:
            dialogTitle: 'Share Mission Result'
        })
    }
    _onProceedPressButton() {
        this.props.navigation.navigate("Home");
    }

    render() {
        if(this.state && this.state.data)
            return (
                <View style = {{flex: 1}}>
                    <ScrollView style = {{flex: 1}}>
                        <View style={{flex: 1}}>
                            <View style={{padding: 5}}>
                                <Text>Session Name: {this.navParams.setupData.sessionName}</Text>
                                <Text>Mission Name: {this.navParams.setupData.missionName}</Text>
                                <Text>Flight: {this.state.sortieName}</Text>
                                <Text>{this.state.initDate.toTimeString().slice(0,8) + ' ' + this.state.initDate.toDateString()}</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <TableCell id={0} flexVal={4}>Timestamp</TableCell>
                                <TableCell id={1} flexVal={4}>Phase</TableCell>
                                <TableCell id={2} flexVal={4}>Event</TableCell>
                                <TableCell id={3} flexVal={4}>Role</TableCell>
                            </View>
                            {this.state.data.sorties[this.state.sortieName].timeStamps.map((key, index) => {
                                let timeStampObj = this.state.data.sorties[this.state.sortieName].timeStamps[index];
                                let timeStamp = timeStampObj.timeStamp;
                                let time = new Date(timeStamp).toTimeString().slice(0,8);
                                let roleKey = "role_" + (timeStampObj.role+1);
                                if(index !== 0)
                                    return (
                                        <View key={index} style={{flex: 1, flexDirection: 'row', height: 40}}>
                                            <View style={styles.textContainer}>
                                                <Text>
                                                    {time}
                                                </Text>
                                            </View>
                                            <View style={styles.textContainer}>
                                                <Text>
                                                    {timeStampObj.step}
                                                </Text>
                                            </View>
                                            <View style={styles.textContainer}>
                                                <Text>
                                                    {rowVals[timeStampObj.event]}
                                                </Text>
                                            </View>
                                            <View style={styles.textContainer}>
                                                <Text>
                                                    {this.state.data.sorties[this.state.sortieName][roleKey].title}
                                                </Text>
                                            </View>
                                        </View>
                                );
                            })}
                        </View>
                    </ScrollView>
                    <StickyFooter cancelFunc = {this._onCancelPressButton.bind(this)} proceedFunc = {this._onProceedPressButton.bind(this)} backVal={"Share Results"} proceedVal={"End Mission"}/>
                </View>
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
    textContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderBottomColor: '#000000',
        borderBottomWidth: 0.5,
        borderLeftColor: '#000000',
        borderLeftWidth: 0.5
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});