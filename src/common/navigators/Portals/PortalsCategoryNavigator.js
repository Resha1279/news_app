import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import {PORTALS_CATEGORIES} from '../../constants';
import React from 'react';
import Portals from '../../../Portals/screens/Portals';
import {tabOptions} from '../../styles/tabOptions';
import {createAppContainer} from 'react-navigation';

let categories = {};

PORTALS_CATEGORIES.map(category => {
  if (category) {
    categories[category.key] = {
      screen: () => <Portals category={category} />,
      navigationOptions: ({screenProps: {i18n}}) => ({
        tabBarLabel: category.title, //TODO: change title according to lang
      }),
    };
  }
});

const main_routes = categories;
const options = {...tabOptions({scrollable: true})};

const PortalsCategoryNavigator = createMaterialTopTabNavigator(
  main_routes,
  options,
);

//export default PortalsCategoryNavigator;

export default createAppContainer(PortalsCategoryNavigator);
