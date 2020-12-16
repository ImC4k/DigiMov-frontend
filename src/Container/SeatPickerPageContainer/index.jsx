import { connect } from 'react-redux';
import SeatPickerPage from '../../Component/SeatPickerPage';

const mapDispatchToProps = () => ({
  // initCinemaList: (cinemaList) => dispatch(initCinemas(cinemaList)),
});

const mapStateToProps = () => ({
  // cinemaList: state.cinemas,
});

const SeatPickerPageConainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SeatPickerPage);

export default SeatPickerPageConainer;
