import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import {
  TabViewAnimated,
  TabViewPagerScroll,
  TabViewPagerPan,
} from 'react-native-tab-view';

import {globalStyleVariables} from '../../common/styles/index';
import ProtoPhotoView from '../../common/components/ProtoPhotoView';
import ProtoHeader from '../../common/components/ProtoHeader';
import HeaderTextTitle from '../../common/components/headers/HeaderTextTitle';
import Loader from '../../common/components/Loader';
import {
  PRIMARY_TEXT_COLOR,
  SECONDARY_TEXT_COLOR,
} from '../../common/styles/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY_TEXT_COLOR,
  },
  slide: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

class ImagesViewer extends Component {
  constructor(props) {
    super(props);
    const {images, viewerIndex} = this.props.navigation.state.params;
    this.state = {
      loading: true,
      index: viewerIndex,
      images: images.map(image => ({
        url: image,
        loading: true,
      })),
      routes: images.map(image => ({
        key: image.toString(),
      })),
      hideHeader: true,
    };
  }

  handleOnPressImage = () => {
    this.setState(prevState => ({
      hideHeader: !prevState.hideHeader,
    }));
  };

  componentDidMount() {
    const {navigation} = this.props;
    const {images, viewerIndex} = navigation.state.params;
    const selectedImages = [images[viewerIndex]];
    navigation.setParams({
      selectedImages,
      totalImages: images.length,
      viewerIndex,
    });
  }

  handleOnImageLoaded = imageUrl => {
    this.setState(({images}) => ({
      images: images.map(image =>
        image.url === imageUrl ? {...image, loading: false} : image,
      ),
    }));
  };

  renderPager = props =>
    Platform.OS === 'ios' ? (
      <TabViewPagerScroll {...props} />
    ) : (
      <TabViewPagerPan {...props} />
    );

  renderScene = ({route, index}) => {
    if (Math.abs(this.state.index - this.state.routes.indexOf(route)) > 2) {
      return null;
    }
    const image = this.state.images[index];
    return (
      <View key={image.url} style={styles.slide}>
        {image.loading && <Loader absolutePosition color="#fff" />}
        <ProtoPhotoView
          uri={image.url}
          onLoad={this.handleOnImageLoaded}
          onTap={this.handleOnPressImage}
          onViewTap={this.handleOnPressImage}
        />
      </View>
    );
  };

  handleChangeTab = index => {
    const {navigation} = this.props;
    const {images} = navigation.state.params;
    const selectedImages = [images[index]];
    this.setState({index});
    navigation.setParams({
      selectedImages,
      viewerIndex: index,
    });
  };

  render() {
    const {index, hideHeader} = this.state;
    const {images} = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={PRIMARY_TEXT_COLOR}
          // hidden={hideHeader}
          barStyle="light-content"
          animate={true}
        />

        {!hideHeader && (
          <ProtoHeader
            darkTheme
            hideStatusBar
            absolutePosition={true}
            showBackButton
            headerTitle={
              <HeaderTextTitle>
                {images.length > 1 ? `${index + 1}/${images.length}` : null}
              </HeaderTextTitle>
            }
            headerRight={<Text>Download</Text>}
          />
        )}

        <TabViewAnimated
          style={{flex: 1}}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderPager={this.renderPager}
          onRequestChangeTab={this.handleChangeTab}
          useNativeDriver
        />
      </View>
    );
  }
}

export default ImagesViewer;
