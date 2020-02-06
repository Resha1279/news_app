import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {BACKGROUND_COLOR_WHITE, PRIMARY_COLOR} from "../styles/variables";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: BACKGROUND_COLOR_WHITE,
        justifyContent: 'center',
    },
    absolutePosition: {
        position: 'absolute',
        top: '50%',
        bottom: '50%',
        left: '50%',
        right: '50%',
    },
});

const Loader = ({absolutePosition, style}) =>
    <View
        style={[
            styles.container,
            absolutePosition && styles.absolutePosition,
            style,
        ]}
    >
        <ActivityIndicator size="large" color={PRIMARY_COLOR}/>
    </View>;

export default Loader;
