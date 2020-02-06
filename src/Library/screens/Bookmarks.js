import {Component} from 'react';
import React from 'react';
import {View, Text, InteractionManager, FlatList} from 'react-native';
import FeedsList from '../../common/containers/FeedsList';
import {getBookmarkedFeeds} from '../selector';
import {connect} from 'react-redux';
import Loader from '../../common/components/Loader';
import {__DEV__, SCREENS} from '../../common/constants';
import Empty from '../../common/components/Empty';
import {headerOptions} from '../../common/styles/headerOptions';
import {globalStyles} from '../../common/styles';
import {queryAllBookmarkLists} from '../../realm/bookmarks';

class Bookmarks extends Component {
  constructor() {
    super();
    this.state = {is_mounting: true, BookmarkLists: ''};

    //TODO: query bookmarks from realm

    queryAllBookmarkLists()
      .then(allBookmarkLists => {
        console.log(`Bookmarks: ${allBookmarkLists}`);
        this.setState({BookmarkLists: allBookmarkLists});
        console.log(`Bookmarks state: ${this.state.BookmarkLists}`);
      })
      .catch(error => {
        this.setState({BookmarkLists: []});
        console.log(`Bookmarks error: ${error}`);
      });
  }

  componentWillMount() {}

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({is_mounting: false});
    });
  }

  renderEmpty() {
    return <Empty image_name="no_bookmark_item" type={'bookmark'} />;
  }

  renderBookmarksList = item => {
    return (
      <View>
        <Text>bookmark from realm</Text>
        <Text>{item.title}</Text>
      </View>
    );
  };

  render() {
    if (this.state.is_mounting) {
      return (
        <View style={{flex: 1}}>
          <Loader />
        </View>
      );
    }
    if (__DEV__) {
      // console.log("PortalsCategory : props ", this.props);
    }

    const {data} = this.props;
    //const {data} = this.state.BookmarkLists;
    if (__DEV__) {
      console.log('Bookmarks.js : prpos : data ', data);
    }

    return (
      <View style={globalStyles.container}>
        <FlatList
          data={this.state.BookmarkLists}
          renderItem={({item}) => this.renderBookmarksList(item)}
          keyExtractor={item => item.id}
        />
        <FeedsList
          from={SCREENS.Bookmarks}
          data={data}
          renderEmpty={this.renderEmpty()}
          hideViews={true}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const data = getBookmarkedFeeds(state);
  return {data};
};

export default connect(
  mapStateToProps,
  {},
)(Bookmarks);
