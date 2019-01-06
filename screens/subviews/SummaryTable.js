import React, {Component} from 'react';
import {AsyncStorage, Text, View, ScrollView, StyleSheet, Share, ActivityIndicator} from 'react-native';
import TableCell from "./TableCell";
import StickyFooter from "./StickyFooter";

const rowVals = ['distracted', 'slips', 'mistakes', 'confused/hesitant', 'asked questions', 'bugs', 'ergonomics'];

export default class SummaryTable extends Component {

    jsonStringData = null;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let data = this.props.setupData;
        let sortieName = data.sortieName;
        AsyncStorage.getItem(data.missionName + '-' + data.sessionName, (err, result) => {
            this.jsonStringData = result;
            result = JSON.parse(result);
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

    render() {
        if (this.state && this.state.data)
            return (
                <ScrollView style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <TableCell id={0} flexVal={4}>Timestamp</TableCell>
                            <TableCell id={1} flexVal={4}>Phase</TableCell>
                            <TableCell id={2} flexVal={4}>Event</TableCell>
                            <TableCell id={3} flexVal={4}>Role</TableCell>
                        </View>
                        {this.state.data.sorties[this.state.sortieName].timeStamps.map((key, index) => {
                            let timeStampObj = this.state.data.sorties[this.state.sortieName].timeStamps[index];
                            let timeStamp = timeStampObj.timeStamp;
                            let time = new Date(timeStamp).toTimeString().slice(0, 8);
                            let roleKey = "role_" + (timeStampObj.role + 1);
                            if (index !== 0)
                                return (
                                    <View key={index} style={{flex: 1, flexDirection: 'row', height: 40}}>
                                        <View style={[styles.textContainer, {borderRightColor: '#CED0CE', borderRightWidth: 1}]}>
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
            );
        else
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            )
    }
}

let styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderBottomColor: '#CED0CE',
        borderBottomWidth: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});