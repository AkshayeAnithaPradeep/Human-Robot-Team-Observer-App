import React, { Component } from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import StickyFooter from "./subviews/StickyFooter";
import Grid from "./subviews/Grid";
import TableCell from "./subviews/TableCell";

export default class PreMissionScreen extends Component {

    navParams = this.props.navigation.state.params;

    constructor(props) {
        super(props);
        let count = 0;
        let data = this.navParams.setupData;
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
        let existGridVals = this.navParams.gridVals.premission;
        if(existGridVals.length)
            gridVals = existGridVals.slice();
        this.navParams.gridVals.premission = gridVals;
        this.state = {
            data: data,
            colCount : 1 + count,
            rowCount : 8,
            gridVals : gridVals
        };
        this._onGridCellPress = this._onGridCellPress.bind(this);
    }
    static navigationOptions = {
        title: 'Pre Mission',
    };

    _onGridCellPress(i,j) {
        let gridVals = this.state.gridVals;
        gridVals[i][j] += 1;
        this.setState(prevState => ({
            gridVals: [...prevState.gridVals, gridVals]
        }))
    }

    _onCancelPressButton() {
        this.props.navigation.navigate("Setup");
    }
    _onProceedPressButton() {
        this.props.navigation.navigate("MissionExecution", {setupData: this.navParams.setupData, gridVals: this.navParams.gridVals});
    }
    render() {
        return (
            <View style = {{flex: 1}}>
                <ScrollView style = {styles.formContainer}>
                    <View style={{flex: 1}}>
                        <View>
                            <View style = {{flex: 1, flexDirection: 'row'}}>
                                <TableCell id={0} flexVal={ this.state.colCount }>TITLE</TableCell>
                                {Object.keys(this.state.data).map((key, index) => {
                                    {if(key.startsWith('role') && this.state.data[key] != null){
                                        return <TableCell key = {index} id={ index } flexVal={ this.state.colCount }>{this.state.data[key]["title"]}</TableCell>
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