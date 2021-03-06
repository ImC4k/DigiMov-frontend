import { connect } from "react-redux";
import MovieSessionList from "../../Component/MovieSessionPickerPage/MovieSessionList";
import { newBookingSession } from '../../actions/booking.action';

const mapDispatchToProps = (dispatch) => ({
    newBookingSession: (movieSession, previousPage) => dispatch(newBookingSession(movieSession, previousPage)),
});

const mapStateToProps = (state) => ({
});

const MovieSessionListConainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieSessionList);

export default MovieSessionListConainer;
