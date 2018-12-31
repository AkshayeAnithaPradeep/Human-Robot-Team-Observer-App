import React, { Component } from 'react';
import {Text, View, ActivityIndicator, ScrollView, StyleSheet, AsyncStorage, FlatList} from 'react-native';
import { ListItem, List } from 'react-native-elements';

export default class SortiesScreen extends Component {
    static navigationOptions = {
        title: 'Library',
    };

    navParams = this.props.navigation.state.params;

    constructor(props) {
        super(props);
        let data = this.props.navigation.state.params.missionData;
        let sortiesData = [];
        for (let property in data.sorties) {
            // console.log(property);
            let temp = {};
            temp["sortieName"] = property;
            temp["missionName"] = data.missionName;
            temp["sessionName"] = data.sessionName;
            temp['startDate'] = new Date(data.sorties[property].timeStamps[0].timeStamp).toDateString();
            sortiesData.push(temp);
        }
        this.state = {
            data: sortiesData
        };
        this._onRowClick = this._onRowClick.bind(this);
    }


    _onRowClick(mission) {
        this.props.navigation.navigate("Summary", {setupData: mission});
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE"
                }}
            />
        );
    };

    render() {
        if(this.state && this.state.data) {
            return (
                <ScrollView>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item}) => (
                            <ListItem
                                title={item.sortieName}
                                subtitle={item.startDate}
                                onPress={() => this._onRowClick(item)}
                                rightIcon={{name: 'chevron-right'}}
                            />
                        )}
                        keyExtractor={item => item["missionName"] + item["sessionName"] + item["sortieName"]}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                </ScrollView>
            );
        }
        else
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});