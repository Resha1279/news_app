import {Component} from 'react';
import React from 'react';
import {
  View,
  Text,
  InteractionManager,
  ScrollView,
  RefreshControl,
  Button,
} from 'react-native';
import Loader from '../../common/components/Loader';
import {
  __DEV__,
  PORTALS_CATEGORIES,
  SCREENS,
  PORTALS_CATEGORIES_TITLE,
} from '../../common/constants';
import {globalStyles} from '../../common/styles/index';
import connectLocalization from '../../common/localization/connectLocalization';
import Portals from './Portals';
import ModalDropdown from 'react-native-modal-dropdown-with-flatlist';

class PortalsCategory extends Component {
  constructor(props) {
    super(props);
    const {portals_category} = props.i18n;
    let categories = [];
    PORTALS_CATEGORIES.map(category => {
      let item = {key: category.key, title: category.key};
      categories.push(item);
    });
    this.state = {
      is_mounting: true,
      show_update_available: false,
      index: 0,
      routes: categories,
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    const {lang: prevLang} = this.props;
    const {lang, i18n} = nextProps;
    const {portals_category} = nextProps.i18n;
    let categories = [];
    PORTALS_CATEGORIES.map(category => {
      let item = {key: category.key, title: category.key};
      categories.push(item);
      if (__DEV__) {
        console.log('portals category items', categories);
      }
    });
    if (lang !== prevLang) {
      this.setState({
        routes: categories,
      });
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({is_mounting: false});
    });
  }

  handleChangeTab = index => {
    this.setState({index: index});
  };

  renderScene = route => {
    if (__DEV__) {
      console.log('routes from portals Category: ', route);
      // console.log('from portals Category: this function is not called');
    }
    this.setState({index: route});
    // switch (routes) {
    //   case PORTALS_CATEGORIES[routes].key:
    //     return <Portals category={PORTALS_CATEGORIES[routes]} />;
    //   case PORTALS_CATEGORIES[1].key:
    //     return <Portals category={PORTALS_CATEGORIES[1]} />;
    //   case PORTALS_CATEGORIES[2].key:
    //     return <Portals category={PORTALS_CATEGORIES[2]} />;
    //   case PORTALS_CATEGORIES[3].key:
    //     return <Portals category={PORTALS_CATEGORIES[3]} />;
    //   default:
    //     return <Portals category={PORTALS_CATEGORIES[0]} />;
    // }
  };

  render() {
    if (this.state.is_mounting) {
      return (
        <View style={{flex: 1}}>
          <Loader />
        </View>
      );
    }
    return (
      <View style={globalStyles.container}>
        <ModalDropdown
          options={PORTALS_CATEGORIES_TITLE}
          defaultValue={PORTALS_CATEGORIES_TITLE[0]}
          selectedOptionIndex={0}
          onSelect={this.renderScene}
        />
        <Portals category={PORTALS_CATEGORIES[this.state.index]} />
      </View>
    );
  }
}

export default connectLocalization(PortalsCategory);
