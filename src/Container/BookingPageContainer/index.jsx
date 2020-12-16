import { connect } from 'react-redux';
import BookingPage from '../../Component/BookingPage';

const mapDispatchToProps = (dispatch) => ({
  });
  
  const mapStateToProps = (state) => ({
    movieSession: state.booking.movieSession,
  });
  const BookingPageConainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(BookingPage);
  
  export default BookingPageConainer;