import {
  MEMBERS_RECEIVE,
  MEMBERS_RECEIVE_ERROR,
  MEMBERS_RECEIVE_SUCCESS,
  USER_LOGGED_IN,
  USER_TOKEN_ID_RECEIVED,
} from '../../auth/types';
import {REMOTE_CONFIG} from './types';
import {CONSTANTS} from './defaults';

const INITIAL_STATE = {
  token_id: null,
  user: null,
  constants: CONSTANTS,
  members: {
    loading: false,
    error: false,
    items: {},
  },
  remote_config: {is_loading: false, success: false, error: false},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_TOKEN_ID_RECEIVED:
      return {...state, token_id: action.payload};
    case USER_LOGGED_IN:
      return {...state, user: action.payload};
    case REMOTE_CONFIG.FETCH:
      return {
        ...state,
        remote_config: {is_loading: true, success: false, error: false},
      };
    case REMOTE_CONFIG.SUCCESS:
      return {
        ...state,
        remote_config: {is_loading: false, success: true, error: false},
        constants: action.payload,
      };
    case REMOTE_CONFIG.FAILURE:
      return {
        ...state,
        remote_config: {is_loading: false, success: false, error: true},
      };
    case MEMBERS_RECEIVE:
      return {
        ...state,
        members: {...state.members, loading: true, error: false},
      };
    case MEMBERS_RECEIVE_SUCCESS:
      return {
        ...state,
        members: {items: action.payload.items, loading: false, error: false},
      };
    case MEMBERS_RECEIVE_ERROR:
      return {
        ...state,
        members: {...state.members, error: true, loading: false},
      };
    default:
      return state;
  }
};
