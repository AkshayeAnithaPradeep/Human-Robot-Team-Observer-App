import React, {Component} from 'react';
import {AsyncStorage, Text, View, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import {getSummaryDetails} from './../../apis/helper';

export default class SummaryTable extends Component {

    jsonStringData = null;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let data = this.props.setupData;
        let sortieName = data.sortieName;
        AsyncStorage.getItem(data.missionName + '-' + data.sessionName, (err, result) => {
            this.props.setJsonStringData(result);
            result = JSON.parse(result);
            let details = getSummaryDetails(result, sortieName);
            this.setState(previousState => ({
                data: details,
                initDate: new Date(result.sorties[sortieName].timeStamps[0].timeStamp)
            }))
        });
    }

    render() {
        if (this.state && this.state.data)
            return (
                <ScrollView style={{flex: 1}}>
                    <View style={{padding: 15}}>
                        <Text style={styles.keyText}>Session Name: <Text style={{fontWeight: 'normal'}}>{this.state.data.sessionName}</Text></Text>
                        <Text style={styles.keyText}>Session Description: <Text style={{fontWeight: 'normal'}}>{this.state.data.sessionDescription}</Text></Text>
                        <Text style={styles.keyText}>Mission Name: <Text style={{fontWeight: 'normal'}}>{this.state.data.missionName}</Text></Text>
                        <Text style={styles.keyText}>Mission Description: <Text style={{fontWeight: 'normal'}}>{this.state.data.missionDescription}</Text></Text>
                        <Text style={styles.keyText}>Flight: <Text style={{fontWeight: 'normal'}}>{this.state.data.sortieName}</Text></Text>
                        <Text style={styles.keyText}>Location: <Text style={{fontWeight: 'normal'}}>{this.state.data.location}</Text></Text>
                        <Text style={styles.keyText}>Started on {this.state.initDate.toTimeString().slice(0, 8) + ' ' + this.state.initDate.toDateString()}</Text>
                        {this.state.data.roles.map((key, index) => {
                            return (
                                <View>
                                    <Text style={{fontWeight: 'bold', fontSize: 17}}>Role {index + 1}</Text>
                                    <Text style={styles.keyText}>Title: <Text style={{fontWeight: 'normal'}}>{this.state.data.roles[index].title} </Text></Text>
                                    <Text style={styles.keyText}>Name: <Text style={{fontWeight: 'normal'}}>{this.state.data.roles[index].name} </Text></Text>
                                    <Text style={styles.keyText}>Abbreviation: <Text style={{fontWeight: 'normal'}}>{this.state.data.roles[index].abbreviation} </Text></Text>
                                </View>
                            )
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
        borderBottomColor: '#000000',
        borderBottomWidth: 0.5,
        borderLeftColor: '#000000',
        borderLeftWidth: 0.5
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    keyText: {
        fontWeight: 'bold',
        padding: 7
    }
});