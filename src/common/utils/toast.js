import {DeviceEventEmitter} from 'react-native';
export function showToast(message) {
    DeviceEventEmitter.emit('showToast', message);
}

