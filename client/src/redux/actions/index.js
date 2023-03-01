import { GET_COUNTRIES, FILTER_NAME, GET_COUNTRY_DETAIL, ORDER_BY_CONTINENT, GET_ACTIVITIES, ORDER_BY_ACTIVITY, ORDER_BY_SORT } from '../../controllers/const'

export const getAllCountries = () => {
    return dispatch => {
        return fetch('http://localhost:3001/countries')
        .then(res => res.json())
        .then(data => dispatch({type: GET_COUNTRIES, payload: data}))
    }
}

export const filterName = name => {
    return dispatch => {
        return fetch(`http://localhost:3001/countries?name=${name}`)
        .then(res => res.json())
        .then(data => dispatch({type: FILTER_NAME, payload: data}))
    }
}

export const getCountryDetails = id => {
    return dispatch => {
        return fetch(`http://localhost:3001/countries/${id}`)
        .then(res => res.json())
        .then(data => dispatch({type: GET_COUNTRY_DETAIL, payload: data}))
    }
}

export const orderByContinet = payload => {
    return {
        type: ORDER_BY_CONTINENT,
        payload
    }
}

export const getAllActivities = () => {
    return dispatch => {
        return fetch(`http://localhost:3001/activities`)
        .then(res => res.json())
        .then(data => dispatch({type: GET_ACTIVITIES, payload: data}))
    }
}

export const sortActivity = payload => {
    return {
        type: ORDER_BY_ACTIVITY,
        payload
    }
}

export const orderBySort = payload => {
    return {
        type: ORDER_BY_SORT,
        payload
    }
}

export const crearActividad = data => {
    return function () {
        return fetch('http://localhost:3001/activities', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(res => res.json())
    }
}