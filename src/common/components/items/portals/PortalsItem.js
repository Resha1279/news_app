import {Component} from 'react';
import React from 'react';
import {View, Text, InteractionManager} from 'react-native';
import {connect} from 'react-redux';

import Loader from '../../Loader';
import ProtoTouchable from '../../ProtoTouchable';
import {globalStyles} from '../../../styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import FastImage from 'react-native-fast-image';
import ProtoText from '../../ProtoText';

export type PortalItem = {
  id: string,
  category: string,
  title: string,
  title_other: string,
  views: number,
  link: string,
  icon_url: string,
};

class PortalsItem extends Component {
  props: {
    item: PortalItem,
    index: number,
    onClick: () => {},
  };

  constructor() {
    super();
    this.state = {is_mounting: true};
  }

  componentWillMount() {}

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({is_mounting: false});
    });
  }

  render() {
    const {item} = this.props;
    if (this.state.is_mounting) {
      return (
        <View style={{flex: 1}}>
          <Loader />
        </View>
      );
    }
    let {icon_url, title} = item;
    // icon = 'https://www.onlinekhabar.com/wp-content/themes/oks/images/logo-new1.png';
    return (
      <View style={[globalStyles.container, styles.container]}>
        <ProtoTouchable
          style={[globalStyles.card, styles.portalsItemCard]}
          onPress={this.props.onClick}>
          {icon_url ? (
            <FastImage
              source={{uri: icon_url}}
              style={styles.icon}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            <View style={styles.noIcon} />
          )}
          {/*<ProtoText style = {[globalStyles.tertiaryText,styles.label]}>{title}</ProtoText>*/}
        </ProtoTouchable>
      </View>
    );
  }
}

export default PortalsItem;

const styles = EStyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingTop: 10,
    paddingRight: 5,
  },
  portalsItemCard: {
    // flexDirection:'row',
    padding: 16,
    height: 100,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    flex: 1,
    height: '$logoHeight',
    width: '100%',
    elevation: 4,
  },
  noIcon: {
    height: '$logoHeight',
    width: '$logoHeight',
    borderRadius: '$logoHeight/2',
    backgroundColor: '$backgroundColor',
  },
  label: {
    marginTop: 10,
    color: '$primaryTextColor',
  },
});
