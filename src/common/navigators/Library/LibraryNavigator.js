import {createStackNavigator} from 'react-navigation-stack';
import {SCREENS} from '../../constants/index';
import {headerOptions} from '../../styles/headerOptions';
import LibraryCategoryNavigator from './LibraryCategoryNavigator';
import Bookmarks from '../../../Library/screens/Bookmarks';
import {insideTabSharedRoutes} from '../sharedRoutes';
import {createAppContainer} from 'react-navigation';

const navigator = {
  [SCREENS.Bookmarks]: Bookmarks,
  ...insideTabSharedRoutes,
};

const options = {...headerOptions.main({shadow: true})};

const LibraryNavigaror = createStackNavigator(navigator, options);

export default createAppContainer(LibraryNavigaror);
