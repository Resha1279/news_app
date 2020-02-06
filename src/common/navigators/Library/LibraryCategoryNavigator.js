import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import React from 'react';
import {SCREENS} from '../../constants/index';
import Downloads from '../../../Library/screens/Downloads';
import Bookmarks from '../../../Library/screens/Bookmarks';
import {tabOptions} from '../../styles/tabOptions';
import {createAppContainer} from 'react-navigation';

const main_routes = {
  [SCREENS.Bookmarks]: {
    screen: Bookmarks,
    navigationOptions: ({screenProps: {i18n}}) => ({
      tabBarLabel: i18n.library.bookmarks, //TODO: change title according to lang
    }),
  },
  //
  //     [SCREENS.Downloads] : {
  //     screen: Downloads,
  //     navigationOptions: ({screenProps: {i18n}}) => ({
  //         tabBarLabel: i18n.library.downloads, //TODO: change title according to lang
  //
  //     })
  // },
};

const options = {...tabOptions({scrollable: false})};

const LibraryCategoryNavigator = createMaterialTopTabNavigator(
  main_routes,
  options,
);

//export default LibraryCategoryNavigator;

export default createAppContainer(LibraryCategoryNavigator);
