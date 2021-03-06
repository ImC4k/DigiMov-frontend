import BookingPageConainer from './Container/BookingPageContainer';
import CinemaListPageContainer from './Container/CinemaListPageContainer';
import MovieListPageContainer from './Container/MovieListPageContainer'
import SeatPickerPageContainer from './Container/SeatPickerPageContainer';
import CinemaSessionPickerPageContainer from './Container/CinemaSessionPickerPageContainer/CinemaSessionPickerPageContainer';
import MovieSessionPickerPageContainer from './Container/MovieSessionPickerPageContainer/MovieSessionPickerPageContainer'
import HomePageContainer from './Container/HomePageContainer';
import SearchOrderPageConainer from './Container/SearchOrderPageContainer/index';
import EditSeatPickerPageContainer from './Container/EditSeatPickerPageContainer';
import ResultPageContainer from './Container/ResultPageContainer';
import OrderCompletePage from './Component/OrderCompletePage';
import OrderListPageConainer from './Container/OrderListPageContainer/index';


const routes = [
  {
    name: 'home',
    path: '/',
    description: 'Home',
    component: HomePageContainer,
    isShowOnDrawer: true
  },
  {
    name: 'cinema',
    path: '/cinemas',
    description: 'Cinemas',
    component: CinemaListPageContainer,
    isShowOnDrawer: true
  },
  {
    name: 'movie',
    path: '/movies',
    description: 'Movies',
    component: MovieListPageContainer,
    isShowOnDrawer: true
  },
  {
    name: 'editseatpicker',
    path: '/editseatpicker',
    description: 'EditSeatPicker',
    component: EditSeatPickerPageContainer
  },
  { 
    name: 'movie',
    path: '/movies/:id',
    description: 'MoviesSessionPicker',
    component: MovieSessionPickerPageContainer,
    isShowOnDrawer: false
  },

  // Testing route
  {
    name: 'seatpicker',
    path: '/seatpicker',
    description: 'Seatpicker',
    component: SeatPickerPageContainer,
  },
  // Testing order complete 
  {
    name: 'ordercomplete',
    path: '/ordercomplete',
    description: 'OrderComplete',
    component: OrderCompletePage,
    isShowOnDrawer: false
  },
  {
    name: 'cinema',
    path: '/cinemas/:id',
    description: 'CinemasSessionPicker',
    component: CinemaSessionPickerPageContainer,
    isShowOnDrawer: false
  },
  {
    name: 'booking',
    path: '/booking',
    description: 'Booking',
    component: BookingPageConainer,
    isShowOnDrawer: false
  },
  {
    name: 'searchOrder',
    path: '/searchorder',
    description: 'Manage Orders',
    component: SearchOrderPageConainer,
    isShowOnDrawer: true
  },
  {
    name: 'paymentresult',
    path: '/orders/:id',
    description: 'Payment Result',
    component: ResultPageContainer,
    isShowOnDrawer: false
  },
  {
    name: 'orders',
    path: '/orders',
    description: 'Orders',
    component: OrderListPageConainer,
    isShowOnDrawer: false
  },
];

export default routes;



