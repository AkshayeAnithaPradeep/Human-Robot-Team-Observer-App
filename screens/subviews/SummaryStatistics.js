import React, {Component} from 'react';
import {AsyncStorage, Text, View, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import {getDataByRole, getSummaryDetails, getDataByPhase} from "../../apis/helper";
import TableCell from "./TableCell";
import RoleGraph from './RoleGraph';
import PhaseGraph from './PhaseGraph';

const rowVals = ['distracted', 'slips', 'mistakes', 'confused', 'asked questions', 'bugs', 'ergonomics'];
const phases = ['premission', 'mission', 'postmission'];

export default class SummaryStatistics extends Component {

    jsonStringData = null;

    constructor(props) {
        super(props);
        this._onRoleLinkPress = this._onRoleLinkPress.bind(this);
        this._onPhaseLinkPress = this._onPhaseLinkPress.bind(this);
    }

    _onRoleLinkPress() {
        this.setState(previousState => ({
            roleGraph: !previousState.roleGraph
        }));
    }

    _onPhaseLinkPress() {
        this.setState(previousState => ({
            phaseGraph: !previousState.phaseGraph
        }));
    }

    componentDidMount() {
        let data = this.props.setupData;
        let sortieName = data.sortieName;
        AsyncStorage.getItem(data.missionName + '-' + data.sessionName, (err, result) => {
            this.jsonStringData = result;
            result = JSON.parse(result);
            let details = getSummaryDetails(result, sortieName);
            let dataByRole = getDataByRole(result, sortieName);
            let dataByPhase = getDataByPhase(result, sortieName);
            this.setState(previousState => ({
                sortieName: sortieName,
                data: details,
                dataByRole: dataByRole,
                dataByPhase: dataByPhase,
                colCount: details.roles.length + 2,
                colPhaseCount: 5,
                roleGraph: false,
                phaseGraph: false,
                initDate: new Date(result.sorties[sortieName].timeStamps[0].timeStamp)
            }))
        });
    }

    render() {
        let roleVal;
        let phaseVal;
        if (this.state) {
            if (this.state.roleGraph) {
                roleVal = <RoleGraph data={this.state.dataByRole} roleData={this.state.data.roles}/>
            } else {
                    let totalCount = new Array(this.state.colCount - 1).fill(0);
                roleVal = <View style={{flex: 1, padding: 5}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TableCell id={0} flexVal={this.state.colCount}>Event</TableCell>
                        {this.state.data.roles.map((key, index) => {
                            return (
                                <TableCell id={0}
                                           flexVal={this.state.colCount}>{this.state.data.roles[index].title}</TableCell>
                            );
                        })}
                        <TableCell id={0} flexVal={this.state.colCount}>Total</TableCell>
                    </View>
                    {rowVals.map((key, index) => {
                        let sum = 0;
                        return (
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <TableCell id={0} flexVal={this.state.colCount}>{rowVals[index]}</TableCell>
                                {this.state.data.roles.map((key1, index1) => {
                                    let varName = "role_" + (index1 + 1);
                                    sum += this.state.dataByRole[varName][index];
                                    totalCount[index1] += this.state.dataByRole[varName][index];
                                    return (
                                        <TableCell id={index1}
                                                   flexVal={this.state.colCount}>{this.state.dataByRole[varName][index]}</TableCell>
                                    );
                                })}
                                <TableCell id={0} flexVal={this.state.colCount}>{sum}</TableCell>
                            </View>
                        )
                    })}
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TableCell id={0} flexVal={this.state.colCount}>Total</TableCell>
                        {this.state.data.roles.map((key, index) => {
                            return (
                                <TableCell id={0}
                                           flexVal={this.state.colCount}>{totalCount[index]}</TableCell>
                            );
                        })}
                        <TableCell id={0} flexVal={this.state.colCount}>{totalCount.reduce((a, b) => a + b, 0)}</TableCell>
                    </View>
                </View>
            }
            if (this.state.phaseGraph) {
                phaseVal = <PhaseGraph data={this.state.dataByPhase}/>
            } else {
                let totalCount = new Array(3).fill(0);
                phaseVal = <View style={{flex: 1, padding: 5}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TableCell id={0} flexVal={this.state.colPhaseCount}>Step</TableCell>
                        {phases.map((key, index) => {
                            return (
                                <TableCell id={0} flexVal={this.state.colPhaseCount}>{phases[index]}</TableCell>
                            );
                        })}
                        <TableCell id={0} flexVal={this.state.colPhaseCount}>Total</TableCell>
                    </View>
                    {rowVals.map((key, index) => {
                        let sum = 0;
                        return (
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <TableCell id={0} flexVal={this.state.colPhaseCount}>{rowVals[index]}</TableCell>
                                {phases.map((key1, index1) => {
                                    sum += this.state.dataByPhase[phases[index1]][index];
                                    totalCount[index1] += this.state.dataByPhase[phases[index1]][index];
                                    return (
                                        <TableCell id={index1}
                                                   flexVal={this.state.colPhaseCount}>{this.state.dataByPhase[phases[index1]][index]}</TableCell>
                                    );
                                })}
                                <TableCell id={0} flexVal={this.state.colPhaseCount}>{sum}</TableCell>
                            </View>
                        )
                    })}
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TableCell id={0} flexVal={this.state.colPhaseCount}>Total</TableCell>
                        {phases.map((key, index) => {
                            return (
                                <TableCell id={0}
                                           flexVal={this.state.colPhaseCount}>{totalCount[index]}</TableCell>
                            );
                        })}
                        <TableCell id={0} flexVal={this.state.colPhaseCount}>{totalCount.reduce((a, b) => a + b, 0)}</TableCell>
                    </View>
                </View>
            }
        }

        if (this.state && this.state.data)
            return (
                <ScrollView style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={styles.keyText}>By Role</Text>
                        <Text style={styles.linkText} onPress={this._onRoleLinkPress}>
                            {this.state.roleGraph ? "View Data" : "View Graph"}
                        </Text>
                    </View>
                    {roleVal}
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={styles.keyText}>By Phase</Text>
                        <Text style={styles.linkText} onPress={this._onPhaseLinkPress}>
                            {this.state.phaseGraph ? "View Data" : "View Graph"}
                        </Text>
                    </View>
                    {phaseVal}
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
        padding: 10,
        flex: 1,
        fontSize: 15
    },
    linkText: {
        flex: 1,
        color: '#1e90ff',
        textAlign: 'right',
        padding: 10
    }
});