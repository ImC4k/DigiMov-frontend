import { connect } from "react-redux";
import CinemaSessionPickerPage from "../../Component/CinemaSessionPickerPage";

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => ({
    cinemaList: state.cinemas,
});

const CinemaSessionPickerPageConainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CinemaSessionPickerPage);

export default CinemaSessionPickerPageConainer;
