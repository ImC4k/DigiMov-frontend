import { connect } from 'react-redux';
import SearchOrderPage from './../../Component/SearchOrderPage/index';
import { getOrderListByCardAndEmail } from './../../actions/order.actions';

const mapDispatchToProps = (dispatch) => ({
    getOrderListByCardAndEmail: (orderList) => dispatch(getOrderListByCardAndEmail(orderList)),
});

const mapStateToProps = (state) => ({
    orderList: state.orders,
});
const SearchOrderPageConainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchOrderPage);

export default SearchOrderPageConainer;
