import React, {Component} from 'react';
import {Dimensions, View, ScrollView} from 'react-native';
//import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import {Button} from 'react-native-elements';
import ProtoText from '../../common/components/ProtoText';
import {setAppOpened} from '../../Settings/action';
import {connect} from 'react-redux';
import IntroPagerItemOne from './IntroPagerItemOne';
import IntroPagerItemTwo from './IntroPagerItemTwo';
import {BACKGROUND_COLOR_WHITE} from '../../common/styles/variables';
import IntroPagerItemFinal from './IntroPagerItemFinal';
import IntroPagerItemThree from './IntroPagerItemThree';
import IntroPagerItemFour from './IntroPagerItemFour';
import IntroPagerItemFive from './IntroPagerItemFive';
import ProtoViewPager from '../../common/containers/ProtoViewPager';
import {globalStyles as styles} from '../../common/styles/index';

const WIDTH = Dimensions.get('window').width;

class IntroPager extends Component {
  constructor(props) {
    super(props);
    this.onNextClicked = this.onNextClicked.bind(this);
    this.onIntroComplete = this.onIntroComplete.bind(this);
    this.handleOnViewPagerPageSelected = this.handleOnViewPagerPageSelected.bind(
      this,
    );
    this.state = {
      index: 0,
      items: [
        {
          id: 0,
          comp: (
            <IntroPagerItemOne
              next={this.onNextClicked}
              skip={this.onIntroComplete}
            />
          ),
        },
        {
          id: 1,
          comp: (
            <IntroPagerItemTwo
              next={this.onNextClicked}
              skip={this.onIntroComplete}
            />
          ),
        },
        {
          id: 2,
          comp: (
            <IntroPagerItemThree
              next={this.onNextClicked}
              skip={this.onIntroComplete}
            />
          ),
        },
        {
          id: 3,
          comp: (
            <IntroPagerItemFour
              next={this.onNextClicked}
              skip={this.onIntroComplete}
            />
          ),
        },
        {
          id: 4,
          comp: (
            <IntroPagerItemFive
              next={this.onNextClicked}
              skip={this.onIntroComplete}
            />
          ),
        },
        {
          id: 5,
          comp: (
            <IntroPagerItemFinal
              next={this.onNextClicked}
              skip={this.onIntroComplete}
            />
          ),
        },
      ],
    };
    this.index = 0;
    this.num_pages = 6;
  }

  componentWillMount() {}

  render() {
    const {closeModal} = this.props;
    return (
      <View style={{flex: 1}}>
        <ScrollView
          horizontal
          pagingEnabled
          ref={pager => {
            this.pager = pager;
          }}
          initialPage={0}
          style={{flex: 1}}
          // indicator={this._renderDotIndicator()}
          onPageSelected={event => {
            const {position} = event.nativeEvent;
            this.setState({index: position});
          }}>
          <View style={{flex: 1, backgroundColor: BACKGROUND_COLOR_WHITE, width:WIDTH}}>
            <IntroPagerItemOne
              next={this.onNextClicked}
              skip={this.onIntroComplete}
            />
          </View>

          <View style={{flex: 1, backgroundColor: BACKGROUND_COLOR_WHITE,width:WIDTH}}>
            <IntroPagerItemTwo
              next={this.onNextClicked}
              skip={this.onIntroComplete}
            />
          </View>

          <View style={{flex: 1, backgroundColor: BACKGROUND_COLOR_WHITE,width:WIDTH}}>
            <IntroPagerItemThree
              next={this.onNextClicked}
              skip={this.onIntroComplete}
            />
          </View>

          <View style={{flex: 1, backgroundColor: BACKGROUND_COLOR_WHITE,width:WIDTH}}>
            <IntroPagerItemFour
              next={this.onNextClicked}
              skip={this.onIntroComplete}
            />
          </View>

          <View style={{flex: 1, backgroundColor: BACKGROUND_COLOR_WHITE,width:WIDTH}}>
            <IntroPagerItemFive
              next={this.onNextClicked}
              skip={this.onIntroComplete}
            />
          </View>

          <View style={{flex: 1, backgroundColor: BACKGROUND_COLOR_WHITE,width:WIDTH}}>
            <IntroPagerItemFinal
              next={this.onNextClicked}
              skip={this.onIntroComplete}
            />
          </View>
        </ScrollView>

        {/*<ProtoViewPager*/}
        {/*items={this.state.items}*/}
        {/*keyExtractor={item => item.id}*/}
        {/*index={this.state.index}*/}
        {/*renderContent={this.renderContent}*/}
        {/*onPageSelected={this.handleOnViewPagerPageSelected}*/}
        {/*// onEndReached={this.handleOnListEndReached}*/}
        {/*/>*/}
      </View>
    );
  }

  renderContent = ({item, index}) => {
    return (
      <View style={styles.container} key={item.id}>
        {item.comp}
      </View>
    );
  };

  handleOnViewPagerPageSelected = index => {
    this.setState({index});
  };

  onIntroComplete() {
    this.props.closeModal();
    this.props.setAppOpened();
  }

  onNextClicked() {
    if (this.state.index !== this.num_pages) {
      this.pager.setPage(this.state.index + 1);
      this.setState({index: this.state.index + 1});
      // if (__DEV__) {
      //     console.log("on next success");
      // }
    }
    // console.log("On next clicked ", this.state);
    // if (this.state.index !== this.num_pages) {
    //     this.setState({index: this.state.index + 1})
    // }
  }

  //   _renderDotIndicator() {
  //     return <PagerDotIndicator pageCount={this.num_pages} />;
  //   }
}

export default connect(
  null,
  {setAppOpened},
)(IntroPager);
