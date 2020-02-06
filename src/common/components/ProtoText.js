import React from 'react';
import {
    Text
} from 'react-native';

const ProtoText = props => {
    const {style, children, ...otherProps} = props;
    return (
        <Text
            style={style}
            {...otherProps}
        >
            {children}
        </Text>
    );
};

export default ProtoText;