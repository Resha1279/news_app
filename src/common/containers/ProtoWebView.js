import React, {Component} from 'react';
import {View, Share, BackAndroid} from 'react-native';
import {WebView} from 'react-native-webview';
import ProgressBar from 'react-native-progress/Bar';
import Loader from '../../common/components/Loader';
import {globalStyles} from '../../common/styles';
import * as globalStyleVariables from '../../common/styles/variables';
import {Button} from 'react-native-elements';
import {__DEV__, SCREENS} from '../constants';
import ProtoTouchable from '../components/ProtoTouchable';
import ProtoText from '../components/ProtoText';
import {withNavigation} from 'react-navigation';
import Communications from 'react-native-communications';
import PortalHeader from '../components/headers/PortalHeader';

class ProtoWebView extends Component {
  constructor(props) {
    super(props);
    this.onBackPressed = this.onBackPressed.bind(this);
    this.onForwardPressed = this.onForwardPressed.bind(this);
    this.onStopLoadingPressed = this.onStopLoadingPressed.bind(this);
    this._onNavigationStateChange = this._onNavigationStateChange.bind(this);
    this.onWebViewMessage = this.onWebViewMessage.bind(this);
    this.onReadModePressed = this.onReadModePressed.bind(this);
    this.onReloadPressed = this.onReloadPressed.bind(this);
    this.onShareClicked = this.onShareClicked.bind(this);
    this.backHandler = this.backHandler.bind(this);
    this.openWith = this.openWith.bind(this);
    this.state = {
      loading: true,
      loadedOnce: true,
      htmlData: '',
      url: null,
      showReaderMode: false,
      canGoBack: false,
      title: '',
    };
  }
  componentDidMount() {
    // BackAndroid.addEventListener('hardwareBackPress', this.backHandler);
  }
  componentWillUnmount() {
    //BackAndroid.removeEventListener('hardwareBackPress', this.backHandler);
  }
  backHandler = () => {
    if (this.state.canGoBack) {
      this.webView.goBack();
      return true;
    }
  };

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

  onBackPressed() {
    if (this.webView) {
      this.webView.goBack();
    }
  }

  onForwardPressed() {
    if (this.webView) {
      this.webView.goForward();
    }
  }

  onStopLoadingPressed() {
    if (this.webView) {
      this.webView.stopLoading();
    }
  }

  onWebViewMessage(event) {
    const data = event.nativeEvent.data;
    // const refined_data = makehtmlReadAble("<html>"+data+"</html>", this.state.url);
    if (__DEV__) {
      console.log('Webview refined data : ', data.length);
    }
    // this.setState({htmlData: makehtmlReadAble(data, this.state.url), showReaderMode: false})
  }

  _onNavigationStateChange(webViewState) {
    if (__DEV__) {
      console.log('webview : ', webViewState);
    }
    this.setState({
      url: webViewState.url,
      title: webViewState.title,
      canGoBack: webViewState.canGoBack,
    });
  }

  onReadModePressed() {
    this.props.navigation.navigate(SCREENS.ReaderView, {
      html: this.state.htmlData,
    });
  }

  onReloadPressed() {
    if (this.webView) {
      this.webView.reload();
    }
  }

  onShareClicked() {
    const message = {title: this.state.title, message: this.state.url};
    const options = {dialogTitle: 'Share'};
    Share.share(message, options);
  }

  openWith() {
    Communications.web(this.state.url);
  }

  render() {
    const {source, site_title, ...otherProps} = this.props;
    if (__DEV__) {
      console.log('portals header props ::', this.props);
    }
    const {loadedOnce, loading} = this.state;
    const jsCode =
      " setTimeout(function(){ window.postMessage(document.getElementsByTagName('html')[0].innerHTML, '*'); },100); ";
    return (
      <View style={globalStyles.container}>
        {/*<View style={{flexDirection: 'row'}}>*/}
        {/*<Button title={"<="} onPress={this.onBackPressed}/>*/}
        {/*<Button title={"=>"} onPress={this.onForwardPressed}/>*/}
        {/*{this.state.loading ?*/}
        {/*<Button title={"stop"} onPress={this.onStopLoadingPressed}/> :*/}
        {/*<Button title={"reload"} onPress={this.onReloadPressed}/>*/}
        {/*}*/}
        {/*<Button title={"share"} onPress={this.onShareClicked}/>*/}
        {/*<Button title={"OpenWith"} onPress={this.openWith}/>*/}

        {/*/!*{this.state.showReaderMode ?*!/*/}
        {/*/!*<ProtoTouchable onPress={this.onReadModePressed}>*!/*/}
        {/*/!*<ProtoText>Read</ProtoText>*!/*/}
        {/*/!*</ProtoTouchable> : <View/>}*!/*/}
        <PortalHeader
          onBackPressed={this.onBackPressed}
          onForwardPressed={this.onForwardPressed}
          onStopLoadingPressed={this.onStopLoadingPressed}
          onReloadPressed={this.onReloadPressed}
          onShareClicked={this.onShareClicked}
          openWith={this.openWith}
          loading={this.state.loading}
          link={this.state.url}
          title={site_title}
        />
        <WebView
          // onLoad={this.onWebViewLoad}
          ref={ref => (this.webView = ref)}
          source={source}
          injectedJavaScript={jsCode}
          onMessage={this.onWebViewMessage}
          onLoadStart={this.handleOnLoadStart}
          onLoadEnd={this.handleOnLoadEnd}
          onNavigationStateChange={this._onNavigationStateChange}
          {...otherProps}
        />
        {/*<CleanWebView*/}
        {/*html={this.state.htmlData}*/}
        {/*onCleaned={*/}
        {/*(readAbilityArticle) => {*/}
        {/*if (__DEV__) {*/}
        {/*console.log("Readability Article : ", readAbilityArticle.content);*/}
        {/*}*/}
        {/*}} onError={(error) => {*/}
        {/*if (__DEV__) {*/}
        {/*console.log("WebView : error : ", error);*/}
        {/*}*/}
        {/*}}/>*/}
      </View>
    );
  }
}

export default withNavigation(ProtoWebView);
