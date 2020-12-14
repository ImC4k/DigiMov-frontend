import { INIT_CINEMA_LIST } from '../actionTypes/cinema.actionTypes'

const cinemas = (state = [], action) => {
    if (action.type === INIT_CINEMA_LIST) {
        return action.payload;
    }
    return state;
}
export default cinemas;