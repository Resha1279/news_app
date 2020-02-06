import React from 'react';
import {connect} from 'react-redux';
import {Modal, View} from 'react-native';
import {
  checkLanguage,
  initializeTTS,
  play,
  playSuccess,
  pause,
  progress,
  setTtsLanguage,
  playFinished,
  stopTTs,
  increaseCount,
  decreaseCount,
  makeCountZero,
} from '../action';
import {Button, Text} from 'react-native-elements';
import Tts from 'react-native-tts';
import {__DEV__, SCREENS} from '../../common/constants';
import ProtoTouchable from '../../common/components/ProtoTouchable';
import {globalStyles} from '../../common/styles';
import Icon from '../../common/components/Icon';
import {
  BACKGROUND_COLOR_WHITE,
  SECONDARY_TEXT_COLOR,
  BACKGROUND_COLOR,
  TERTIARY_TEXT_COLOR,
} from '../../common/styles/variables';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';
import NavigationService from '../../common/navigators/helpers/NavigationService';
import {
  articleViewOpen,
  feedsItemPlay,
  tts_error,
} from '../../common/utils/analytics';
import {getCurrentRoute, getCurrentTabRoute} from '../../Settings/selector';

// tts exceptions

const NO_ENGINE = 'no_engine';
const UPDATE_REQUIRED = 'update_required';
const LANG_DOWNLOAD_REQUIRED = 'lang_download_required';

class TtsComponent extends React.Component {
  constructor() {
    super();
    this.ttsInitialSetup = this.ttsInitialSetup.bind(this);
    this.play = this.play.bind(this);
    this.playOrPause = this.playOrPause.bind(this);
    this.stop = this.stop.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.handleOnModalClose = this.handleOnModalClose.bind(this);
    this.renderTTSExceptionsModal = this.renderTTSExceptionsModal.bind(this);
    this.onTtsComponentClicked = this.onTtsComponentClicked.bind(this);
    this.state = {
      show_modal: false,
      error_type: null,
    };
  }

  componentWillMount() {
    this.ttsInitialSetup();
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (this.props.tts.playing_item && nextProps.tts.playing_item) {
      const {
        playing_item: {id: prevId},
      } = this.props.tts;
      const {
        playing_item: {id},
      } = nextProps.tts;
      if (prevId !== id) {
        this.count = 0;
        this.props.makeCountZero();
      }
    }
    if (nextProps.tts.is_playing) {
      const {
        lang_status: {lang_available, lang_available_offline},
        initialization_status: {engine_available},
      } = nextProps.tts;
      if (!engine_available) {
        this.setState({error_type: NO_ENGINE, show_modal: true});
      } else if (engine_available && !lang_available) {
        this.setState({error_type: UPDATE_REQUIRED, show_modal: true});
      } else if (lang_available && !lang_available_offline) {
        this.setState({error_type: LANG_DOWNLOAD_REQUIRED, show_modal: true});
      } else {
        this.setState({show_modal: false});
      }
    }
  }

  handleOnModalClose() {
    this.setState({show_modal: false});
  }

  installLanguageData() {
    const text = 'Install Nepali Language';
    return (
      <View>
        <Text>{text + ' TTS Engine'}</Text>
        <Button title={text} onPress={this.installTtsLanguage} />
      </View>
    );
  }

  updateOrInstallEngine(isInstall) {
    const text = isInstall ? 'Install' : 'Update';
    return (
      <View>
        <Text>{text + ' TTS Engine'}</Text>
        <Button title={text} onPress={this.openTtsInGooglePlay} />
      </View>
    );
  }

  openTtsInGooglePlay() {
    Tts.requestInstallEngine();
  }

  installTtsLanguage() {
    Tts.requestInstallData();
  }

  exceptionRenderCondition() {
    const {play_status, is_playing} = this.props.tts;
    if (this.state.show_modal) {
      if (play_status !== 'stopped') {
        this.stop();
      }
    }
    if (this.state.error_type) {
      // analytics
      tts_error(this.state.error_type);
    }
    switch (this.state.error_type) {
      case NO_ENGINE:
        return this.updateOrInstallEngine(true);
      case LANG_DOWNLOAD_REQUIRED:
        return this.installLanguageData();
      case UPDATE_REQUIRED:
        return this.updateOrInstallEngine(false);
      default:
        return <View />;
    }
  }

  renderTTSExceptionsModal() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.show_modal}
        onRequestClose={this.handleOnModalClose}>
        <View>{this.exceptionRenderCondition()}</View>
      </Modal>
    );
  }

  renderActionButtons(icon, onClick, current_route) {
    let viewbox;
    if (icon === 'next' || icon === 'previous') {
      viewbox = '0 0 21 12';
    } else if (icon === 'play') {
      viewbox = '0 0 14 16';
    } else {
      viewbox = '0 0 20 20';
    }
    return (
      <View style={globalStyles.roundButtonContainer}>
        <ProtoTouchable style={globalStyles.roundButton} onPress={onClick}>
          <Icon
            name={icon}
            height="20"
            width="20"
            viewBox={viewbox}
            fill={
              current_route === SCREENS.ArticleView
                ? BACKGROUND_COLOR_WHITE
                : SECONDARY_TEXT_COLOR
            }
          />
        </ProtoTouchable>
      </View>
    );
  }

  onTtsComponentClicked() {
    articleViewOpen('TTS');
    const {playing_item} = this.props.tts;
    if (playing_item) {
      NavigationService.navigate(SCREENS.ArticleView, {item: playing_item});
    }
  }

  render() {
    const {play_status, is_playing} = this.props.tts;
    const {current_route} = this.props;
    const button_title = play_status === 'playing' ? 'pause' : 'play';
    if (__DEV__) {
      console.log('TTS: props : ', this.props.tts);
      console.log('TTS component : props : ', this.props);
    }
    const darkMode = current_route === SCREENS.ArticleView;
    return (
      <View>
        {this.renderTTSExceptionsModal()}
        {is_playing ? (
          <ProtoTouchable
            style={[
              styles.ttsContainer,
              {
                backgroundColor:
                  current_route === SCREENS.ArticleView
                    ? SECONDARY_TEXT_COLOR
                    : BACKGROUND_COLOR_WHITE,
                borderTopColor:
                  current_route === SCREENS.ArticleView
                    ? 'rgba(255,255,255,0.1)'
                    : BACKGROUND_COLOR,
              },
            ]}
            onPress={this.onTtsComponentClicked}>
            <View style={styles.playerControl}>
              {this.renderActionButtons(
                'previous',
                this.previous,
                current_route,
              )}
              {this.renderActionButtons(
                button_title,
                this.playOrPause,
                current_route,
              )}
              {this.renderActionButtons('next', this.next, current_route)}
            </View>
            {this.renderActionButtons('close', this.stop, current_route)}

            {/*<Button title={button_title} onPress={this.playOrPause}/>*/}
            {/*<Button title={"Stop"} onPress={this.stop}/>*/}
            {/*<Button title={"Next"} onPress={this.next}/>*/}
            {/*<Button title={"Previous"} onPress={this.previous}/>*/}
          </ProtoTouchable>
        ) : (
          <View />
        )}
      </View>
    );
  }

  stop() {
    this.props.stopTTs();
  }

  playOrPause() {
    const {
      playing: {index},
      playing_item: item,
      play_status,
    } = this.props.tts;
    const for_analytics = {
      ...item['analytics_item'],
      from: 'TTS',
      play_status,
    };
    feedsItemPlay(for_analytics);
    if (play_status === 'playing') {
      this.pause();
    } else {
      this.play();
    }
  }

  pause() {
    this.props.pause();
  }

  play() {
    const {
      playing: {index},
      playing_item: item,
    } = this.props.tts;
    this.props.play(item, index);
  }

  next() {
    const {
      playing: {index},
      playing_item: item,
      count,
    } = this.props.tts;
    if (item.desc_list.length - 1 > index) {
      this.count++;
      this.props.play(item, count + 1);
      this.props.increaseCount();
    }
  }

  previous() {
    const {
      playing: {index},
      playing_item: item,
      count,
    } = this.props.tts;
    if (index > 0) {
      this.count--;
      this.props.play(item, count - 1);
      this.props.decreaseCount();
    }
  }

  ttsInitialSetup() {
    this.props.initializeTTS();
    this.props.checkLanguage();
    this.props.setTtsLanguage();
    const {
      playing: {index},
    } = this.props.tts;
    this.count = index;
    Tts.addEventListener('tts-start', event => {
      const {playing_item, count} = this.props.tts;

      if (playing_item) {
        this.props.progress(playing_item.desc_list[count], count);
        this.props.playSuccess();
      }
    });
    Tts.addEventListener('tts-finish', event => {
      const {playing_item, count} = this.props.tts;
      if (playing_item) {
        if (this.count === playing_item.desc_list.length - 1) {
          // playing last text in the list
          this.props.playFinished(playing_item.desc_list[0]);
          this.count = 0;
          this.props.makeCountZero();
        } else {
          this.props.increaseCount();
          this.count++;
        }
      }
    });
    Tts.addEventListener('tts-cancel', event => {});
    Tts.setDefaultRate(this.props.tts.speech_rate);
    // Tts.setDefaultPitch();
    // Tts.getInitStatus().then();
  }
}

const mapStateToProps = state => {
  return {tts: state.tts, current_route: getCurrentRoute(state)};
};

const mapDispatchToProps = {
  setTtsLanguage,
  initializeTTS,
  play,
  checkLanguage,
  playSuccess,
  pause,
  progress,
  playFinished,
  stopTTs,
  increaseCount,
  decreaseCount,
  makeCountZero,
};

TtsComponent.defaultProps = {
  tts: {
    playing_item: {
      desc_list: ['खबर शन्जाल', 'खबर शन्जाल', 'खबर शन्जाल', 'खबर शन्जाल'],
    },
  },
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TtsComponent);

function getTTSContainerStyle(darkMode = false) {
  if (darkMode) {
    return {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: SECONDARY_TEXT_COLOR,
      borderTopWidth: 1,
    };
  }
  return {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '$backgroundColorWhite',
    borderTopWidth: 1,
  };
}

const styles = EStyleSheet.create({
  ttsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '$backgroundColorWhite',
    borderTopColor: '$backgroundColor',
    borderTopWidth: 1,
  },
  playerControl: {
    // backgroundColor:'red',
    marginLeft: '20%',
    marginRight: '10%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
