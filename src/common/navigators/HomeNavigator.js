import {createStackNavigator} from 'react-navigation-stack';
import {SCREENS} from '../constants/index';
import Home from '../../Home/screen/Home';
import {headerOptions} from '../styles/headerOptions';
import FeedsDetail from '../../Shared/screens/FeedsDetail';
import {insideTabSharedRoutes} from './sharedRoutes';
import {createAppContainer} from 'react-navigation';

const navigator = {
  [SCREENS.Home]: Home,
  ...insideTabSharedRoutes,
};
const options = {
  // navigationOptions: {
  //     // headerStyle: globalStyles.headerWithoutShadow,
  //     headerTintColor: globalStyleVariables.HEADER_TINT_COLOR,
  //     headerBackTitle: null,
  // },
  //     cardStyle: globalStyles.card,
  //     headerMode: 'none',
  ...headerOptions.main({shadow: true}),
};

const HomeNavigator = createStackNavigator(navigator, options);

export default createAppContainer(HomeNavigator);
