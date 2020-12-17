import { connect } from 'react-redux';
import { setOrderId } from '../../actions/editseatpicker.actions.js'
import EditSeatPickerPage from '../../Component/EditSeatPickerPage';

const mapDispatchToProps = (dispatch) => ({
  setOrderId: (orderId) => dispatch(setOrderId(orderId))
});

const mapStateToProps = (state) => ({
 orderId: state.orderId,
});

const EditSeatPickerPageConainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSeatPickerPage);

export default EditSeatPickerPageConainer;
