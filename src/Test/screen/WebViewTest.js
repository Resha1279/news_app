import React, {Component} from 'react';
import {View} from 'react-native';
import { WebView} from 'react-native-webview';
import Loader from '../../common/components/Loader';

class TestWebView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadedOnce: false,
    };
  }

  handleOnLoadStart = () => {
    this.setState({
      loading: true,
    });
  };

  handleOnLoadEnd = () => {
    const {loadedOnce} = this.state;
    const newState = {
      loading: false,
    };
    if (!loadedOnce) {
      newState.loadedOnce = true;
    }
    this.setState(newState);
  };

  renderLoader = () => <Loader />;

  componentWillMount() {}

  render() {
    const {source, ...otherProps} = this.props;
    const {loadedOnce, loading} = this.state;
    return (
      <View style={{flex: 1}}>
        <WebView
          source={source}
          renderLoading={this.renderLoader}
          onLoadStart={this.handleOnLoadStart}
          onLoadEnd={this.handleOnLoadEnd}
          startInLoadingState
          {...otherProps}
        />
      </View>
    );
  }
}

export default TestWebView;
