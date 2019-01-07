import React, { Component } from 'react';
import {View, StyleSheet, Dimensions, Share} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import SummaryTable from './subviews/SummaryTable';
import SummaryDetails from './subviews/SummaryDetails';
import StickyFooter from "./subviews/StickyFooter";
import SummaryStatistics from "./subviews/SummaryStatistics";

export default class SummaryScreen extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Details' },
            { key: 'second', title: 'Timestamps' },
            { key: 'third', title: 'Statistics'}
        ],
    };

    static navigationOptions = {
        title: 'Summary',
        headerStyle: {
            backgroundColor: '#1e90ff',
        },
        headerTintColor: '#fff'
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
        let navParams = this.props.navigation.state.params;
        return (
            <View style = {{flex: 1}}>
                <TabView
                    navigationState={this.state}
                    renderScene = {({ route }) => {
                            switch (route.key) {
                            case 'first':
                                return <SummaryDetails setupData = {navParams.setupData} navigation = {this.props.navigation}/>;
                            case 'second':
                                return <SummaryTable setupData = {navParams.setupData} navigation = {this.props.navigation}/>;
                            case 'third':
                                return <SummaryStatistics setupData = {navParams.setupData} navigation = {this.props.navigation}/>;
                            default:
                            return null;
                        }
                    }}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />
                <StickyFooter cancelFunc = {this._onCancelPressButton.bind(this)} proceedFunc = {this._onProceedPressButton.bind(this)} backVal={"Share Results"} proceedVal={"End Mission"}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});