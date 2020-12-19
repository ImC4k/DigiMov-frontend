import { connect } from "react-redux";
import CinemaSessionPickerPage from "../../Component/MovieSessionPickerPage";

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => ({
});

const MovieSessionPickerPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CinemaSessionPickerPage);

export default MovieSessionPickerPageContainer;
