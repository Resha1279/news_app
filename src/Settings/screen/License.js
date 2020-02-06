import React from 'react';
import firebase from 'react-native-firebase';
import {__DEV__} from '../../common/constants/index';
import LicenseItem from '../../common/components/items/LicenseItem';
import {objectToList} from '../../common/utils/index';
import {View} from 'react-native';
import {globalStyles} from '../../common/styles/index';

export type license_item = {
  id: string,
  title: string,
  author: string,
  image_url: string,
  site_link: string,
};

class License extends React.Component {
  static navigationOptions = ({navigation, screenProps: {i18n}}) => ({
    title: i18n.extras.license,
  });

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    let ref = firebase.firestore().collection('license');

    ref
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          let final_data = {};
          querySnapshot.forEach(item => {
            const data_item = item.data();
            final_data[data_item['id']] = data_item;
          });
          this.setState({items: objectToList(final_data)});
        }
      })
      .catch(error => {
        if (__DEV__) {
          console.log('Error : ', error);
        }
      });
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={[globalStyles.container]}>
        {this.state.items.map(item => {
          return (
            <LicenseItem key={item.id} data={item} navigation={navigation} />
          );
        })}
      </View>
    );
  }
}

export default License;
