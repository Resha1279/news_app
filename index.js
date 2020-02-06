/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {set_env_var} from './src/common/utils/environment_var_setup';
import Root from './src/App/screen/Root';
import {name as appName} from './app.json';

set_env_var();
AppRegistry.registerComponent(appName, () => Root);
