import { connect } from 'react-redux';
import ResultPage from '../../Component/ResultPage';
import { setOrderId } from '../../actions/editseatpicker.actions';


const mapDispatchToProps = (dispatch) => ({
    setOrderId: (orderId) => dispatch(setOrderId(orderId)),
});

const ResultPageContainer = connect(null, mapDispatchToProps)(ResultPage);

export default ResultPageContainer;