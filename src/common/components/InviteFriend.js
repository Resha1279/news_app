import React from 'react';
import {View, Image, TouchableHighlight, Share, Clipboard, ToastAndroid, ScrollView} from 'react-native';
import ProtoTouchable from "./ProtoTouchable";
import {globalStyles} from "../styles";
import ProtoText from "./ProtoText";
import connectLocalization from "../localization/connectLocalization";
import EStyleSheet from "react-native-extended-stylesheet";
import Icon from "./Icon";
import {
    BACKGROUND_COLOR,
    BACKGROUND_COLOR_WHITE,
    PRIMARY_COLOR,
    SECONDARY_TEXT_COLOR,
    TERTIARY_TEXT_COLOR
} from "../styles/variables";
import {withNavigation} from "react-navigation";
import ProtoButton from "./ProtoButton";
import {showToast} from "../utils/toast";
import {inviteFriendsCopyToClipboardClicked, inviteFriendsShareClicked} from "../utils/analytics";
import {ANDROID_PACKAGE_NAME} from "../constants/index";

const app_link = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_NAME}&hl=en`;

class InviteFriend extends React.Component {
    props:{
      hideModal:()=>{}
    };
    constructor() {
        super();
        this.onInviteClicked = this.onInviteClicked.bind(this);
        this.onCopyClicked = this.onCopyClicked.bind(this);
    }

    onInviteClicked() {
        // analytics
        inviteFriendsShareClicked();

        const {invite_friend_modal} = this.props.i18n;
        Share.share({
            message: `${invite_friend_modal.share_message}\n \n${app_link}`,
            title: 'Khabar Sanjal : Latest news, E-papers and Portals'
        }, {dialogTitle: 'Invite Friends'})
    }

    onCopyClicked() {
        // analytics
        inviteFriendsCopyToClipboardClicked();

        const {invite_friend_modal} = this.props.i18n;
        Clipboard.setString(app_link);
        ToastAndroid.show(invite_friend_modal.copied_to_clipboard_message, ToastAndroid.SHORT);
    }

    render() {
        const {invite_friend_modal} = this.props.i18n;
        return (
            <View style={[globalStyles.card, {padding: '4.5%', paddingBottom: 0}]}>
                <View style={[globalStyles.roundButtonContainer, {position: 'absolute', right: 0}]}>
                    <ProtoTouchable style={[globalStyles.roundButton]} onPress={this.props.hideModal}>
                        <Icon name='close' height='16' width='16' viewBox='0 0 16 16'
                              fill={PRIMARY_COLOR}/>
                    </ProtoTouchable>
                </View>

                <ProtoText
                    style={[globalStyles.primaryText, {alignSelf: 'center', fontWeight: '500'}]}>
                    {invite_friend_modal.header}
                </ProtoText>
                <Image
                    source={{uri: 'invite'}}
                    style={{
                        height: 300,
                        width: '100%',
                        resizeMode: 'contain'
                    }}
                >
                </Image>

                <ProtoText style={[globalStyles.secondaryText]}>
                    {invite_friend_modal.description}
                </ProtoText>
                <View
                    style=
                        {{
                            borderRadius: 4,
                            marginTop: 10,
                            backgroundColor: BACKGROUND_COLOR,
                            padding: 10,
                            // overflow: 'scroll'
                        }}
                >
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <ProtoText
                            style={[globalStyles.tertiaryText]}
                        >
                            {app_link}
                        </ProtoText>
                    </ScrollView>
                </View>
                <ProtoButton
                    backgroundColor='transparent'
                    tintColor={SECONDARY_TEXT_COLOR}
                    iconName='clipboard'
                    onClick={this.onCopyClicked}
                    label={invite_friend_modal.copy_to_clipboard_button}
                    style={{
                        borderRadius: 0,
                        // width: 120,
                        elevation: 0,
                        alignSelf: 'center',
                        shadowOpacity: 0,
                        shadowRadius: 2,
                        shadowColor: '#000',
                        shadowOffset: {height: 2, width: 0}
                    }}
                />
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <ProtoButton
                        backgroundColor='transparent'
                        tintColor={PRIMARY_COLOR}
                        onClick={this.props.hideModal}
                        label={invite_friend_modal.cancel_button}
                        style={{
                            borderRadius: 0,
                            width: 120,
                            elevation: 0,
                            shadowOpacity: 0,
                            shadowRadius: 2,
                            shadowColor: '#000',
                            shadowOffset: {height: 2, width: 0}
                        }}
                    />
                    <ProtoButton
                        backgroundColor={PRIMARY_COLOR}
                        tintColor={BACKGROUND_COLOR_WHITE}
                        onClick={this.onInviteClicked}
                        label={invite_friend_modal.send_invite_button}
                        style={{
                            borderRadius: 0,
                            width: 120,
                            elevation: 3,
                            shadowOpacity: 0.2,
                            shadowRadius: 2,
                            shadowColor: '#000',
                            shadowOffset: {height: 2, width: 0}
                        }}
                    />
                </View>
            </View>
        )
    }
}

export default connectLocalization(InviteFriend)

const styles = EStyleSheet.create({
    modalContainer: {
        flex: 1,
    }
});
