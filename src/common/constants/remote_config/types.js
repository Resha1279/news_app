import {defineAction} from 'redux-define';
import {FAILURE, FETCH, SUCCESS} from '../stateConstants';

const appNameSpace = defineAction('PROTONEWS');

export const REMOTE_CONFIG = defineAction(
  'REMOTE_CONFIG',
  [FETCH, SUCCESS, FAILURE],
  appNameSpace,
);
