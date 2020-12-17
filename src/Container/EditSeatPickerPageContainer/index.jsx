import { connect } from 'react-redux';
import EditSeatPickerPage from '../../Component/EditSeatPickerPage';

const mapStateToProps = (state) => ({
  editSeatPickerOrderId: state.editSeatPickerOrderId
});

const EditSeatPickerPageConainer = connect(
  mapStateToProps
)(EditSeatPickerPage);

export default EditSeatPickerPageConainer;
