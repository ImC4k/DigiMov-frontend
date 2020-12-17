import { connect } from 'react-redux';
import OrderListPage from '../../Component/OrderListPage';

const mapStateToProps = (state) => ({
    orderList: state.orders,
});
const OrderListPageConainer = connect(
    mapStateToProps
)(OrderListPage);

export default OrderListPageConainer;
