import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
} from 'react-native';

const ProtoTouchable = props => {
  if (Platform.OS === 'android') {
    const { style, children, ...otherProps } = props;
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        style={style}
        {...otherProps}
      >
        {children
          ? <View style={style}>
              {children}
            </View>
          : null}
      </TouchableNativeFeedback>
    );
  }

  return <TouchableOpacity {...props} />;
};

export default ProtoTouchable;
