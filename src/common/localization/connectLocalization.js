import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';

const connectLocalization = WrappedComponent => {
  class Localization extends Component {
    static contextTypes = {
      i18n: PropTypes.object.isRequired,
    };

    render() {
      const {innerRef} = this.props;
      const {i18n} = this.context;
      return <WrappedComponent {...this.props} i18n={i18n} ref={innerRef} />;
    }
  }

  hoistNonReactStatic(Localization, WrappedComponent);

  return connect(state => ({
    lang: state.settings.language,
  }))(Localization);
};
export default connectLocalization;
