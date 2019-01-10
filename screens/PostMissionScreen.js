import React, { Component } from 'react';
import {AsyncStorage, ScrollView, StyleSheet, Text, View} from 'react-native';
import StickyFooter from "./subviews/StickyFooter";
import Grid from "./subviews/Grid";
import TableCell from "./subviews/TableCell";
import {Icon} from "react-native-elements";

export default class PostMissionScreen extends Component {

    navParams = this.props.navigation.state.params;
    last_pressed = [];

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
        let gridVals = [];
        for(let i=0; i<8; i++) {
            let temp = [];
            for(let j=0;j<count;j++){
                temp.push(0);
            }
            gridVals.push(temp)
        }
        let existGridVals = this.navParams.gridVals.postmission;
        if(existGridVals.length)
            gridVals = existGridVals.slice();
        this.navParams.gridVals.postmission = gridVals;
        this.state = {
            data: data,
            colCount : 1 + count,
            rowCount : 8,
            gridVals : gridVals
        };
        this._onGridCellPress = this._onGridCellPress.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({ _onUndoPressButton: this._onUndoPressButton.bind(this) });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Post Mission',
            headerStyle: {
                backgroundColor: '#1e90ff',
            },
            headerTintColor: '#fff',
            headerRight: (
                <View style={{paddingRight: 5}}>
                    <Icon
                        raised
                        name='undo'
                        type='material-community'
                        size={20}
                        color='black'
                        underlayColor='blue'
                        onPress={navigation.getParam('_onUndoPressButton')}
                    />
                </View>
            )
        }
    };

    _onGridCellPress(i,j) {
        let gridVals = this.state.gridVals;
        gridVals[i][j] += 1;
        this.last_pressed.push({
            x: i,
            y: j
        });
        let data = this.state.data;
        let sortieName = data.sortieName;
        AsyncStorage.getItem(data.missionName + '-' + data.sessionName, (err, result) => {
            result = JSON.parse(result);
            if(result && result.sorties[sortieName].timeStamps) {
                let newTimeStamps = result.sorties[sortieName].timeStamps.slice();
                let temp = {
                    timeStamp: new Date().getTime(),
                    step: 'postmission',
                    event: i,
                    role: j
                };
                newTimeStamps.push(temp);
                result.sorties[sortieName].timeStamps = newTimeStamps;
                AsyncStorage.mergeItem(data.missionName + '-' + data.sessionName, JSON.stringify(result), () => {
                    this.setState(prevState => ({
                        gridVals: [...prevState.gridVals, gridVals]
                    }));
                });
            }
        });
    }

    _onCancelPressButton() {
        this.props.navigation.navigate("MissionExecution");
    }
    _onProceedPressButton() {
        this.props.navigation.navigate("Summary", {setupData: this.navParams.setupData, flow: 'new'});
    }

    _onUndoPressButton() {
        let lastPressed = this.last_pressed.pop();
        if(lastPressed) {
            let gridVals = this.state.gridVals;
            gridVals[lastPressed.x][lastPressed.y] -= 1;
            let data = this.state.data;
            let sortieName = data.sortieName;
            AsyncStorage.getItem(data.missionName + '-' + data.sessionName, (err, result) => {
                result = JSON.parse(result);
                if (result && result.sorties[sortieName].timeStamps) {
                    let newTimeStamps = result.sorties[sortieName].timeStamps.slice();
                    newTimeStamps.pop();
                    result.sorties[sortieName].timeStamps = newTimeStamps;
                    AsyncStorage.mergeItem(data.missionName + '-' + data.sessionName, JSON.stringify(result), () => {
                        this.setState(prevState => ({
                            gridVals: [...prevState.gridVals, gridVals]
                        }));
                    });
                }
            });
        }
    }

    render() {
        return (
            <View style = {{flex: 1}}>
                <ScrollView style = {styles.formContainer}>
                    <View style={{flex: 1}}>
                        <View>
                            <View style = {{flex: 1, flexDirection: 'row', height: 50}}>
                                <TableCell id={0} flexVal={ this.state.colCount }>TITLE</TableCell>
                                {Object.keys(this.state.data).map((key, index) => {
                                    {if(key.startsWith('role') && this.state.data[key] != null){
                                        return <TableCell key = {index} id={ index + 1 } flexVal={ this.state.colCount }>{this.state.data[key]["name"]}</TableCell>
                                    }}
                                })}
                            </View>
                        </View>
                        <View>
                            <Grid colCount={this.state.colCount} gridVals={this.state.gridVals} gridCellPress= {this._onGridCellPress}/>
                        </View>
                    </View>
                </ScrollView>
                <StickyFooter cancelFunc = {this._onCancelPressButton.bind(this)} proceedFunc = {this._onProceedPressButton.bind(this)}/>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    formContainer: {
        flex: .8
    }
});
