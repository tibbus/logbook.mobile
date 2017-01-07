import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SearchForm } from '../Search'
import { searchCars } from '../../Actions/search.js'

const stateToProps = ({ search }) => ({ search });

@connect(stateToProps)
export class Search extends Component {

    constructor () {
        super(...arguments);
    }
    render() {
        const { dispatch } = this.props;
        return (
            <SearchForm onSubmit={searchTerm => dispatch(searchCars({searchTerm}))}/>
        )
    }
}