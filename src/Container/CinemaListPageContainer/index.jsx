import { connect } from 'react-redux'
import CinemaListPage from '../../Component/CinemaListPage'
import {initCinemas} from '../../actions/cinema.actions.js'

const mapDispatchToProps = (dispatch) => ({
    initCinemaList: (cinemaList) => dispatch(initCinemas(cinemaList))
})

const mapStateToProps = (state)=>({
    cinemaList: state.cinemas
})
const CinemaListPageConainer = connect(mapStateToProps, mapDispatchToProps)(CinemaListPage);

export default CinemaListPageConainer