import {REHYDRATE} from "redux-persist";
import {DECREASE_COUNT, INCREASE_COUNT, MAKE_COUNT_ZERO, TTS_SPEECH_RATE_CHANGED} from "../Settings/types";
import {
    TTS, TTS_INITIALIZATION_INFO, TTS_INITIALIZATION_START, TTS_INITIALIZATION_STOP, TTS_LANG_INFO,
    TTS_START_ERROR
} from "./types";

const INITIAL_STATE = {
    // is_loading: true,
    lang_status: {
        lang_available: false,
        lang_available_offline: false
    },
    is_playing: false,
    is_speaking: false,
    playing_item: null, // feed item
    play_status: null, // "playing"||"paused"||"stopped"||"loading"||"finished",
    playing: {
        text: null, // string
        index: 0
    },
    initialization_status: {
        initialized: false,
        engine_available: false,
        error: false
    },
    speech_rate: 0.6, // scale of 1
    count: 0

};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case TTS_SPEECH_RATE_CHANGED:
            return {...state, speech_rate: action.payload};
        case TTS_INITIALIZATION_START:
            return {...state, is_loading: true};
        case TTS_INITIALIZATION_STOP:
            return {...state, is_loading: false};
        case TTS_INITIALIZATION_INFO:
            return {
                ...state, initialization_status: {
                    initialized: action.payload.initialized,
                    engine_available: action.payload.engine_available,
                    error: false
                }
            };
        case TTS_START_ERROR: {
            return {
                ...state, initialization_status: {
                    ...state['initialization_status'],
                    error: true
                }
            };
        }
        case TTS_LANG_INFO:
            return {
                ...state, lang_status: {
                    lang_available: action.payload.lang_available,
                    lang_available_offline: action.payload.lang_available_offline
                }
            };
        case TTS.PLAY_START:
            return {
                ...state,
                play_status: "loading"
            };
        case TTS.PLAY_SUCCESS:
            return {
                ...state,
                is_speaking: true,
                play_status: "playing"
            };
        case TTS.PLAY_FINISHED:
            return {
                ...state,
                is_speaking: false,
                play_status: "finished",
                playing: {
                    text: action.payload.text, // string
                    index: 0
                },
            };
        case TTS.PLAY:
            return {
                ...state,
                is_playing: true,
                playing_item: action.payload, // feed item
                // play_status: "playing", // "playing"||"paused"||"stopped"||"",

            };
        case TTS.PROGRESS:
            return {
                ...state, playing: {
                    text: action.payload.text, // string
                    index: action.payload.index
                },
            };
        case TTS.PAUSE:
            return {
                ...state,
                is_speaking: false,
                play_status: "paused"
            };
        case TTS.STOP:
            return {
                ...state,
                is_speaking: false,
                is_playing: false,
                playing_item: null,
                play_status: "stopped",
                count: 0,
                playing: {
                    text: null, // string
                    index: 0
                },
            };
        case INCREASE_COUNT:
            return {...state, count: state.count + 1};
        case DECREASE_COUNT:
            return {...state, count: state.count - 1};
        case MAKE_COUNT_ZERO:
            return {...state, count: 0};
        default:
            return state
    }
}
