import {Component} from 'react';
import React from 'react';
import {FlatList, InteractionManager} from 'react-native';
import {RefreshControl, View} from 'react-native';
import {__DEV__, ADS_PLACEMENT_IDS, SCREENS} from '../constants';
import * as globalStyleVariables from '../styles/variables';
import Empty from '../components/Empty';
import Loader from '../components/Loader';
import Loading from '../components/Loading';
import {withNavigation} from 'react-navigation';
import NativeFeedsAds from './Ads/NativeFeedsAds';
import {adsManager} from '../../App/screen/App';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import {globalStyles} from '../styles';
import {Text} from 'react-native-elements';
import PortalsItem from '../components/items/portals/PortalsItem';
import PortalsAds from './Ads/PortalsAds';
import {portalItem} from '../utils/analytics';
import connectLocalization from '../localization/connectLocalization';

class PortalsList extends Component {
  // props: {
  //     data: { items: Array<FeedItem> }
  // };

  static defaultProps = {
    renderEmpty: (
      <View style={{flex: 1, height: '100%'}}>
        <Empty
          image_name={'empty_contents'}
          caption={'content_caption'}
          description={'content_desc'}
        />
      </View>
    ),
  };

  constructor() {
    super();
    this.renderFlatList = this.renderFlatList.bind(this);
    this.portalsItemOnClick = this.portalsItemOnClick.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.state = {is_mounting: true, refresh: false};
  }

  componentDidMount() {
    if(__DEV__){
      console.log('PortalsList');
    }
    InteractionManager.runAfterInteractions(() => {
      this.setState({is_mounting: false});
    });
  }

  componentWillUnmount() {}

  renderItem({item, index}) {
    if(__DEV__){
      console.log('renderItem() function in PortalsList');
    }
    switch (item.type) {
      case 'ads':
        return <View />;
      default:
        return (
          <PortalsItem
            item={item}
            index={index}
            onClick={this.portalsItemOnClick(item, index)}
          />
        );
    }
  }

  portalsItemOnClick = (item, index) => () => {
    const {id, category, link, title, title_other} = item;
    const for_analytics = {
      id,
      category,
      item,
    };
    portalItem(for_analytics);
    const {
      navigation: {navigate},
      lang,
    } = this.props;
    let final_title = lang === 'en' ? title : title_other;
    navigate(SCREENS.WebViewer, {link: link, title: final_title});
  };

  render() {
    const {
      data: {items, is_loading},
      loadMoreItems,
      renderEmpty,
    } = this.props;
    if (this.state.is_mounting) {
      return <Loading />;
    }
    if (!items || (items && items.length === 0)) {
      return renderEmpty;
    }
    return (
      <View style={{flex: 1}}>
        {/*<ZoomButton/>*/}
        {this.renderFlatList()}
      </View>
    );
  }

  renderFlatList() {
    const {
      data: {items, is_loading},
      loadMoreItems,
      renderEmpty,
    } = this.props;
    const {COLUMNS} = 1;
    if(__DEV__){
      console.log('renderFlatlist() function in PortalsList', items);
    }
    return (
      <View style={{flex: 1}}>
        <FlatList
          numColumns={2}
          ref={ref => (this.feedList = ref)}
          data={items && items.length > 0 ? items : []}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={this.renderItem}
          getItemLayout={(data, index) => ({
            length: globalStyleVariables.WINDOW_WIDTH / COLUMNS,
            offset: (globalStyleVariables.WINDOW_WIDTH / COLUMNS) * index,
            index,
          })}
          removeClippedSubviews={false}
          initialNumToRender={5}
          onEndReachedThreshold={0.1}
          // onScroll={onScroll}
          indicatorStyle={'white'}
          showsVerticalScrollIndicator={true}
        />
      </View>
    );
  }
}

export default withNavigation(connectLocalization(PortalsList));
