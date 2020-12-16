import BookingPageConainer from './Container/BookingPageContainer';
import CinemaListPageContainer from './Container/CinemaListPageContainer';


const routes = [
  {
    name: 'cinema',
    path: '/cinemas',
    description: 'Cinemas',
    component: CinemaListPageContainer,
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
