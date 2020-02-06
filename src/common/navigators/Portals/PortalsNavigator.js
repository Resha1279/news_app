import {createStackNavigator} from 'react-navigation-stack';
import {SCREENS} from '../../constants/index';
import PortalsCategoryNavigator from './PortalsCategoryNavigator';
import {headerOptions} from '../../styles/headerOptions';
import PortalsCategory from '../../../Portals/screens/PortalsCategory';
import {createAppContainer} from 'react-navigation';

const navigator = {[SCREENS.PortalsCategories]: PortalsCategory};
const options = {...headerOptions.main({shadow: false})};

const PortalsNavigator = createStackNavigator(navigator, options);

export default createAppContainer(PortalsNavigator);
