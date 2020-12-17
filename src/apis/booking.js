import api from './api';

export const proceedSeat = (movieSessionId, clientSessionId, bookedSeatIndices) => {
    return api.patch('/movie_sessions/'+movieSessionId, {
        clientSessionId: clientSessionId,
        bookedSeatIndices: bookedSeatIndices,
    });
};
export const proceedPayment = (clientSessionId, formData) => {
    console.log("proceedPayment");
    console.log({
        movieSessionId: formData.movieSessionId,
        bookedSeatIndices: formData.bookedSeatIndices,
        customerGroupQuantityMap: formData.customerGroupQuantityMap,
        email: formData.email,
        //userId: ObjectId, // omitted for v1
        creditCardInfo: formData.creditCardInfo,
        clientSessionId: clientSessionId
    })
    return api.post('/orders', {
        movieSessionId: formData.movieSessionId,
        bookedSeatIndices: formData.bookedSeatIndices,
        customerGroupQuantityMap: formData.customerGroupQuantityMap,
        email: formData.email,
        //userId: ObjectId, // omitted for v1
        creditCardInfo: formData.creditCardInfo,
        clientSessionId: clientSessionId
    })
}