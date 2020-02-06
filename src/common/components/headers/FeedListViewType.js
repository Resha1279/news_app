import {Component} from 'react';
import {connect} from 'react-redux';
import {
  feedListViewTypeChangeStart,
  feedListViewTypeChangeSuccess,
} from '../../../Settings/action';
import {
  getCurrentTabRoute,
  getFeedListViewType,
} from '../../../Settings/selector';
import {
  __DEV__,
  FEED_LIST_VIEW_TYPES,
  SCREENS,
  VIEW_TYPE_CHANGE_LOADING_TIME,
} from '../../constants';
import {Text} from 'react-native-elements';
import {Modal, View, TouchableHighlight, ToastAndroid} from 'react-native';
import React from 'react';
import ProtoTouchable from '../ProtoTouchable';

import Loading from '../Loading';

import {
  BACKGROUND_COLOR,
  BACKGROUND_COLOR_WHITE,
  HEADER_ICON,
  PRIMARY_COLOR,
  PRIMARY_TEXT_COLOR,
  SECONDARY_TEXT_COLOR,
  TERTIARY_TEXT_COLOR,
} from '../../styles/variables';
import Icon from '../Icon';
import {globalStyles} from '../../styles';
import IntroPager from '../../../Intro/screens/IntroPager';
import {feedsItemViewTypeChanged} from '../../utils/analytics';
import ProtoButton from '../ProtoButton';
import connectLocalization from '../../localization/connectLocalization';
import ProtoText from '../ProtoText';

class FeedListViewType extends React.Component {
  constructor() {
    super();
    this.feedListViewTypeChangeSuccess = this.feedListViewTypeChangeSuccess.bind(
      this,
    );
    this.state = {show_modal: false, loading: false};
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.showLoading = this.showLoading.bind(this);
    this.hideLoading = this.hideLoading.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      current_route: prevCurrentRoute,
      lang: prevLang,
      type: prevType,
    } = this.props;
    const {current_route, lang, type} = nextProps;
    const {show_modal: prevShowModal, loading: prevLoading} = this.state;
    const {show_modal, loading} = nextState;

    return (
      prevCurrentRoute !== current_route ||
      prevLang !== lang ||
      prevType !== type ||
      prevShowModal !== show_modal ||
      prevLoading !== loading
    );
  }

  hideModal() {
    this.setState({show_modal: false});
  }

  showModal() {
    this.setState({show_modal: true});
  }

  showLoading() {
    this.setState({loading: true});
  }

  hideLoading() {
    setTimeout(() => {
      this.setState({loading: false});
      this.hideModal();
    }, VIEW_TYPE_CHANGE_LOADING_TIME);
  }

  renderSelectionModal() {
    const {view_switch_modal} = this.props.i18n;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.show_modal}
        onRequestClose={this.hideModal}>
        <TouchableHighlight
          onPress={this.hideModal}
          underlayColor={'rgba(0,0,0,0.3)'}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'center',
          }}>
          <View
            style={[
              globalStyles.card,
              {height: this.state.loading ? 200 : null},
            ]}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
              }}>
              <ProtoText
                style={[
                  globalStyles.primaryText,
                  {
                    fontWeight: '500',
                  },
                ]}>
                {view_switch_modal.header}
              </ProtoText>
            </View>
            {this.state.loading ? (
              <Loading />
            ) : (
              <View>
                {FEED_LIST_VIEW_TYPES.map(type => {
                  return (
                    <ProtoTouchable key={type} onPress={this.onClick(type)}>
                      <View
                        style={{
                          backgroundColor: BACKGROUND_COLOR_WHITE,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: 10,
                          margin: 16,
                          borderBottomWidth: 1,
                          borderBottomColor: BACKGROUND_COLOR,
                        }}>
                        <ProtoText
                          style={[
                            globalStyles.secondaryText,
                            {
                              color: PRIMARY_TEXT_COLOR,
                              fontWeight: '500',
                            },
                          ]}>
                          {type.toUpperCase()}
                        </ProtoText>
                        <Icon
                          name={type}
                          height="30"
                          width="30"
                          viewBox="0 0 23 18"
                          fill={HEADER_ICON}
                        />
                      </View>
                    </ProtoTouchable>
                  );
                })}
              </View>
            )}
            {!this.state.loading ? (
              <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                <ProtoButton
                  backgroundColor="transparent"
                  tintColor={PRIMARY_COLOR}
                  onClick={this.hideModal}
                  label={view_switch_modal.cancel_button}
                  style={{
                    borderRadius: 0,
                    width: 120,
                    elevation: 0,
                    shadowOpacity: 0,
                    shadowRadius: 2,
                    shadowColor: '#000',
                    shadowOffset: {height: 2, width: 0},
                  }}
                />
              </View>
            ) : (
              <View />
            )}
          </View>
        </TouchableHighlight>
      </Modal>
    );
  }

  render() {
    const {type} = this.props;
    const types = FEED_LIST_VIEW_TYPES;
    const {current_route} = this.props;
    if (__DEV__) {
      console.log('Feed List View Type : this.props : ', this.props);
    }
    if (
      current_route === SCREENS.Home ||
      current_route === SCREENS.Feeds ||
      current_route === SCREENS.Library
    ) {
      return (
        <View
          style={[globalStyles.container, {backgroundColor: 'transparent'}]}>
          {this.renderSelectionModal()}
          <View style={globalStyles.roundButtonContainer}>
            <ProtoTouchable
              onPress={this.showModal}
              style={globalStyles.roundButton}>
              <Icon
                name={type}
                height="20"
                width="20"
                viewBox="0 0 23 18"
                fill={HEADER_ICON}
              />
              {/*<Text>{types[1]}</Text>*/}
            </ProtoTouchable>
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  }

  onClick = type => () => {
    this.showLoading();
    this.hideLoading();
    feedsItemViewTypeChanged(type);
    window.requestAnimationFrame(() => {
      this.props.feedListViewTypeChangeStart(type);
      ToastAndroid.show(`Changed to ${type} view`, ToastAndroid.SHORT);
    });
  };

  feedListViewTypeChangeSuccess() {
    this.props.feedListViewTypeChangeSuccess();
  }
}

const mapDispatchToProps = {
  feedListViewTypeChangeSuccess,
  feedListViewTypeChangeStart,
};

const mapStateToProps = state => {
  return {
    type: getFeedListViewType(state),
    current_route: getCurrentTabRoute(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(connectLocalization(FeedListViewType));
