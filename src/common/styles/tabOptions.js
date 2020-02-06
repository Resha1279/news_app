import {
  ACTIVE_BOTTOM_TAB,
  ACTIVE_TAB,
  BOTTOM_TAB_BACKGROUND_COLOR,
  BOTTOM_TAB_HEIGHT,
  INACTIVE_BOTTOM_TAB,
  INACTIVE_TAB,
  TAB_BACKGROUND_COLOR,
  TAB_HEIGHT,
} from './variables';
import {View} from 'react-native';
import Icon from '../components/Icon';
import {_tabBarOnPress} from '../navigators/helpers/TabBarOnClick';
import React from 'react';
import {SCREENS} from '../constants/index';
import {bookmark} from '../../Library/action';

// Top Tab Navigation Options

export const tabOptions = ({scrollable}) => ({
  swipeEnabled: true,
  animationEnabled: false,
  lazy: true,
  tabBarOptions: {
    upperCaseLabel: true,
    scrollEnabled: scrollable,
    activeTintColor: ACTIVE_TAB,
    //activeTintColor: 'red',
    inactiveTintColor: INACTIVE_TAB,
    showLabel: true,
    labelStyle: {
      fontWeight: '200',
    },
    tabStyle: {
      height: TAB_HEIGHT,
    },

    style: {
      backgroundColor: TAB_BACKGROUND_COLOR,
      //backgroundColor: 'red',
    },

    indicatorStyle: {
      backgroundColor: ACTIVE_TAB,
      //backgroundColor: 'red',
    },
  },
});

// Bottom Tab Navigation Options

export const bottomTabOptions = {
  headerMode: 'none',
  swipeEnabled: false,
  animationEnabled: false,
  lazy: true,
  tabBarOptions: {
    style: {
      backgroundColor: BOTTOM_TAB_BACKGROUND_COLOR,
      //backgroundColor: 'red',
      height: BOTTOM_TAB_HEIGHT,
      borderTopWidth: 0,
      elevation: 10,
    },

    activeTintColor: ACTIVE_BOTTOM_TAB,
    //activeTintColor: 'red',
    inactiveTintColor: INACTIVE_BOTTOM_TAB,
    showLabel: false,
    showIcon: true,
  },
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused, tintColor}) => {
      const {routeName} = navigation.state;
      let iconName;

      if (routeName === SCREENS.Home) {
        iconName = focused ? 'home' : 'home';
      }
      if (routeName === SCREENS.Feeds) {
        iconName = focused ? 'feeds' : 'feeds';
      }
      // if (routeName === SCREENS.Epapers) {
      //   iconName = focused ? 'epapers' : 'epapersOutline';
      // }
      if (routeName === SCREENS.Portals) {
        iconName = focused ? 'portals' : 'portals';
      }
      if (routeName === SCREENS.Library) {
        iconName = focused ? 'bookmark' : 'bookmark';
      }
      return (
        <Icon
          name={iconName}
          height="24"
          width="24"
          viewBox={
            iconName === 'bookmark' || iconName === 'bookmarkOutline'
              ? '0 0 16 20'
              : '0 0 26 24'
          }
          fill={tintColor}
        />
      );
    },
    tabBarOnPress: ({defaultHandler}) => {
      const {state} = navigation;
      let {index, routes} = state;
      if (index === 0) {
        // inside 1st screen of StackNavigator
        let navigator = routes[0]; // same as 'this.props.navigation.state' inside component
        if (
          !!navigator &&
          !!navigator.params &&
          !!navigator.params.scrollToTop
        ) {
          navigator.params.scrollToTop();
        } else {
          if (routes[0].routes) {
            index = routes[0].index;
            navigator = routes[0].routes[index];
            if (
              !!navigator &&
              !!navigator.params &&
              !!navigator.params.scrollToTop
            ) {
              navigator.params.scrollToTop();
            }
          }
        }
      }
      defaultHandler();
    },
  }),
};
