import { GET_GAMES,  GET_GENRES, GAME_POST,
    ORDER_ALPH, ORDER_RATING, SET_DETAILS,
    FILTER_SEARCH, FILTER_GEN, FILTER_CREATED, GET_DETAILS,  } from "../components/constants";


const initialState = {
    allGames: [],
    Games: [],
    genres: [],
    detail: {},
};

function reducer(state= initialState, action){
    switch(action.type){
        case GET_GAMES:
            return {
                ...state,
                allGames: action.payload,
                Games: action.payload
            }
        case GAME_POST:
            return {
                ...state,
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }

        case FILTER_GEN:
            const allVideoGames = state.Games;
            const statusFilter = action.payload === 'dataBase' ? allVideoGames : allVideoGames.filter(e => e.genres.includes(action.payload))
            return {
                ...state,
                allGames: statusFilter
            }
        case FILTER_CREATED:
            const allFilter = state.Games;
            const created = action.payload === 'created' ? allFilter.filter(e => e.createdInDb) : allFilter.filter(e => !e.createdInDb)
            return {
                ...state,
                allGames: action.payload === 'all' ? state.allGames : created
            }
        case ORDER_ALPH:
            const orderSelect = action.payload === 'asc' ?
            state.allGames.sort(function(a, b) {
                if (a.name > b.name) {
                    return 1;
                };
                if (a.name < b.name) {
                    return -1;
                };
                return 0;
            }) : 
            state.allGames.sort(function(a, b) {
                if (a.name < b.name) {
                    return 1;
                };
                if (a.name > b.name) {
                    return -1;
                };
                return 0;
            });
            return {
                ...state,
                allGames: orderSelect
            }
        case ORDER_RATING:
            const orderRat = action.payload === 'desc' ?
            state.allGames.sort(function(a, b) {
                if (a.rating < b.rating) {
                    return 1;
                };
                if (a.rating > b.rating) {
                    return -1;
                };
                return 0;
            }) : 
            state.allGames.sort(function(a, b) {
                if (a.rating > b.rating) {
                    return 1;
                };
                if (a.rating < b.rating) {
                    return -1;
                };
                return 0;
            })
            return {
                ...state,
                allGames: orderRat
            }

        case FILTER_SEARCH:
            return {
                ...state,
                allGames: action.payload
            }

        case GET_DETAILS:
            return{
                ...state,
                detail: action.payload,
            }

        case SET_DETAILS:
            return{
                ...state,
                detail: {}
            }


        default:
            return {
                ...state,
            }
    }
};

export default reducer;