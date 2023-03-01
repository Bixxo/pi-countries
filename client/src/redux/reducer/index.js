import { GET_COUNTRIES, FILTER_NAME, GET_COUNTRY_DETAIL, ORDER_BY_CONTINENT, GET_ACTIVITIES, ORDER_BY_ACTIVITY, ORDER_BY_SORT } from '../../controllers/const'

const initialState = {
    countries: [],
    countryDetail: {},
    activity: [],
    filter: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                filter: action.payload
            }
        
        case FILTER_NAME:
            return {
                ...state,
                filter: action.payload
            }

        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetail: action.payload
            }

        case ORDER_BY_CONTINENT:
            if (action.payload === 'All') {
                return {
                    ...state
                }
            }
            return {
                ...state,
                countries: state.countries.filter(el => el.continent === action.payload),
                filter: state.countries.filter(el => el.continent === action.payload)
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activity: action.payload
            }
        case ORDER_BY_ACTIVITY:
            return {
                ...state,
                filter: state.countries.filter(el => el.Activities.some(el => el.name === action.payload))
            }
        case ORDER_BY_SORT:
            switch (action.payload) {

                case 'az':
                    return {
                        ...state,
                        filter: state.countries.sort((a, b) => a.name.localeCompare(b.name))
                    }
                case 'za':
                    return {
                        ...state,
                        filter: state.countries.sort((a, b) => b.name.localeCompare(a.name))
                    }
                case 'poM':
                    return {
                        ...state,
                        filter: state.countries.sort((a,b) => b.population - a.population)
                    }
                case 'pom':
                    return {
                        ...state,
                        filter: state.countries.sort((a,b) => a.population - b.population)
                    }
                case 'arM': {
                    return {
                        ...state,
                        filter: state.countries.sort((a,b) => b.area - a.area)
                    }
                }
                case 'arm':
                    return {
                        ...state,
                        filter: state.countries.sort((a,b) => a.area - b.area)
                    }
                case 'sf':
                    return {
                        ...state,
                        filter: state.countries
                    }
            }

        default:
            return state
    }
}

export default rootReducer

