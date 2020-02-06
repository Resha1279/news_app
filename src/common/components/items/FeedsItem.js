import {Component} from 'react';
import React from 'react';
import {Text} from 'react-native';

export type FeedItem = {
  id: number,
  id_original: number,
  news_url: string,
  category: string,
  site_name: string,
  title: string,
  short_desc?: string,
  desc_original: string,
  desc_formatted?: string,
  desc_list: Array<string>,
  images?: Array<string>,
  thumb_url?: string,
  published_date?: string,
  created_date: Date,
  author?: string,
  tags: Array<string>,
  num_reads: number,
  ago: number,
  bookmarked: boolean,
};

class FeedsItem extends React.PureComponent {
  props: {item: FeedItem};

  constructor() {
    super();
  }

  render() {
    const {item, index} = this.props;
    return <Text>{`${index + 1} : ` + item.title}</Text>;
  }
}

export default FeedsItem;
