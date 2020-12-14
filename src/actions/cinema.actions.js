import {INIT_CINEMA_LIST} from '../actionTypes/cinema.actionTypes'
export const initCinemas = (cinemaList) => {
    return ({
        type: INIT_CINEMA_LIST,
        payload: cinemaList
    })
}