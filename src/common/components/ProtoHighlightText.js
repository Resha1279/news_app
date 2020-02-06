import React from 'react';
import Highlighter from 'react-native-highlight-words';
import {__DEV__} from "../constants";
import {Text} from "react-native";

const ProtoHighlightText = props => {
    const {style, children, searchWords, highlightStyle, ...otherProps} = props;
    if (__DEV__){
        console.log("ProtoHighlightText : props ", props);
    }
    const trimmed_children = children.trim();
    if (children&&trimmed_children !== ""&&trimmed_children!=="•"){
        return (
            <Highlighter
                highlightStyle={highlightStyle}
                searchWords={searchWords}
                textToHighlight={children}
                style={style}
                {...otherProps}
            />
        );
    }
    return (
        <Text
            style={style}
            {...otherProps}
        >{children}</Text>
    );

};

export default ProtoHighlightText;