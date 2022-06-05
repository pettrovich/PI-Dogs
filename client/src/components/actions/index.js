import axios from 'axios';

export function getDogs () {
    return async function (dispatch) {
        return axios.get("http://localhost:3001/dogs")
                    .then(json => dispatch({type: 'GET_DOGS',
                                            payload: json.data}));
    }
}

export function getTemperaments () {
    return async function (dispatch) {
        return axios.get("http://localhost:3001/temperament")
                    .then(json => dispatch({type: 'GET_TEMPERAMENTS',
                                            payload: json.data.map(temperament => temperament.name).sort()}));
    }
}

export function filterByTemperament (temperament) {
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload: temperament
    }
}

export function filterByDataOrigin (dataOrigin) {
    return {
        type: 'FILTER_BY_DATA_ORIGIN',
        payload: dataOrigin
    }
}

export function orderBy (ordering) {
    return {
        type: 'ORDER_BY',
        payload: ordering
    }
}