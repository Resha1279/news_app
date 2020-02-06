import React from 'react';
import firebase from 'react-native-firebase';
import {__DEV__, ADS_PLACEMENT_IDS} from '../../../constants';

class RectangleBanner extends React.Component {
  constructor() {
    super();
    this.state = {ads_loaded: false};
  }

  componentWillMount() {
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    request.addKeyword('blue');
    this.request = request;
    this.ad_unit = ADS_PLACEMENT_IDS.test.admob.banner;
    if (process.env['NODE_ENV'] === 'production') {
      this.ad_unit = ADS_PLACEMENT_IDS.release.admob.banner;
    }
  }

  render() {
    const Banner = firebase.admob.Banner;
    return (
      <Banner
        unitId={this.ad_unit}
        size={'MEDIUM_RECTANGLE'}
        request={this.request.build()}
        onAdLoaded={() => {
          this.setState({ads_loaded: true});
        }}
        onAdFailedToLoad={e => {
          this.setState({ads_loaded: false});
        }}
      />
    );
  }
}

export default RectangleBanner;
