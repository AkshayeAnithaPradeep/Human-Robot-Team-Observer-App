import React, { Component } from 'react';
import {Text, View, ActivityIndicator, ScrollView, StyleSheet, AsyncStorage, FlatList} from 'react-native';
import { ListItem, List } from 'react-native-elements';

export default class LibraryScreen extends Component {
    static navigationOptions = {
        title: 'Library',
    };

    constructor(props) {
        super(props);
        this._onRowClick = this._onRowClick.bind(this);
    }

    componentDidMount() {
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                this.setState(previousState => ({
                    missionKeys: keys,
                    data: stores
                }))
            });
        });
    }

    _onRowClick(mission) {
        this.props.navigation.navigate("Sorties", {missionData: mission});
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
                                    title={JSON.parse(item[1]).missionName}
                                    subtitle={JSON.parse(item[1]).sessionName}
                                    onPress={() => this._onRowClick(JSON.parse(item[1]))}
                                    rightIcon={{name: 'chevron-right'}}
                                />
                            )}
                            keyExtractor={item => item[0]}
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