import { NEW_BOOKING_SESSION } from '../actionTypes/booking.actionTypes';


const booking = (state = {}, action) => {
    if (action.type === NEW_BOOKING_SESSION) {
        return {
            movieSession : action.movieSession,
            previousPage : action.previousPage
        };
    }
    return state;
};
export default booking;