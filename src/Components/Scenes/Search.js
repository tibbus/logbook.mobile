import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SearchCars } from '../Search'
import { searchCars } from '../../Actions/search.js'
import {
  ListView,
  Text,
  View,
  StyleSheet
} from 'react-native'

const stateToProps = ({ search }) => ({ search });

@connect(stateToProps)
export class Search extends Component {

    constructor () {
        super(...arguments);
    }

    render() {
        const { dispatch } = this.props;
        const { search } = this.props;
        return (
            <SearchCars onSubmit={searchTerm => dispatch(searchCars({searchTerm}))} search={search} />
        )
    }
}

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
