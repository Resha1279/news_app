import {Component} from 'react';
import React from 'react';
import {
  PixelRatio,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import connectLocalization from '../../common/localization/connectLocalization';
import {connect} from 'react-redux';
import {__DEV__} from '../../common/constants';
import {zoomInText, zoomOutText} from '../../Settings/action';
import {getFontSize} from '../../Settings/selector';
import EStyleSheet from 'react-native-extended-stylesheet';
import ZoomButton from '../../common/components/ZoomButton';
import {makehtmlReadAble} from 'react-native-clean-webview';
import HTML from 'react-native-render-html';
import {play, pause} from '../../TTS/action';
import DetailHeaderArticleView from '../../common/components/headers/DetailHeaderArticleView';
import {bookmark, remove_bookmark} from '../../Library/action';
import ProtoArticleViewImage from '../../common/components/ProtoArticleViewImage';
import FastImage from 'react-native-fast-image';
import ProtoButton from '../../common/components/ProtoButton';
import {
  BACKGROUND_COLOR_WHITE,
  CARD_ON_PLAY,
} from '../../common/styles/variables';
import WebViewer from './WebViewer';
import CleanWebView from 'react-native-clean-webview';

function hiliter(word, element) {
  var rgxp = new RegExp(word, 'g');
  var repl = `<b class="highlightedText"> ` + word + '</b>';
  return element.replace(rgxp, repl);
}

class ReaderView extends Component {
  constructor() {
    super();
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.playOrPause = this.playOrPause.bind(this);
    this.isPlaying = this.isPlaying.bind(this);
    this.getPlayOrPause = this.getPlayOrPause.bind(this);
    this.onBookmarkPressed = this.onBookmarkPressed.bind(this);
  }

  componentWillMount() {
    let html = '';
    if (this.props.navigation) {
      html = this.props.navigation.state.params.html;
    }
    if (__DEV__) {
      console.log('Reader View : html ', html);
    }
    this.html = html;
  }

  zoomIn() {
    this.props.zoomInText();
  }

  zoomOut() {
    this.props.zoomOutText();
  }

  playOrPause() {
    const {play_status} = this.props.tts;
    if (this.isPlaying()) {
      if (play_status === 'playing') {
        this.pause();
      } else {
        this.play();
      }
    } else {
      this.play();
    }
  }

  pause() {
    this.props.pause();
  }

  play() {
    let item = {};
    if (this.props.navigation && this.props.navigation.state.params.item) {
      item = this.props.navigation.state.params.item;
    } else {
      item = this.props.item;
    }
    const isPlaying = this.isPlaying();
    if (isPlaying) {
      const {
        playing: {index},
        playing_item,
      } = this.props.tts;
      this.props.play(playing_item, index);
    } else {
      this.props.play(item, 0);
    }
  }

  isPlaying() {
    let item = {};
    if (this.props.navigation && this.props.navigation.state.params.item) {
      item = this.props.navigation.state.params.item;
    } else {
      item = this.props.item;
    }
    const {playing_item} = this.props.tts;
    if (playing_item) {
      return playing_item.id === item.id;
    }
    return false;
  }

  getPlayOrPause() {
    const {
      playing: {index},
      playing_item,
      play_status,
    } = this.props.tts;
    const pauseOrPlay = play_status === 'playing' ? 'Pause' : 'Play';
    if (this.isPlaying()) {
      return pauseOrPlay;
    }
    return 'Play';
  }

  onBookmarkPressed() {
    let item = null;
    if (this.props.navigation && this.props.navigation.state.params.item) {
      item = this.props.navigation.state.params.item;
    } else {
      item = this.props.item;
    }
    if (item) {
      item['bookmark_time'] = Date.now();
      if (!item.bookmarked) {
        item['bookmarked'] = true;
        this.props.bookmark(item);
      } else {
        item['bookmarked'] = false;
        this.props.remove_bookmark(item);
      }
    }
  }

  render() {
    const playOrPause = this.getPlayOrPause();
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            position: 'absolute',
            zIndex: 999,
            bottom: 0,
            right: 0,
          }}>
          <ZoomButton right={true} onClick={this.zoomIn} />
        </View>
        <View
          style={{
            position: 'absolute',
            zIndex: 999,
            bottom: 0,
            left: 0,
          }}>
          <ZoomButton right={false} onClick={this.zoomOut} />
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          <CleanWebView source={{html: this.html}} />
          {/*<HTML*/}
          {/*html={this.html}*/}
          {/*imagesMaxWidth={Dimensions.get('window').width}*/}
          {/*baseFontStyle={{fontSize: 16}}*/}
          {/*renderers={{*/}
          {/*img: (htmlAttribs, children, convertedCSSStyles, passProps) => {*/}
          {/*return (*/}
          {/*<ProtoArticleViewImage*/}
          {/*source={{uri: htmlAttribs.src}}*/}
          {/*style={{width: '100%', height: 250}}*/}
          {/*resizeMode={FastImage.resizeMode.contain}*/}
          {/*/>*/}
          {/*)*/}
          {/*}*/}
          {/*}}*/}
          {/*tagsStyles={{*/}
          {/*p:{color:BACKGROUND_COLOR_WHITE, margin:16, marginTop:0,lineHeight:32,},*/}
          {/*body:{margin:0,padding:0},*/}
          {/*}}*/}
          {/*classesStyles={{*/}
          {/*main:{backgroundColor:'#000', margin:0, padding:0},*/}
          {/*highlightedText:{backgroundColor:'rgba(255,255,0,0.2)', borderRadius:4,marginLeft:2,marignRight:2,marginBottom:4,borderBottomColor:'rgba(255,255,0.4)', borderBottomWidth:3}*/}
          {/*}}*/}
          {/*/>*/}
          <View style={styles.buttonVessel}>
            <ProtoButton
              buttonWidth="50%"
              style={{backgroundColor: '#212121'}}
              iconName="logOut"
              label={this.props.i18n.button_labels.article_exit_button}
              tintColor={BACKGROUND_COLOR_WHITE}
              onClick={this.props.closeArticleView}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {fontSize: getFontSize(state), tts: state.tts};
};

export default connect(
  mapStateToProps,
  {zoomInText, zoomOutText, play, pause, bookmark, remove_bookmark},
)(connectLocalization(ReaderView));

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  materialButton: {
    backgroundColor: '#212121',
  },
  buttonVessel: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
