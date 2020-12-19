import CinemaListPageContainer from './Container/CinemaListPageContainer';
import CinemaSessionPickerPageContainer from './Container/CinemaSessionPickerPageContainer/CinemaSessionPickerPageContainer';

const routes = [
  {
    name: 'cinema',
    path: '/cinemas',
    description: 'Cinemas',
    component: CinemaListPageContainer,
    isShowOnDrawer: true
  },
  {
    name: 'cinema',
    path: '/cinemas/:id',
    description: 'CinemasSessionPicker',
    component: CinemaSessionPickerPageContainer,
    isShowOnDrawer: false
  },
];

export default routes;
