import BookingPageConainer from './Container/BookingPageContainer';
import CinemaListPageContainer from './Container/CinemaListPageContainer';
import MovieListPageContainer from './Container/MovieListPageContainer'
import SeatPickerPageContainer from './Container/SeatPickerPageContainer';
import CinemaSessionPickerPageContainer from './Container/CinemaSessionPickerPageContainer/CinemaSessionPickerPageContainer';
import HomePageContainer from './Container/HomePageContainer';
import ResultPageContainer from './Container/ResultPageContainer';


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

  // Testing route
  {
    name: 'seatpicker',
    path: '/seatpicker',
    description: 'Seatpicker',
    component: SeatPickerPageContainer,
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
    name: 'paymentresult',
    path: '/orders/:id',
    description: 'Payment Result',
    component: ResultPageContainer,
    isShowOnDrawer: false
  }
];

export default routes;



