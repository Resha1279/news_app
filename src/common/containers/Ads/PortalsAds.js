import {withNativeAd} from "react-native-fbads";
import {Text} from "react-native-elements";
import React from "react";
import {View} from 'react-native';
import {__DEV__} from "../../constants";
import {globalStyles} from "../../styles";
import EStyleSheet from "react-native-extended-stylesheet";
import FastImage from "react-native-fast-image";
import ProtoText from "../../components/ProtoText";
import ProtoTouchable from "../../components/ProtoTouchable";
import Icon from "../../components/Icon";
import {BACKGROUND_COLOR_WHITE, ICON_COLOR, PRIMARY_COLOR, TERTIARY_TEXT_COLOR} from "../../styles/variables";
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

class NativeFeedsAds extends React.Component {

    componentWillMount() {

    }
    render() {
        if (__DEV__) {
            // console.log("Native feeds ads : render : props ", this.props);
        }
        const {title, subtitle, icon, coverImage, callToActionText, description} = this.props.nativeAd;
        return (
            <View style={[
                styles.adContainer
            ]}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerContent}>
                        <FastImage
                            source={{uri: icon}}
                            style={styles.icon}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <View style = {{marginLeft:10,alignItems:'center'}}>
                            {/*<Text>{title}</Text>*/}
                            <ProtoText
                                style={[
                                    globalStyles.secondaryText,
                                    styles.title,
                                ]}
                            >
                                {title}
                            </ProtoText>
                            <ProtoText
                                style={[
                                    globalStyles.tertiaryText,
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
                        ]}
                    >
                        {description}
                    </ProtoText>
                    <ProtoButton
                        backgroundColor={BACKGROUND_COLOR_WHITE}
                        tintColor={PRIMARY_COLOR}
                        style={{
                            borderRadius: 0,
                            width: '100%',
                            // elevation: 3,
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

export default withNativeAd(NativeFeedsAds);

const styles = EStyleSheet.create({
    adContainer: {
        elevation: 0
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerContent: {
        padding: 16,
        flexDirection: 'row'
    },
    sourceInfo: {
        marginLeft: 16,
        justifyContent: 'center',
    },
    icon: {
        height: '$logoHeight',
        width: '$logoHeight',
        borderRadius: '$iconHeight / 2',
    },
    coverImage: {
        height: 180,
        width: '100%'
    },
    title: {
        color: '$primaryTextColor'
    },
    actionButtons:{
        borderTopWidth:1,
        borderTopColor:'$backgroundColor',
        flexDirection:'row',
    },
    description:{
        padding:16,
    }
});
// export default NativeFeedsAds;