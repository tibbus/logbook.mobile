import React, { Component } from 'react'
import { StyleSheet, ListView, View, Text, TextInput, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { SearchHeader, SearchRow } from './'
//import styles
import background from '../../Themes/background';


export class SearchCars extends Component {

    constructor (props) {
        super(props)
    }

    render() {
        const { onSubmit, search, onViewCarProfile } = this.props;

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows(search)
        }

        return (
          <View style={styles.containerEmpty}>
          {/* <Text style={styles.subheading}>CARS</Text> */}
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) => <SearchRow {...data} navigator = {this.props.navigator}/>}
                renderSeperator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                renderHeader={() => <SearchHeader searchFunction = { onSubmit }/> }
                enableEmptySections={true}
            />
          </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: background.color,
    },
    containerEmpty: {
      flex: 1,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    // subheading: {
    //   fontSize: 20,
    //   fontWeight: '900',
    // }
});
