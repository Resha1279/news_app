import {createStackNavigator} from 'react-navigation-stack';
import {SCREENS} from '../constants/index';
import {globalStyles, globalStyleVariables} from '../styles/index';
import IntroPager from '../../Intro/screens/IntroPager';
import {createAppContainer} from 'react-navigation';

const navigator = {[SCREENS.IntroPager]: IntroPager};
const options = {
  navigationOptions: {
    headerStyle: globalStyles.headerWithoutShadow,
    headerTintColor: globalStyleVariables.HEADER_TINT_COLOR,
    headerBackTitle: null,
  },
  cardStyle: globalStyles.card,
  headerMode: 'none',
};

const IntroNavigator = createStackNavigator(navigator, options);

export default createAppContainer(IntroNavigator);
