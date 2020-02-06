import {createStackNavigator} from 'react-navigation-stack';
import {SCREENS} from '../../constants/index';
import EpapersCategoryNavigator from './EpapersCategoryNavigator';
import {headerOptions} from '../../styles/headerOptions';
import {createAppContainer} from 'react-navigation';

const navigator = {[SCREENS.EpapersCategory] : EpapersCategoryNavigator};
const options = { ...headerOptions.main({shadow:false})};

const EpapersNavigator = createStackNavigator(navigator, options);

export default createAppContainer(EpapersNavigator);