import firebase from 'react-native-firebase';
import {store} from '../../App/screen/Root';
import {__DEV__} from '../constants';

export let ads = {
  video_advert: null,
  interstitial_advert: null,
};
export function loadAdmobInterstitialAds(ADS_UNIT) {
  const advert = firebase.admob().interstitial(ADS_UNIT);

  const AdRequest = firebase.admob.AdRequest;
  const request = new AdRequest();
  request.addKeyword('blue');

  // Load the advert with our AdRequest
  advert.loadAd(request.build());
  ads['interstitial_advert'] = advert;
  return advert;
}

export function isShowInterstitialAds() {
  const interstitialAdsInterval = store.getState()['constants']['constants'][
    'interstitial_ads_interval'
  ];
  const interval_number = parseInt(interstitialAdsInterval);
  const number = Math.floor(Math.random() * 10);
  if (__DEV__) {
    console.log(
      'ads : isShowInterstitialAds : interval, number ',
      interval_number,
      number,
    );
  }
  return number % interval_number === 0;
}

export function isLoadInterstitialVideoAds() {
  const interstitialAdsInterval = store.getState()['constants']['constants'][
    'interstitial_video_ads_interval'
  ];
  const interval_number = parseInt(interstitialAdsInterval);
  const number = Math.floor(Math.random() * 10);
  if (__DEV__) {
    console.log(
      'ads : showInterstitialVideoAds : interval, number ',
      interval_number,
      number,
    );
  }
  return number % interval_number === 0;
}

export function loadAdmobVideoAds(ADS_UNIT) {
  const advert = firebase.admob().rewarded(ADS_UNIT);
  const AdRequest = firebase.admob.AdRequest;
  const request = new AdRequest();
  request.addKeyword('blue');

  // Load the advert with our AdRequest
  advert.loadAd(request.build());

  ads['video_advert'] = advert;
  return advert;
}
