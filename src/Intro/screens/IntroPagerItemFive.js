import React from 'react';
import {View, ImageBackground, ScrollView, Image} from 'react-native'
import {globalStyles} from "../../common/styles";
import Icon from "../../common/components/Icon";
import {
    APPBAR_ICON,
    BACKGROUND_COLOR_WHITE,
    PRIMARY_COLOR, PRIMARY_TEXT_COLOR,
    PRIMARY_TEXT_SIZE,
    TERTIARY_TEXT_COLOR
} from "../../common/styles/variables";
import RadioButtonContainer from "../../common/components/settings/RadioContainer";
import connectLocalization from "../../common/localization/connectLocalization";
import SettingsSwitch from "../../common/components/settings/SwitchContainer";
import ProtoTouchable from "../../common/components/ProtoTouchable";
import ProtoButton from "../../common/components/ProtoButton";
import EStyleSheet from "react-native-extended-stylesheet";
import ProtoText from "../../common/components/ProtoText";

class IntroPagerItemThree extends React.Component {
    render() {
        const {i18n} = this.props;
        const subLabel = 'Offline mode for reading your favourite articles anywhere.';

        return (
            <View style={{flex: 1}}>
                <ImageBackground source={{uri: 'intro_bg'}} style={styles.background}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                        <Image source={{uri: 'social_media'}}
                               style={{height: 150, width: 150, resizeMode: 'contain', marginBottom: 16,}}/>
                        <ProtoText style={[globalStyles.primaryText, {
                            color: PRIMARY_TEXT_COLOR,
                            fontWeight: '500',
                            marginBottom: 8
                        }]}>
                            Instant Share
                        </ProtoText>
                        <ProtoText style={[globalStyles.secondaryText, {lineHeight: 18, textAlign:'center',width:'70%'}]}>
                            Share the hottest news among one of your favourite social media platforms.
                        </ProtoText>
                    </View>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            paddingBottom:16,
                        }}
                    >
                        <View

                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            {this.renderButton("SKIP", PRIMARY_COLOR, 'transparent', false, this.props.skip)}
                            {this.renderButton("NEXT", BACKGROUND_COLOR_WHITE, PRIMARY_COLOR, true, this.props.next)}
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    renderInfo(icon, label, subLabel) {
        return (
            <View
                style={{
                    marginLeft: 16,
                    marginRight: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: '10%',
                }}>

                <Image source={{uri: icon}} style={{height: 65, width: 65, resizeMode: 'contain'}}/>
                <View style={{
                    marginLeft: 16,
                    marginRight: 16,
                    width: '62%'
                }}>
                    <ProtoText style={[globalStyles.secondaryText, {
                        color: PRIMARY_TEXT_COLOR,
                        fontWeight: '500',
                        marginBottom: 8
                    }]}>
                        {label}
                    </ProtoText>
                    <ProtoText style={[globalStyles.tertiaryText, {lineHeight: 18}]}>
                        {subLabel}
                    </ProtoText>
                </View>
            </View>
        )

    }

    renderButton(label, tintColor, backgroundColor, elevation, onPress) {
        const {i18n} = this.props;
        return (
            <ProtoButton
                // buttonWidth={100}
                style={{
                    backgroundColor: backgroundColor,
                    borderRadius: 0,
                    width: 100,
                    elevation: elevation ? 3 : 0,
                    shadowOpacity: elevation ? 0.2 : 0,
                    shadowRadius: 2,
                    shadowColor: '#000',
                    shadowOffset: {height: 2, width: 0}
                }}
                // iconName='visitSite'
                label={label}
                tintColor={tintColor}
                onClick={onPress}
            />
        )
    }
}

export default connectLocalization(IntroPagerItemThree)
const styles = EStyleSheet.create({
    background: {
        flex:1,
        // resizeMode: 'stretch',
        justifyContent: 'space-around',
    }
});