import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Platform,
  Alert,
  PermissionsAndroid,
  CameraRoll,
  DeviceEventEmitter,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Promise from 'bluebird';
import {showToast} from '../utils/toast';

const imageUrls = [
  {
    url:
      'https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg',
    id: 0,
  },
  {
    url:
      'https://wallpaperbrowse.com/media/images/3848765-wallpaper-images-download.jpg',
    id: 1,
  },
];

const requestWriteExternalStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    return granted;
  } catch (err) {
    return null;
  }
};

export const downloader = async () => {
  if (Platform.OS === 'android') {
    const granted = await requestWriteExternalStoragePermission();
    if (granted === PermissionsAndroid.RESULTS.DENIED) {
      return null;
    }
    if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      showToast('Permission denied');
      return null;
    }
  }
  // showToast("Download started");
  // console.log("sd card Dir : \n ", RNFetchBlob.fs.dirs.SDCardDir);
  const {dirs} = RNFetchBlob.fs;
  const imagesBaseDir =
    Platform.OS === 'android' ? dirs.PictureDir : dirs.DocumentDir;
  const imagesDir = `${imagesBaseDir}/protonews`;
  try {
    const imagesDirExists = await RNFetchBlob.fs.isDir(imagesDir);
    if (!imagesDirExists) {
      await RNFetchBlob.fs.mkdir(imagesDir);
    }
  } catch (err) {}
  await Promise.map(
    imageUrls,
    async data => {
      const fileName = data.url
        .split('/')
        .pop()
        .split('#')[0]
        .split('?')[0];

      try {
        let task = RNFetchBlob.config({
          path: `${imagesDir}/${fileName}`,
        })
          .fetch('GET', data.url, {})
          .progress((received, total) => {
            console.log(`id : ${data.id} : progress`, received / total);
          });
        const res = await task;
        const filePath = res.path();

        if (Platform.OS === 'ios') {
          // try {
          //     await CameraRoll.saveToCameraRoll(filePath);
          //     this.showToast(
          //         i18n.formatString(i18n.saveImageSuccess, fileName),
          //     );
          // } catch (err) {
          //     this.showToast(i18n.formatString(i18n.saveImageError, fileName));
          // }
        } else if (Platform.OS === 'android') {
          console.log('File name : ', fileName);
          console.log('File path : ', filePath);
          // showToast("Image saved , ", fileName);

          try {
            await RNFetchBlob.fs.scanFile([{path: filePath}]);
          } catch (err) {}
        }
      } catch (err) {
        // showToast("error occured");
      }
    },
    {concurrency: 3},
  );

  return null;
};
