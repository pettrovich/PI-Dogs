const initialState = {
    dogs: [],
    dogsView: [],
    temperaments: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                dogsView: action.payload,
            };
        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            };
            case 'FILTER_BY_TEMPERAMENT':
                if (action.payload === "all") return {...state, dogsView: state.dogs};
                return {
                    ...state,
                    dogsView: state.dogs.filter(dog => dog.temperaments.includes(action.payload))
                }; 
            case 'FILTER_BY_DATA_ORIGIN':
                if (action.payload === "all") return {...state, dogsView: state.dogs};
                return {
                    ...state,
                    dogsView: state.dogs.filter(dog => ((action.payload === "api") === dog.fromAPI))
                }; 
        default:
            return state;
    }
}

export default rootReducer;