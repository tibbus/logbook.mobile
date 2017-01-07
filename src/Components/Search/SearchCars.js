import React, { Component } from 'react'
import { StyleSheet, ListView, View, Text, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { SearchHeader, SearchRow } from './'


export class SearchCars extends Component {

    constructor (props) {
        super(props)
    }

    render() {
        const { onSubmit, search } = this.props;

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows(search)
        }
        
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) => <SearchRow {...data} />}
                renderSeperator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                renderHeader={() => <SearchHeader searchFunction = { onSubmit } /> }
            />
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
});