import axios from 'axios';

export function getDogs () {
    return async function (dispatch) {
        return axios.get("/dogs")
                    .then(json => dispatch({type: 'GET_DOGS',
                                            payload: json.data}));
    }
}

export function getDogsByName (name) {
    return async function (dispatch) {
        return axios.get(`/dogs?name=${name}`)
                    .then(json => dispatch({type: 'GET_DOGS_BY_NAME',
                                            payload: json.data}));
    }
}

export function getDogById (id) {
    return async function (dispatch) {
        return axios.get(`/dogs/${id}`)
                    .then(json => dispatch({type: 'GET_DOG_BY_ID',
                                            payload: json.data}))
                    .catch(error => dispatch({type: 'GET_DOG_BY_ID',
                    payload: '404'}));
    }
}

export function getTemperaments () {
    return async function (dispatch) {
        return axios.get("/temperament")
                    .then(json => dispatch({type: 'GET_TEMPERAMENTS',
                                            payload: json.data.map(temperament => temperament.name).sort()}));
    }
}

export function postDog (payload) {
    return async function (dispatch) {
        return await axios.post('/dog',payload);
    }
}

export function filter (dataOrigin, temperament) {
    return {
        type: 'FILTER',
        payload: [dataOrigin, temperament]
    }
}

export function orderBy (ordering) {
    return {
        type: 'ORDER_BY',
        payload: ordering
    }
}