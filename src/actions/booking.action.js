import { NEW_BOOKING_SESSION } from '../actionTypes/booking.actionTypes';
export const newBookingSession = (movieSession, previousPage) => {
    return {
      type: NEW_BOOKING_SESSION,
      movieSession: movieSession,
      previousPage: previousPage
    };
  };