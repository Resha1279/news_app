import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {__DEV__, SCREENS} from '../constants/index';
import {View} from 'react-native';
import HomeNavigator from './HomeNavigator';
import FeedsNavigator from './Feeds/FeedsNavigator';
import EpapersNavigator from './Epapers/EpapersNavigator';
import LibraryCategoryNavigator from './Library/LibraryCategoryNavigator';
import PortalsNavigator from './Portals/PortalsNavigator';
import React from 'react';
import Icon from '../components/Icon';
import {headerOptions} from '../styles/headerOptions';
import {bottomTabOptions} from '../styles/tabOptions';
import LibraryNavigator from './Library/LibraryNavigator';

const main_routes = {
  [SCREENS.Home]: {
    screen: HomeNavigator,
    navigationOptions: ({screenProps: {i18n}}) => ({
      tabBarLabel: i18n.bottom_tab.home,
    }),
  },
  [SCREENS.Feeds]: {
    screen: FeedsNavigator,
    navigationOptions: ({screenProps: {i18n}}) => ({
      tabBarLabel: i18n.bottom_tab.feeds,
    }),
  },
  [SCREENS.Portals]: {
    screen: PortalsNavigator,
    navigationOptions: ({screenProps: {i18n}}) => ({
      tabBarLabel: i18n.bottom_tab.portals,
    }),
  },

  // [SCREENS.Epapers]: {
  //     screen: EpapersNavigator,
  //     navigationOptions: ({screenProps: {i18n}}) => ({
  //         tabBarLabel: i18n.bottom_tab.epapers,
  //
  //     })
  // },

  [SCREENS.Library]: {
    screen: LibraryNavigator,
    navigationOptions: ({screenProps: {i18n}}) => ({
      tabBarLabel: i18n.bottom_tab.library,
    }),
  },
};

const options = {...bottomTabOptions};

const MainNavigator = createBottomTabNavigator(main_routes, options);

export default MainNavigator;
