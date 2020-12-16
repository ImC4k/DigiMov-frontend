import CinemaListPageContainer from './Container/CinemaListPageContainer';
import SeatPickerPageContainer from './Container/SeatPickerPageContainer';

const routes = [
  {
    name: 'cinema',
    path: '/cinemas',
    description: 'Cinemas',
    component: CinemaListPageContainer,
  },

  // Testing route
  {
    name: 'seatpicker',
    path: '/seatpicker',
    description: 'Seatpicker',
    component: SeatPickerPageContainer,
  },
];

export default routes;
