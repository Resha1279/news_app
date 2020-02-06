import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
//import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import {Button, Text} from 'react-native-elements';
import ProtoText from '../../common/components/ProtoText';
import {setAppOpened} from '../../Settings/action';
import {connect} from 'react-redux';
import {FeedItem} from '../components/items/feeds/DetailView';
import FeedsPagerItem from '../components/items/FeedsPagerItem';
import {withNavigation} from 'react-navigation';
import {SCREENS} from '../constants';
import {globalStyles} from '../styles';
//import equals from 'shallow-equals';

class ViewPagerIndicator extends React.PureComponent {
  props: {items: Array<FeedItem>};

  constructor(props) {
    super(props);
    this.index = 0;
    this.num_pages = 3;
  }

  // shouldComponentUpdate(nextProps) {
  //     const {items: prevItems} = this.props;
  //     const {items} = nextProps;
  //     return !equals(prevItems, items)
  // }

  render() {
    const {items} = this.props;
    this.num_pages = items.length;
    return (
      <View>
        <View style={[globalStyles.card, {overflow: 'hidden'}]}>
          {/* <IndicatorViewPager
            ref={pager => {
              this.pager = pager;
            }}
            style={{height: 300}}
            indicator={<PagerDotIndicator pageCount={this.num_pages} />}
            onPageSelected={({position}) => {
              this.index = position;
            }}>
            {items.map(item => {
              if (item) {
                return (
                  <View key={item.id} style={globalStyles.container}>
                    <FeedsPagerItem
                      item={item}
                      onPress={this.onItemClicked(item)}
                    />
                  </View>
                );
              }
            })}
          </IndicatorViewPager> */}
        </View>
      </View>
    );
  }

  onItemClicked = item => () => {
    let {items} = this.props;
    let index = items.indexOf(item);
    this.props.navigation.navigate(SCREENS.FeedsDetail, {item, index, items});
  };

  onNextClicked() {
    if (this.index !== this.num_pages) {
      this.pager.setPage(this.index + 1);
      if (__DEV__) {
        console.log('on next success');
      }
    }
  }

  _renderDotIndicator() {
    // return <PagerDotIndicator pageCount={this.num_pages} />;
  }
}

export default withNavigation(ViewPagerIndicator);
