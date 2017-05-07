import React, { Component } from 'react';
import { connect } from '../../Utils/connect';
import { ListView, Text, View, StyleSheet } from 'react-native';

import { SearchCars } from './SearchCars';
import { searchCars } from '../../Actions/search';
import { getCarById } from '../../Actions/cars';

const stateToProps = ({ search }) => ({ search });

@connect(stateToProps)
export class Search extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { dispatch } = this.props;
        const { search } = this.props;
        const { navigator } = this.props;
        return (
            <SearchCars
                onSubmit={searchTerm => dispatch(searchCars({ searchTerm }))}
                search={search}
                navigator={navigator} />
        );
    }
}

const styles = StyleSheet.create({
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
});
