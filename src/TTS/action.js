import Tts from 'react-native-tts';
import {ToastAndroid} from 'react-native';
import {__DEV__, TTS_LANG} from '../common/constants';
import {
  TTS,
  TTS_INITIALIZATION_INFO,
  TTS_LANG_INFO,
  TTS_START_ERROR,
} from './types';
import {
  DECREASE_COUNT,
  INCREASE_COUNT,
  MAKE_COUNT_ZERO,
  TTS_SPEECH_RATE_CHANGED,
} from '../Settings/types';

// initialized: false,
//     engine_available: false

export function initializeTTS() {
  return dispatch => {
    Tts.setDucking(true);
    Tts.getInitStatus()
      .then(() => {
        const data = {
          initialized: true,
          engine_available: true,
        };
        dispatch({type: TTS_INITIALIZATION_INFO, payload: data});
      })
      .catch(e => {
        if (e.code === 'no_engine') {
          const data = {
            initialized: false,
            engine_available: false,
          };
          dispatch({type: TTS_INITIALIZATION_INFO, payload: data});
        } else {
          dispatch({type: TTS_START_ERROR, payload: e});
        }
      });
  };
}

export function setTtsLanguage() {
  return dispatch => {
    Tts.setDefaultLanguage(TTS_LANG)
      .then(() => {
        if (__DEV__) {
          console.log('TTS lanuage set');
        }
      })
      .catch(e => {
        if (__DEV__) {
          console.log('TTS : Lang error :TTS : ', e);
        }
        // dispatch({type: TTS_ERROR_NO_ENGINE, payload: null})
      });
  };
}

export function play(item, index) {
  return (dispatch, getState) => {
    Tts.stop();
    const {error} = getState().tts.initialization_status;
    if (error) {
      ToastAndroid.show(
        'Please restart the app and try again .',
        ToastAndroid.SHORT,
      );
    }
    dispatch({type: TTS.PLAY, payload: item});
    for (let i = index; i < item['desc_list'].length; i++) {
      Tts.speak(item['desc_list'][i]);
    }
  };
}

export function playSuccess() {
  return {type: TTS.PLAY_SUCCESS, payload: {}};
}

export function playFinished() {
  return {type: TTS.PLAY_FINISHED, payload: {}};
}

export function pause() {
  Tts.stop();
  return {type: TTS.PAUSE, payload: {}};
}

export function progress(text, index) {
  return {type: TTS.PROGRESS, payload: {text, index}};
}

export function stopTTs() {
  Tts.stop();
  return {type: TTS.STOP, payload: {}};
}

export function setSpeechRate(rate) {
  return {type: TTS_SPEECH_RATE_CHANGED, payload: rate};
}

export function requestInstallEngine() {
  return dispatch => Tts.requestInstallEngine();
}

export function installLanguages() {
  return dispatch => Tts.requestInstallData();
}

export function listAvailableLanguages() {
  Tts.voices().then(voices => console.log('Voices : ', voices));
}

export function increaseCount() {
  return {type: INCREASE_COUNT, payload: {}};
}

export function decreaseCount() {
  return {type: DECREASE_COUNT, payload: {}};
}

export function makeCountZero() {
  return {type: MAKE_COUNT_ZERO, payload: {}};
}

// lang_available: false,
// lang_available_offline: false
export function checkLanguage() {
  return dispatch => {
    let voice = null;
    Tts.voices().then(voices => {
      voices.forEach(v => {
        if (v.language === TTS_LANG) {
          voice = v;
        }
      });
      let data = {};
      data['lang_available'] = !!voice;
      data['lang_available_offline'] = voice ? !voice.notInstalled : false;
      dispatch({type: TTS_LANG_INFO, payload: data});
    });
  };
}
