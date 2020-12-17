import { connect } from 'react-redux';
import { initOrderResponse, setOrderResponse } from '../../actions/editseatpicker.actions.js'
import EditSeatPickerPage from '../../Component/EditSeatPickerPage';

const mapDispatchToProps = (dispatch) => ({
  initOrderResponse: (orderResponse) => dispatch(initOrderResponse(orderResponse)),
  setOrderResponse: (orderResponse) => dispatch(setOrderResponse(orderResponse)),
});

const mapStateToProps = (state) => ({
 orderResponse: state.orderResponse,
});

const EditSeatPickerPageConainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSeatPickerPage);

export default EditSeatPickerPageConainer;
