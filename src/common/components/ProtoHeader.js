import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, Platform, SafeAreaView } from 'react-native';
import {withNavigation } from 'react-navigation';
import {HeaderBackButton} from 'react-navigation-stack';
import { globalStyleVariables } from '../styles';

const styles = StyleSheet.create({
  containerShadow: {
    ...Platform.select({
      ios: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0, 0, 0, .3)',
      },
      android: {
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
          height: StyleSheet.hairlineWidth,
        },
        elevation: 4,
      },
    }),
  },
  containerDark: {
    backgroundColor: globalStyleVariables.PRIMARY_COLOR,
  },
  absolutePosition: {
    position: 'absolute',
    // top: StatusBar.currentHeight || 0, // android only for use with translucent status bar
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height:
      globalStyleVariables.APPBAR_HEIGHT,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  subContainer: {
    ...Platform.select({
      ios: {
        paddingTop:
          parseInt(Platform.Version, 10) < 11
            ? globalStyleVariables.STATUSBAR_HEIGHT
            : 0,
      },
      android: {
        paddingTop: globalStyleVariables.STATUSBAR_HEIGHT,
        height:
          globalStyleVariables.STATUSBAR_HEIGHT
          // globalStyleVariables.APPBAR_HEIGHT,
      },
    }),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

class ProtoHeader extends Component {
  static propTypes = {
    onPressBackButton: PropTypes.func,
    showMenuButton: PropTypes.bool,
    showBackButton: PropTypes.bool,
    headerTitle: PropTypes.element,
    headerRight: PropTypes.element,
    darkTheme: PropTypes.bool,
    withShadow: PropTypes.bool,
  };

  static defaultProps = {
    onPressBackButton: null,
    showMenuButton: false,
    showBackButton: false,
    headerTitle: null,
    headerRight: null,
    darkTheme: false,
    withShadow: true,
  };

  handleOnPressBackButton = () => {
    const { onPressBackButton, navigation: { goBack } } = this.props;
    if (onPressBackButton) {
      onPressBackButton();
    } else {
      goBack();
    }
  };

  render() {
    const {
      showBackButton,
      headerTitle,
      headerRight,
      darkTheme,
      absolutePosition,
      withShadow,
    } = this.props;
    return (
      <SafeAreaView
        style={[
          darkTheme && styles.containerDark,
          absolutePosition && styles.absolutePosition,
          withShadow && styles.containerShadow,
        ]}
      >
        <View style={styles.subContainer}>
          {showBackButton &&
            <HeaderBackButton
              onPress={this.handleOnPressBackButton}
              tintColor= '#fff'
            />}
          {headerTitle}
          {/*{headerRight}*/}
        </View>
      </SafeAreaView>
    );
  }
}

export default withNavigation(ProtoHeader);
