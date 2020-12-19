import { connect } from "react-redux";
import MovieSessionList from "../../Component/CinemaSessionPickerPage/MovieSessionList";

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => ({
});

const MovieSessionListConainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieSessionList);

export default MovieSessionListConainer;
