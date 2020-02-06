import {createSelector} from 'reselect';
import _ from 'lodash';

const getMembers = state => state.constants.members;
const constants = state => state.constants;
export const getMembersList = createSelector(
  [getMembers],
  members => {
    let final_list = [];
    _.map(members.items, (data, uid) => {
      final_list.push(data);
    });
    final_list = final_list.sort((a, b) => {
      return a.order - b.order;
    });
    return {...members, items: final_list};
  },
);

export const getConstants = createSelector(
  [constants],
  constants => {
    return constants.constants;
  },
);
