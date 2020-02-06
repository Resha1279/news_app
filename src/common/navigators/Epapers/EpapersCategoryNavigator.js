import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {EPAPERS_CATEGORIES} from '../../constants';
import React from 'react';
import Epapers from '../../../Epapers/screens/Epapers';
import {tabOptions} from '../../styles/tabOptions';
import {createAppContainer} from 'react-navigation';

let categories = {};

EPAPERS_CATEGORIES.map(category => {
  categories[category.key] = {
    screen: () => <Epapers item={category} />,
    navigationOptions: ({screenProps: {i18n}}) => ({
      tabBarLabel: category.title, //TODO: change title according to lang
    }),
  };
});

const main_routes = categories;

const options = {...tabOptions({scrollable: true})};

const EpapersCategoryNavigator = createMaterialTopTabNavigator(
  main_routes,
  options,
);

//export default EpapersCategoryNavigator;

export default createAppContainer(EpapersCategoryNavigator);
