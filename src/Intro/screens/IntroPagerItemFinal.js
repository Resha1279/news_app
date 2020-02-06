import React from 'react';
import {View, ImageBackground, ScrollView} from 'react-native'
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

class IntroPagerItemFinal extends React.Component {
    render() {
        const {i18n} = this.props;
        const subLabel = 'Offline mode for reading your favourite articles anywhere.';

        return (
            <View style={{flex: 1}}>
                <ImageBackground source={{uri: 'intro_bg'}} style={styles.background}>
                    <View
                        style={{
                            height: 150,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ProtoText style={[globalStyles.primaryText, {
                            color: PRIMARY_TEXT_COLOR,
                            fontWeight: '500',
                            marginBottom: 8
                        }]}>
                            You are good to go!
                        </ProtoText>
                        <ProtoText style={[globalStyles.secondaryText, {lineHeight: 18}]}>
                            Happy Exploring
                        </ProtoText>
                    </View>
                    <ImageBackground source={{uri: 'rocket'}} style={styles.background}>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <View

                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                {this.renderButton("GET STARTED", BACKGROUND_COLOR_WHITE, PRIMARY_COLOR, true, this.props.skip)}
                            </View>
                        </View>
                    </ImageBackground>


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

                <Icon name={icon} height='60' width='60' viewBox='0 0 24 24' fill={PRIMARY_COLOR}/>
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
                    width: 150,
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

export default connectLocalization(IntroPagerItemFinal)
const styles = EStyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        // resizeMode: 'stretch',
        justifyContent: 'space-around',
    }
});