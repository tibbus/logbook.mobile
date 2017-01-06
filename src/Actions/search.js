import { getSearchResult } from '../API/Search'

export const searchCars = (searchTerm) => {
    return dispatch => {
        getSearchResult(searchTerm)
        .then(searchResult => {
            dispatch({
                type: SEARCHED_RESULT,
                searchResult
            })
        })
        .catch(error => {

        })
    }
}