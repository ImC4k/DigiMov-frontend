import { connect } from 'react-redux';
import EditSeatPickerPage from '../../Component/EditSeatPickerPage';

const mapStateToProps = (state) => ({
 orderId: state.orderId
});

const EditSeatPickerPageConainer = connect(
  mapStateToProps
)(EditSeatPickerPage);

export default EditSeatPickerPageConainer;
