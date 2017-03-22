import { getSearchResult } from '../API/Search'
import { CARS_SEARCHED } from './Types'

export const searchCars = (searchRequest) => {
    return dispatch => {
        getSearchResult(searchRequest.searchTerm)
        .then(searchResult => {
            dispatch({
                type: CARS_SEARCHED,
                value: searchResult.value
            });
        })
        .catch(error => {

        });
    }
}