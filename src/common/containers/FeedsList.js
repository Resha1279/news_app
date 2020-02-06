import {Component} from 'react';
import React from 'react';
import {FlatList, InteractionManager, Share} from 'react-native';
import {RefreshControl, View} from 'react-native';
import {
  __DEV__,
  ADS_PLACEMENT_IDS,
  FEEDS_BATCH,
  MAX_FEEDS_ITEMS,
  SCREENS,
} from '../constants';
import type {FeedItem} from '../components/items/feeds/DetailView';
import FeedsItemWithImage from '../components/items/feeds/DetailView';
import * as globalStyleVariables from '../styles/variables';
import Empty from '../components/Empty';
import Loader from '../components/Loader';
import Loading from '../components/Loading';
import {withNavigation} from 'react-navigation';
import NativeFeedsAds from './Ads/NativeFeedsAds';
import {NativeAdsManager} from 'react-native-fbads';
import {adsManager} from '../../App/screen/App';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import {globalStyles} from '../styles';
import ZoomButton from '../components/ZoomButton';
import DetailView from '../components/items/feeds/DetailView';
import MinimalView from '../components/items/feeds/MinimalView';
import NormalView from '../components/items/feeds/NormalView';
import Communications from 'react-native-communications';
import {feedsItemClicked, feedsItemShare} from '../utils/analytics';

class FeedsList extends Component {
  props: {
    data: {items: Array<FeedItem>},
    from: string,
    doNotLoadMore: boolean,
    doNotShowNoContent: boolean,
    getRef: () => {},
    renderEmpty: () => {},
    refreshControl: () => {},
  };

  static defaultProps = {
    renderEmpty: (
      <View style={{flex: 1, height: '100%'}}>
        <Empty image_name={'empty_contents'} type="feeds" />
      </View>
    ),
  };

  static emptyItem = [];

  constructor() {
    super();
    this.renderFlatList = this.renderFlatList.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.feedsItemOnClick = this.feedsItemOnClick.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.feedsItemOnCategoryClicked = this.feedsItemOnCategoryClicked.bind(
      this,
    );
    this.state = {is_mounting: true, refresh: false};
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({is_mounting: false});
    });
  }

  componentWillUnmount() {}

  onRefresh() {
    this.setState({refresh: !this.state.refresh});
  }

  renderItemConditions(item, index) {
    const {hideViews, showCategory} = this.props;
    const {type, view_type} = item;
    switch (view_type) {
      case 'detail':
        return (
          <View style={{flex: 1}}>
            <DetailView
              onCategoryClicked={this.feedsItemOnCategoryClicked(item, index)}
              showCategory={showCategory}
              shareOnClick={this.onFeedItemShareClicked(item, index)}
              refresh={this.state.refresh}
              hideViews={hideViews}
              onClick={this.feedsItemOnClick(item, index)}
              item={item}
              index={index}
            />
          </View>
        );
      case 'minimal':
        return (
          <View style={{flex: 1}}>
            <MinimalView
              onCategoryClicked={this.feedsItemOnCategoryClicked(item, index)}
              showCategory={showCategory}
              shareOnClick={this.onFeedItemShareClicked(item, index)}
              refresh={this.state.refresh}
              hideViews={hideViews}
              onClick={this.feedsItemOnClick(item, index)}
              item={item}
              index={index}
            />
          </View>
        );
      case 'normal':
        return (
          <View style={{flex: 1}}>
            <NormalView
              onCategoryClicked={this.feedsItemOnCategoryClicked(item, index)}
              showCategory={showCategory}
              shareOnClick={this.onFeedItemShareClicked(item, index)}
              refresh={this.state.refresh}
              hideViews={hideViews}
              onClick={this.feedsItemOnClick(item, index)}
              item={item}
              index={index}
            />
          </View>
        );
      default:
        return (
          <View style={{flex: 1}}>
            <DetailView
              onCategoryClicked={this.feedsItemOnCategoryClicked(item, index)}
              showCategory={showCategory}
              shareOnClick={this.onFeedItemShareClicked(item, index)}
              refresh={this.state.refresh}
              hideViews={hideViews}
              onClick={this.feedsItemOnClick(item, index)}
              item={item}
              index={index}
            />
          </View>
        );
    }
  }

  renderItem(item, index) {
    const {hideViews} = this.props;
    const {type, view_type} = item;
    switch (item.type) {
      case 'ads':
        return (
          <View style={[globalStyles.card, {height: 0}]}>
            <NativeFeedsAds adsManager={adsManager} />
          </View>
        );

      case 'withImage':
        return this.renderItemConditions(item, index);
      case 'withoutImage':
        return this.renderItemConditions(item, index);
      default:
        return (
          <View style={{flex: 1}}>
            <DetailView
              onCategoryClicked={this.feedsItemOnCategoryClicked(item, index)}
              showCategory
              shareOnClick={this.onFeedItemShareClicked(item, index)}
              hideViews={hideViews}
              onClick={this.feedsItemOnClick(item, index)}
              item={item}
              index={index}
            />
          </View>
        );
    }
  }

  onFeedItemShareClicked = (item, index) => () => {
    const {
      data: {is_first_load},
      from,
    } = this.props;
    const params_for_analytics = {
      ...item['analytics_item'],
      from,
      load_more: !is_first_load,
    };
    feedsItemShare(params_for_analytics);

    const message = {title: item.title, message: item.news_url};
    const options = {dialogTitle: 'Share'};
    Share.share(message, options);
  };

  feedsItemOnCategoryClicked = (item, index) => () => {
    this.props.navigation.navigate(item.category);
  };

  feedsItemOnClick = (item, index) => () => {
    const {
      data: {items, is_first_load},
      from,
    } = this.props;
    const params_for_analytics = {
      ...item['analytics_item'],
      from,
      load_more: !is_first_load,
    };
    feedsItemClicked(params_for_analytics);
    this.props.navigation.navigate(SCREENS.FeedsDetail, {
      items: items,
      item,
      index,
    });
  };

  renderFooter() {
    const {
      data: {is_loading, items},
      doNotLoadMore,
    } = this.props;
    if (!doNotLoadMore) {
      return is_loading ? <Loader /> : <View style={{height: 10}} />;
    }
    return null;
  }

  render() {
    if (this.state.is_mounting) {
      return <Loading />;
    }
    const {
      data: {items, is_loading, is_first_load},
      renderEmpty,
      doNotShowNoContent,
    } = this.props;

    if (__DEV__) {
      console.log('Feedlist : prpos : data ', items);
    }

    if (is_first_load && is_loading) {
      return <Loader />;
    }

    if (!items || (items && items.length === 0)) {
      if (doNotShowNoContent) {
        return <View />;
      }
      return renderEmpty;
    }
    return <View style={{flex: 1}}>{this.renderFlatList()}</View>;
  }

  renderFlatList() {
    const {
      data: {items, is_loading},
      loadMoreItems,
      renderEmpty,
      headerComponent,
      getRef,
      refreshControl,
    } = this.props;
    const {COLUMNS} = 1;
    return (
      <View style={{flex: 1}}>
        <FlatList
          ref={getRef}
          data={
            items && items.length > 0
              ? items.length > MAX_FEEDS_ITEMS
                ? items.slice(0, MAX_FEEDS_ITEMS)
                : items
              : FeedsList.emptyItem
          }
          refreshControl={refreshControl}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item, index}) => this.renderItem(item, index)}
            // getItemLayout={(data, index) => ({
            //   length: globalStyleVariables.WINDOW_WIDTH / COLUMNS,
            //   offset: (globalStyleVariables.WINDOW_WIDTH / COLUMNS) * index,
            //   index,
            // })}
          removeClippedSubview={true}
          initialNumToRender={8}
          // maxToRenderPerBatch={2}
          onEndReachedThreshold={0.5}
          onEndReached={loadMoreItems}
          ListEmptyComponent={renderEmpty}
          ListHeaderComponent={headerComponent}
          ListFooterComponent={this.renderFooter}
          // onScroll={onScroll}
          onScrollToIndexFailed={() => {}}
          indicatorStyle={'white'}
          showsVerticalScrollIndicator={true}
        />
      </View>
    );
  }
}

export default withNavigation(FeedsList);
