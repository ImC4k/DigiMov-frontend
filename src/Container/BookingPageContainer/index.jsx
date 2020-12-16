import { connect } from 'react-redux';
import BookingPage from '../../Component/BookingPage';

const mapDispatchToProps = (dispatch) => ({
  });
  
  const mapStateToProps = (state) => ({
    movieSession: state.booking.movieSession,
    previousPage: state.booking.previousPage,
  });
  const BookingPageConainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(BookingPage);
  
  export default BookingPageConainer;