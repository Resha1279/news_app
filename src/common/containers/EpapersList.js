import {Component} from 'react';
import React from 'react';
import {Text} from 'react-native';
import {__DEV__} from '../constants';

export type Item = {
  key: string, // route name
  title: string, // english title
  title_other: string, // nepali title
};

class EpapersList extends Component {
  props: {
    item: Item,
  };

  constructor() {
    super();
  }

  render() {
    const {item} = this.props;
    if (__DEV__) {
      console.log('Item epapers list : ', item);
    }
    return <Text>{item.title}</Text>;
  }
}

export default EpapersList;
