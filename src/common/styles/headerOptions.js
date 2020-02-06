import {globalStyles} from "./index";
import React from "react";
import {View, Image, Modal} from 'react-native'
import {__DEV__, SCREENS} from "../constants";
import Icon from "../components/Icon";
import ProtoTouchable from "../components/ProtoTouchable";
import {
    HEADER_ICON,
    HEADER_BACKGROUND_COLOR,
    PRIMARY_COLOR,
    HEADER_TINT_COLOR,
    APPBAR_HEIGHT,
    APPBAR_ICON, PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR
} from "./variables";
import FeedListViewType from "../components/headers/FeedListViewType";
import ProtoText from "../components/ProtoText";

import {ads} from "../utils/ads";
import {inviteFriendsClicked, settingsClicked, showVideoAdsClicked} from "../utils/analytics";
import {showToast} from "../utils/toast";

import InviteFriend from "../components/InviteFriend";
import HeaderMainTitle from "../components/headers/HeaderMainTitle";


function onSettingsClicked(navigation) {
    // analytics
    settingsClicked();

    navigation.navigate(SCREENS.Settings);
}

function onInviteFriendsClicked(navigation, showInvite) {
    // analytics
    inviteFriendsClicked();

    showInvite();
    // navigation.setParams({show_invite_friends_modal: true})
}

function showVideoAds(navigation) {
    // analytics
    showVideoAdsClicked();

    if (ads['video_advert']) {
        let advert = ads['video_advert'];
        if (advert.isLoaded()) {
            advert.show();
        } else {
            if (__DEV__) {
                console.log("Video Ads : Not loaded")
            }
            showToast("Ads Not Loaded")
        }
    }
}

export const headerOptions = {

    // header options for main screens

    main: ({shadow}) => ({
        defaultNavigationOptions: ({navigation, screenProps: {i18n, showInvite}}) => ({
            headerTitleAllowFontScaling:false,
            headerStyle: {
                backgroundColor: HEADER_BACKGROUND_COLOR,
                height: APPBAR_HEIGHT,
                elevation: shadow ? 3 : 0,
            },
            headerTitleStyle: {
                color: HEADER_TINT_COLOR,
                fontSize: 14,
                textAlign: 'center',
                left: '100%'
            },
            headerLeft: (
                <View style={{flexDirection: 'row', alignItems: 'center',paddingLeft:16,}}>
                    {/*<Image source={{uri: 'tech_news_app_bar_icon'}} style={{height: 35, width: 35,}}/>*/}
                    <Icon name='appBarIcon'  height='24' width='26' viewBox='0 0 26 30' fill = {APPBAR_ICON}/>
                    <HeaderMainTitle/>
                </View>
            ),
            headerRight: (
                <View style={{flexDirection: 'row'}}>
                    <View style={globalStyles.roundButtonContainer}>
                        <FeedListViewType/>
                    </View>

                    {/*<View style={globalStyles.roundButtonContainer}>*/}
                        {/*<ProtoTouchable onPress={() => showVideoAds(navigation)} style={globalStyles.roundButton}>*/}
                            {/*<Icon name='gift' height='20' width='20' viewBox='0 0 20 20' fill={HEADER_ICON}/>*/}
                        {/*</ProtoTouchable>*/}
                    {/*</View>*/}

                    <View style={globalStyles.roundButtonContainer}>
                        <ProtoTouchable onPress={() => onInviteFriendsClicked(navigation,showInvite)}
                                        style={globalStyles.roundButton}>

                            <Icon name='invite' height='20' width='20' viewBox='0 0 13 20' fill={HEADER_ICON}/>
                        </ProtoTouchable>
                    </View>
                    <View style={globalStyles.roundButtonContainer}>
                        <ProtoTouchable onPress={() => onSettingsClicked(navigation)} style={globalStyles.roundButton}>
                            <Icon name='settings' height='20' width='20' viewBox='0 0 20 20' fill={HEADER_ICON}/>
                        </ProtoTouchable>
                    </View>


                </View>
            ),
            headerTintColor: HEADER_TINT_COLOR,
            headerBackTitle: null,
        }),
    }),
    // header options for common screens
    common: {
        defaultNavigationOptions: ({navigation, screenProps: {i18n}}) => ({

            headerTitleStyle: {
                color: HEADER_ICON,
                fontSize: 18
            },
            headerStyle: {
                backgroundColor: HEADER_BACKGROUND_COLOR,
                height: APPBAR_HEIGHT,
                elevation: 3,
            },
            headerTintColor: HEADER_TINT_COLOR,
            headerBackTitle: null,
        }),
        headerTitleAllowFontScaling:false,
        cardStyle: globalStyles.card,
        mode: 'card', // 'modal'
        headerMode: 'screen',
    }
};
