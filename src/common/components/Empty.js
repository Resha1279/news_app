import React from 'react';
import {StyleSheet, View, ActivityIndicator, Image, Button} from 'react-native';
import connectLocalization from "../localization/connectLocalization";
import {Text} from "react-native-elements";
import Icon from "./Icon";
import EStyleSheet from "react-native-extended-stylesheet";
import FastImage from "react-native-fast-image";
import ProtoText from "./ProtoText";
import {globalStyles} from "../styles";


class Empty extends React.PureComponent {
    props: {
        image_name?: string,
        type: string,
        onRetry: () => {}
    };

    render() {
        const {empty_screen, extras: {retry}} = this.props.i18n;
        const {image_name, type, onRetry} = this.props;
        let title = "";
        let description = "";
        if (type) {
            const {caption, desc} = empty_screen[type];
            title = caption;
            description = desc;
        }
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{uri: image_name}}
                />
                {/*<Icon name = 'emptyContent' height='100' width='100' viewBox = '0 0 100 100' fill = 'rgba(0,0,0,0.6)'/>*/}
                {
                    type ?
                        <View style = {{width:'70%',alignItems: 'center', justifyContent:'center'}}>
                            <ProtoText style={[
                                globalStyles.secondaryText,
                                styles.caption
                            ]}>
                                {title.toUpperCase()}
                            </ProtoText>
                            <ProtoText style = {[globalStyles.tertiaryText,{
                                textAlign:'center'
                            }]}>{description}</ProtoText>
                        </View>
                        :
                        <View/>
                }
                {onRetry ? <Button title={retry} onPress={onRetry}/> : <View/>}
            </View>
        );
    }
}

export default connectLocalization(Empty);

const styles = EStyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '$backgroundColorWhite',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 250,
        width: '80%',
        resizeMode: 'contain'
    },
    caption: {
        textAlign:'center',
        color: '$primaryTextColor',
        fontWeight: '600',
        marginBottom:8,
    }
});

