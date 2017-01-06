import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SearchForm } from '../Search'
import { searchCars } from '../../Actions/search.js'

export class Search extends Component {

    render() {
        return (
            <SearchForm onSubmit={searchTerm => searchCars({searchTerm})}/>
        )
    }
}