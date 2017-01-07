import { getCarByRegistration } from '../API/Car'

export const getCar = (registration) => {
    return dispatch => {
        getCarByRegistration({}, registration)
        .then(carInfo => {
            dispatch({
                type: SEARCHED_CAR,
                carInfo
            })
        })
        .catch(error => {

        })
    }
}