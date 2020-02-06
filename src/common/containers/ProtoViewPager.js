import React, {Component} from 'react';
import {
  View,
  Platform,
  FlatList,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {globalStyles, globalStyleVariables} from '../styles/index';
import Loading from '../components/Loading';
import {__DEV__} from '../constants';
import Loader from '../components/Loader';

const LIST_WINDOW_SIZE = 5;

const styles = StyleSheet.create({
  pageStyle: {
    alignItems: 'center',
    padding: 20,
  },
});

class ProtoViewPager extends Component {
  handleOnIOSViewPagerPageSelected = e => {
    const {onPageSelected} = this.props;
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;
    // Divide the horizontal offset by the width of the view to see which page is visible
    const index = Math.round(contentOffset.x / viewSize.width);
    if (index > -1) {
      onPageSelected(index);
    }
  };

  handleOnAndroidViewPagerPageSelected = e => {
    const {items, onEndReached} = this.props;
    // const { position } = e.nativeEvent;

    const {onPageSelected} = this.props;
    const index = e.nativeEvent.position;
    onPageSelected(index);
    if (onEndReached && index >= items.length - 2) {
      onEndReached();
    }
  };

  renderContentForAndroid = () => {
    const {items, keyExtractor, renderContent, index} = this.props;

    const size = Math.floor(LIST_WINDOW_SIZE / 2);
    return items.map((item, i) => {
      if (i >= index - size && i <= index + size) {
        return renderContent({item, index: i});
      }
      const key = keyExtractor(item, i);
      return (
        <View key={key}>
          <Loader />
        </View>
      );
    });
  };

  render() {
    const {
      items,
      index,
      keyExtractor,
      renderContent,
      onEndReached,
      viewPagerRef,
    } = this.props;
    return (
        <FlatList
          ref={viewPagerRef}
          data={items}
          keyExtractor={keyExtractor}
          renderItem={renderContent}
          scrollEventThrottle={16}
          onMomentumScrollEnd={this.handleOnIOSViewPagerPageSelected}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          horizontal
          initialScrollIndex={index}
          windowSize={LIST_WINDOW_SIZE}
          initialNumToRender={3}
          pagingEnabled
          debug={false}
          maxToRenderPerBatch={LIST_WINDOW_SIZE}
          getItemLayout={(data, i) => ({
            length: globalStyleVariables.WINDOW_WIDTH,
            offset: globalStyleVariables.WINDOW_WIDTH * i,
            index: i,
          })}
        />
    );
  }
}

export default ProtoViewPager;
