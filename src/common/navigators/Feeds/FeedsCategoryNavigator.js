import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import {SCREENS, FEEDS_CATEGORIES} from '../../constants';
import FeedsList from '../../containers/FeedsList';
import React from 'react';
import Feeds from '../../../Feeds/screens/Feeds';
import {tabOptions} from '../../styles/tabOptions';
import {createAppContainer} from 'react-navigation';

let categories = {};

FEEDS_CATEGORIES.map(category => {
  categories[category.key] = {
    screen: () => <Feeds category={category} />,
    navigationOptions: ({screenProps: {i18n}}) => ({
      tabBarLabel: i18n['feeds'][category.key], //TODO: change title according to lang
    }),
  };
});

const main_routes = categories;

const options = {...tabOptions({scrollable: true})};

const FeedsCategoryNavigator = createMaterialTopTabNavigator(
  main_routes,
  options,
);

//export default FeedsCategoryNavigator;

export default createAppContainer(FeedsCategoryNavigator);
