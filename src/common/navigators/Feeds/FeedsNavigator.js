import {createStackNavigator} from 'react-navigation-stack';
import {SCREENS} from '../../constants/index';
import FeedsCategoryNavigator from './FeedsCategoryNavigator';
import {headerOptions} from '../../styles/headerOptions';
import FeedsCategory from '../../../Feeds/screens/FeedsCategory';
import {insideTabSharedRoutes} from '../sharedRoutes';
import {createAppContainer} from 'react-navigation';

const navigator = {
  [SCREENS.FeedCategory]: FeedsCategory,
  ...insideTabSharedRoutes,
};

const options = {...headerOptions.main({shadow: false})};

const FeedsNavigator = createStackNavigator(navigator, options);

export default createAppContainer(FeedsNavigator);
