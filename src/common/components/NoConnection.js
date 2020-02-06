import React from 'react';
import {StyleSheet, View, ActivityIndicator, Image} from 'react-native';
import connectLocalization from "../localization/connectLocalization";
import {Button, Text} from "react-native-elements";

import EStyleSheet from "react-native-extended-stylesheet";



class NoConnection extends React.PureComponent {
    props: {
        onRetry: () => {}
    };
    render() {
        const {retry} = this.props.i18n.extras;
        const {onRetry} = this.props;
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{uri: 'no_connection'}}
                />
                {onRetry ? <Button title={retry} onPress={onRetry}/> : <View/>}
            </View>
        );
    }
}

export default connectLocalization(NoConnection);

const styles = EStyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 250,
        width: '80%',
        resizeMode: 'contain'
    },
    caption: {
        color: '$primaryTextColor',
        fontWeight: '600'
    }
});

