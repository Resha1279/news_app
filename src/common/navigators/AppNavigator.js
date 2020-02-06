import {createStackNavigator} from 'react-navigation-stack';
import {SCREENS} from '../constants/index';
import sharedConfig from '../../common/navigators/sharedRoutes';
import MainNavigator from './MainNavigator';
import React from 'react';
import Setting from '../../Settings/screen/Setting';
import {headerOptions} from '../styles/headerOptions';
import Test from '../../Test/screen/Test';
import {fade} from './animations';
import IntroNavigator from './IntroNavigator';
import CardStackStyleInterpolator from 'react-navigation';
import {createAppContainer} from 'react-navigation';

const navigator = {
  // [SCREENS.Initial]: IntroNavigator,
  [SCREENS.Main]: {
    screen: MainNavigator,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.Settings]: {
    screen: Setting,
    ...headerOptions.common,
  },
  ...sharedConfig,
};

// const options = headerOptions.main;

const AppNavigator = createStackNavigator(navigator, {
  transitionConfig: () => ({
    screenInterpolator: props => {
      const {scene} = props;
      const {routeName} = scene.route;
      if (routeName === SCREENS.Settings || routeName === SCREENS.ImageViewer) {
        return fade(props);
      }
      return CardStackStyleInterpolator.forFadeFromBottomAndroid(props);
    },
  }),
});

export default createAppContainer(AppNavigator);
