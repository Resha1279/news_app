export const _tabBarOnPress = ({navigation, defaultHandler}) => {
  const {state} = navigation;
  let {index, routes} = state;
  if (index === 0) {
    // inside 1st screen of StackNavigator
    let navigator = routes[0]; // same as 'this.props.navigation.state' inside component
    if (!!navigator && !!navigator.params && !!navigator.params.scrollToTop) {
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
};
