import {defineAction} from 'redux-define';

const appNameSpace = defineAction('PROTONEWS');

export const TTS = defineAction(
  'LANGUAGE_SELECT',
  [
    'PLAY',
    'PAUSE',
    'STOP',
    'PROGRESS',
    'PLAY_START',
    'PLAY_SUCCESS',
    'PLAY_FINISHED',
  ],
  appNameSpace,
);

export const TTS_LANG_INFO = 'TTS_LANG_INFO';
export const TTS_INITIALIZATION_INFO = 'TTS_INITIALIZATION_INFO';
export const TTS_INITIALIZATION_START = 'TTS_INITIALIZATION_START';
export const TTS_INITIALIZATION_STOP = 'TTS_INITIALIZATION_STOP';
export const TTS_START_ERROR = 'TTS_TTS_ERROR';
