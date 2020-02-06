import {Component} from 'react';
import React from 'react';
import {Text} from 'react-native';

export type EpaperListItem = {
  id: number,
  cover_img: string,
  thumbs: Array<string>,
  images: Array<string>,
  num_pages: number,
  name: string,
  name_np: string,
  date: Date,
  publication: string,
  type: string,
  num_reads: number,
};

class EpapersListItem extends React.PureComponent {
  constructor() {
    super();
  }

  render() {
    return <Text>Item</Text>;
  }
}

export default EpapersListItem;
