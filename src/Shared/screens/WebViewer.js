import React, {Component} from 'react';
import {View} from 'react-native';
import {globalStyles} from '../../common/styles';
import ProtoWebView from '../../common/containers/ProtoWebView';

class WebViewer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {link, title} = this.props.navigation.state.params;
    console.log('from web view :', link, title);

    return (
      <View style={globalStyles.container}>
        <ProtoWebView site_title={link} source={{uri: link}} />
      </View>
    );
  }
}

export default WebViewer;
