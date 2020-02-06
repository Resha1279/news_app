import {NavigationActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function getTopLevelNavigator() {
  if (_navigator) {
    return _navigator._navigation;
  }
  return null;
}
function resetNavigator(routeName, params) {
  _navigator.dispatch(
    NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: routeName}, params)],
    }),
  );
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  getTopLevelNavigator,
  resetNavigator,
};
