import axios from 'axios';

export function getDogs () {
    return async function (dispatch) {
        return axios.get("http://localhost:3001/dogs")
                    .then(json => dispatch({type: 'GET_DOGS',
                                            payload: json.data}));
    }
}