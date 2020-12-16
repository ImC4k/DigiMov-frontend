import BookingPageConainer from './Container/BookingPageContainer';
import CinemaListPageContainer from './Container/CinemaListPageContainer';
import SeatPickerPageContainer from './Container/SeatPickerPageContainer';
import CinemaSessionPickerPageContainer from './Container/CinemaSessionPickerPageContainer/CinemaSessionPickerPageContainer';


const routes = [
  {
    name: 'cinema',
    path: '/cinemas',
    description: 'Cinemas',
    component: CinemaListPageContainer,
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
  }
];

export default routes;
