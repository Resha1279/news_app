import {connect} from 'react-redux';
import {
  getCurrentTabRoute,
  getFeedListViewType,
} from '../../../Settings/selector';
import React from 'react';
import ProtoText from '../ProtoText';
import {
  HEADER_ICON,
  PRIMARY_COLOR,
  PRIMARY_TEXT_COLOR,
  SECONDARY_TEXT_COLOR,
  TERTIARY_TEXT_COLOR,
} from '../../styles/variables';
import connectLocalization from '../../localization/connectLocalization';

class HeaderMainTitle extends React.Component {
  render() {
    const {current_route} = this.props;
    const {routes} = this.props.i18n;
    return (
      <ProtoText
        style={{
          fontSize: 18,
          fontWeight: '500',
          color: PRIMARY_COLOR,
          marginLeft: 10,
        }}>
        {routes[current_route]}
      </ProtoText>
    );
  }
}

const mapStateToProps = state => {
  return {current_route: getCurrentTabRoute(state)};
};

export default connect(mapStateToProps)(connectLocalization(HeaderMainTitle));
