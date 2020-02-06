import {Component} from 'react';
import React from 'react';
import PortalsList from '../../common/containers/PortalsList';
import {connect} from 'react-redux';
import {getPortalsByCategory} from '../action';
import {getPortalsOfCategory} from '../selectors';

class Portals extends Component {
  props: {
    category: {
      key: string,
      title: string,
      title_other: string,
    },
  };

  constructor() {
    super();
  }

  componentWillMount() {
    this.props.getPortalsByCategory(this.props.category);
  }

  render() {
    return <PortalsList data={this.props.data} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const data = getPortalsOfCategory(state, ownProps.category);
  return {data};
};

export default connect(
  mapStateToProps,
  {getPortalsByCategory},
)(Portals);
