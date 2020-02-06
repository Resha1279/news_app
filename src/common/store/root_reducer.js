import {combineReducers} from 'redux';
import SettingReducer from '../../Settings/reducer';
import FeedsReducer from '../../Feeds/reducer';
import ConstantsReducer from '../constants/remote_config/reducer';
import LibraryReducer from '../../Library/reducers';
import PortalsReducer from '../../Portals/reducer';
import ConnectivityReducer from '../utils/connectivity/reducer';
import TTSReducer from '../../TTS/reducer';

export default combineReducers({
  settings: SettingReducer,
  constants: ConstantsReducer,
  feeds: FeedsReducer,
  portals: PortalsReducer,
  library: LibraryReducer,
  connectivity: ConnectivityReducer,
  tts: TTSReducer,
});
