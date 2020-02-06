import {Component} from 'react';
import React from "react";
import {Button, View, Slider, ScrollView, Linking} from 'react-native';
import connectLocalization from "../../common/localization/connectLocalization";
import {connect} from "react-redux";
import {selectLanguage, setLoadImageOnData} from "../action";
import {MessageBarManager} from 'react-native-message-bar';
import Tts from "react-native-tts";
import {getTtsDataForSettings} from "../selector";
import {checkLanguage, initializeTTS, pause, setSpeechRate, stopTTs} from "../../TTS/action";
import SettingsSwitch from "../../common/components/settings/SwitchContainer";
import ProtoText from "../../common/components/ProtoText";
import {globalStyles} from "../../common/styles";
import ProtoTouchable from "../../common/components/ProtoTouchable";
import {
    BACKGROUND_COLOR_WHITE,
    PRIMARY_COLOR,
    PRIMARY_COLOR_TRANSPARENT, PRIMARY_TEXT_COLOR, SECONDARY_TEXT_SIZE,
    TERTIARY_TEXT_COLOR
} from "../../common/styles/variables";
import Icon from "../../common/components/Icon";
import EStyleSheet from "react-native-extended-stylesheet";
import RadioButtonContainer from "../../common/components/settings/RadioContainer";
import SettingsSlider from "../../common/components/settings/SliderContainer";
import SettingsFooter from "../../common/components/SettingsFooter";
import {__DEV__, ANDROID_PACKAGE_NAME, SCREENS} from "../../common/constants";
import {languageSwitchFromSettings} from "../../common/utils/analytics";


class Setting extends Component {

    static navigationOptions = ({navigation, screenProps: {i18n}})=>({
        headerTitle: i18n.settings.title,
    });

    constructor() {
        super();
        this.selectLanguage = this.selectLanguage.bind(this);
        this.changeLoadImageOnData = this.changeLoadImageOnData.bind(this);
        this.testVoice = this.testVoice.bind(this);
        this.downloadLanguage = this.downloadLanguage.bind(this);
        this.installEngine = this.installEngine.bind(this);
        this.renderTtsOptions = this.renderTtsOptions.bind(this);
        this.setSpeechRate = this.setSpeechRate.bind(this);
        this.renderSettingsCaption = this.renderSettingsCaption.bind(this);
        this.renderTouchableSettingsOptions = this.renderTouchableSettingsOptions.bind(this);
        this.onLicenseInfoClicked = this.onLicenseInfoClicked.bind(this);
        this.onAboutUsClicked = this.onAboutUsClicked.bind(this);
    }

    renderTouchableSettingsOptions(title, desc, onPress) {
        return (
            <ProtoTouchable style={styles.touchableButton} onPress={onPress}>
                <View style={styles.settingsLabel}>
                    <ProtoText style={styles.mainLabel}>{title}</ProtoText>
                    <ProtoText style={styles.subLabel}>{desc}</ProtoText>
                </View>
            </ProtoTouchable>
        )
    }

    onRateUsClicked(){
        Linking.openURL(`market://details?id=${ANDROID_PACKAGE_NAME}`);
    }

    onLicenseInfoClicked(){
        this.props.navigation.navigate(SCREENS.License);
    }

    onAboutUsClicked(){
        this.props.navigation.navigate(SCREENS.About);
    }

    renderSettingsCaption(icon, label) {
        let viewbox;
        if (icon === 'textToSpeech') {
            viewbox = '0 0 20 16'
        } else {
            viewbox = '0 0 20 20'
        }
        return (
            <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
                <Icon name={icon} height='20' width='20' viewBox={viewbox}
                      fill={PRIMARY_COLOR}/>
                <ProtoText style={{
                    fontSize: EStyleSheet.value('$secondaryTextSize'),
                    color: PRIMARY_TEXT_COLOR,
                    fontWeight: '500',
                    marginLeft: 16
                }}>
                    {label}
                </ProtoText>
            </View>
        )
    }

    render() {
        const {load_image_on_data,language} = this.props.settings;
        const {i18n} = this.props;
        const {rate, about_us, version,license_info} = this.props.i18n.settings.app_info;
        return (
            <ScrollView style={{flex: 1,}}>
                <View style={[globalStyles.card, {margin: 0, borderRadius: 0, marginBottom: 10}]}>

                    {this.renderSettingsCaption('settings', i18n.settings.caption.app_settings)}
                    {/*<RadioButtonContainer*/}
                        {/*selectLanguage={this.props.selectLanguage}*/}
                        {/*lang={language}*/}
                        {/*title={i18n.settings.language.title} // Title for the setting*/}
                        {/*subTitle={i18n.settings.language.desc} //Description for setting*/}
                    {/*/>*/}
                    <ProtoTouchable style={{backgroundColor: BACKGROUND_COLOR_WHITE}}
                                    onPress={this.changeLoadImageOnData}>
                        <SettingsSwitch
                            title={i18n.settings.image_load_on_data.title} // Title for the setting
                            subTitle={i18n.settings.image_load_on_data.desc} //Description for setting
                            switchAction={this.changeLoadImageOnData} // Function for switch value change
                            switchDisabled={false} // If disabled user will not be able to toggle switch.
                            value={load_image_on_data} //Default value for the switch.
                        />
                    </ProtoTouchable>

                    {/*<Button onPress={this.selectLanguage} title={this.props.i18n.switch_lang}/>*/}
                    {/*<Button onPress={this.showMessage} title={"show message bar "}/>*/}
                    {/*<Button onPress={this.changeLoadImageOnData}*/}
                    {/*title={`Change load image on data : ${load_image_on_data}`}/>*/}
                </View>

                <View style={[globalStyles.card, {margin: 0, borderRadius: 0, marginBottom: 10}]}>
                    {this.renderTtsOptions()}
                </View>
                <View style={[globalStyles.card, {margin: 0, borderRadius: 0, marginBottom: 10}]}>
                    {this.renderSettingsCaption('appInfo', i18n.settings.caption.app_info)}

                    {this.renderTouchableSettingsOptions(about_us.title, about_us.desc,this.onAboutUsClicked)}
                    {this.renderTouchableSettingsOptions(license_info.title, license_info.desc, this.onLicenseInfoClicked)}
                    {this.renderTouchableSettingsOptions(rate.title, rate.desc, this.onRateUsClicked)}
                    {this.renderTouchableSettingsOptions(version.title, version.desc)}
                    <SettingsFooter/>
                </View>
            </ScrollView>
        );
    }

    renderTtsOptions() {
        const {settings} = this.props.i18n;
        const {speech_rate, lang_status, initialization_status} = this.props.tts;
        return (
            <View style={{flex: 1,}}>
                {this.renderSettingsCaption('textToSpeech', settings.caption.tts_settings)}

                {this.renderTouchableSettingsOptions(settings.test_voice, settings.test_voice, this.testVoice)}
                {/*<Button title={settings.test_voice} onPress={this.testVoice}/>*/}

                {!initialization_status.engine_available || !lang_status.lang_available ?
                    this.renderTouchableSettingsOptions(settings.install_engine, settings.install_engine, this.installEngine)
                    // <Button title={settings.install_engine} onPress={this.installEngine}/>
                    : <View/>
                }
                {!lang_status.lang_available_offline ?
                    this.renderTouchableSettingsOptions(settings.download_language, settings.download_language, this.downloadLanguage)
                    // <Button title={settings.download_language} onPress={this.downloadLanguage}/>
                    : <View/>}
                <SettingsSlider
                    minimumValue={0.01}
                    maximumValue={0.99}
                    value={speech_rate}
                    onSlidingComplete={this.setSpeechRate}
                    title='Tts rate' // Title for the setting
                    subTitle='TTS rate desc' //Description for setting
                />
            </View>
        )
    }

    installEngine() {
        Tts.requestInstallEngine();
    }

    downloadLanguage() {
        Tts.requestInstallData();
    }

    setSpeechRate = async rate => {
        if (this.props.tts.is_playing) {
            this.props.pause();
        }
        await Tts.setDefaultRate(rate);
        this.props.setSpeechRate(rate);
    };


    testVoice() {
        this.props.initializeTTS();
        this.props.checkLanguage();
        const {settings} = this.props.i18n;
        if (this.props.tts.is_playing) {
            this.props.stopTTs();
        }
        Tts.stop();
        Tts.speak(settings.test_text);
    }


    changeLoadImageOnData() {
        const {settings} = this.props;
        this.props.setLoadImageOnData(!settings.load_image_on_data);
        return settings.load_image_on_data
    }

    showMessage() {
        MessageBarManager.showAlert({
            title: 'Your alert title goes here',
            message: 'Your alert message goes here',
            alertType: 'success',
            position: 'bottom',
            animationType: 'SlideFromLeft',
            shouldHideAfterDelay: true
        });
    }

    selectLanguage(value) {
        languageSwitchFromSettings();
        if (value === 1) {
            this.props.selectLanguage('ne');
        } else {
            this.props.selectLanguage('en');
        }

    }
}

const mapStateToProps = (state) => {
    return {settings: state.settings, tts: getTtsDataForSettings(state)}
};
export default connect(mapStateToProps,
    {
        selectLanguage,
        setLoadImageOnData,
        pause,
        stopTTs,
        setSpeechRate,
        checkLanguage,
        initializeTTS
    }
)(connectLocalization(Setting));

const styles = EStyleSheet.create({
    touchableButton: {
        backgroundColor: '$backgroundColorWhite',
        padding: 16,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '$backgroundColor',
        borderBottomWidth: 1,
    },
    mainLabel: {
        fontSize: '$secondaryTextSize',
        color: '$primaryTextColor',
        marginBottom: 7,
    },
    subLabel: {
        fontSize: '$tertiaryTextSize',
        color: '$tertiaryTextColor',
        marginBottom:10,
    },
});
