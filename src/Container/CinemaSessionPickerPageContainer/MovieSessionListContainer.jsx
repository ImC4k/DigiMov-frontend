import { connect } from "react-redux";
import MovieSessionList from "../../Component/CinemaSessionPickerPage/MovieSessionList";
import { newBookingSession } from '../../actions/booking.action';

const mapDispatchToProps = (dispatch) => ({
    newBookingSession: (movieSession) => dispatch(newBookingSession(movieSession)),
});

const mapStateToProps = (state) => ({
});

const MovieSessionListConainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieSessionList);

export default MovieSessionListConainer;
