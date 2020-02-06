import {withNativeAd} from "react-native-fbads";
import {Text} from "react-native-elements";
import React from "react";
import {View} from 'react-native';
import {__DEV__} from "../../constants";
import ProtoTouchable from "../../components/ProtoTouchable";
import ProtoText from "../../components/ProtoText";
import {globalStyles} from "../../styles";
import FastImage from "react-native-fast-image";
import EStyleSheet from "react-native-extended-stylesheet";
import {BACKGROUND_COLOR_WHITE, PRIMARY_COLOR} from "../../styles/variables";
import ProtoButton from "../../components/ProtoButton";

/*
*sample data
*
callToActionText:
"Install Now"
coverImage:"https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/E5W3BBFcz2Y.png"
description:"Your ad integration works. Woohoo!"
icon:"https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/HgxmyzKUI9r.png"
subtitle:"An ad for Facebook"
title:"Facebook Test Ad"

* */

class NativeFeedsDetailAds extends React.Component {


    componentWillMount() {

    }

    renderActionButtons(label, onPress) {
        return (
            <View style={{flex: 1}}>
                <ProtoTouchable
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopWidth: 1,
                        borderTopColor: '#eaeaea',
                        backgroundColor: '#fff',
                        height: 50,
                    }}


                >
                    <ProtoText style={[
                        globalStyles.secondaryText,
                        {
                            marginLeft: 10
                        }
                    ]}>
                        {label}
                    </ProtoText>
                </ProtoTouchable>
            </View>
        )
    }

    render() {
        if (__DEV__) {
            // console.log("Native feeds ads : render : props ", this.props);
        }
        const {title, subtitle, icon, coverImage, callToActionText, description} = this.props.nativeAd;
        return (
            <View style={[
                // globalStyles.card,
                styles.adContainer
            ]}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerContent}>
                        <FastImage
                            source={{uri: icon}}
                            style={styles.icon}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <View style={{alignItems: 'center', marginTop:16,}}>
                            {/*<Text>{title}</Text>*/}
                            <ProtoText
                                style={[
                                    globalStyles.secondaryText,
                                    styles.title,
                                    {textAlign:'center'}
                                ]}
                            >
                                {title}
                            </ProtoText>
                            <ProtoText
                                style={[
                                    globalStyles.tertiaryText,
                                    {textAlign:'center'}
                                ]}>
                                {subtitle}
                            </ProtoText>
                        </View>
                    </View>
                </View>
                <FastImage
                    source={{uri: coverImage}}
                    style={styles.coverImage}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <View>
                    <ProtoText
                        style={[
                            globalStyles.secondaryText,
                            styles.description,
                            {alignSelf:'center', textAlign:'center'}
                        ]}
                    >
                        {description}
                    </ProtoText>
                    <ProtoButton
                        backgroundColor={PRIMARY_COLOR}
                        tintColor={BACKGROUND_COLOR_WHITE}
                        style={{
                            borderRadius: 20,
                            width: 100,
                            alignSelf:'center',
                            elevation: 3,
                            shadowOpacity: 0,
                            shadowRadius: 2,
                            shadowColor: '#000',
                            shadowOffset: {height: 2, width: 0}
                        }}
                        // iconName='visitSite'
                        label={callToActionText}

                        // onClick={this.onVisitSiteClicked}
                    />
                </View>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    adsContainer:{
        flex:1,
        backgroundColor:'$backgroundColor',
        justifyContent:'center',
    },
    headerContainer: {
        alignItems: 'center',
    },
    headerContent: {
        padding: 16,
        alignItems:'center',
        alignSelf:'center',
        // flexDirection: 'row'
    },
    sourceInfo: {
        marginLeft: 16,
        justifyContent: 'center',
    },
    icon: {
        height: 55,
        width: 55,
        borderRadius: 5,
    },
    coverImage: {
        height: 180,
        width: '100%'
    },
    title: {
        color: '$primaryTextColor'
    },
    actionButtons: {
        borderTopWidth: 1,
        borderTopColor: '$backgroundColor',
        flexDirection: 'row',
    },
    description: {
        padding: 16,
    }
});

export default withNativeAd(NativeFeedsDetailAds);
