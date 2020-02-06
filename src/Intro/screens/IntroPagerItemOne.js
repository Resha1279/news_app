import React from 'react';
import {View, ImageBackground, ScrollView, Image} from 'react-native'
import {globalStyles} from "../../common/styles";
import {connect} from "react-redux";
import Icon from "../../common/components/Icon";
import {APPBAR_ICON, BACKGROUND_COLOR_WHITE, PRIMARY_COLOR, TERTIARY_TEXT_COLOR} from "../../common/styles/variables";
import RadioButtonContainer from "../../common/components/settings/RadioContainer";
import connectLocalization from "../../common/localization/connectLocalization";
import SettingsSwitch from "../../common/components/settings/SwitchContainer";
import ProtoTouchable from "../../common/components/ProtoTouchable";
import ProtoButton from "../../common/components/ProtoButton";
import EStyleSheet from "react-native-extended-stylesheet";
import ProtoText from "../../common/components/ProtoText";
import {selectLanguage, setLoadImageOnData} from "../../Settings/action";
import FastImage from "react-native-fast-image";

class IntroPagerItemOne extends React.Component {

    constructor(props) {
        super(props);
        this.changeLoadImageOnData = this.changeLoadImageOnData.bind(this)
    }

    changeLoadImageOnData() {
        const {settings} = this.props;
        this.props.setLoadImageOnData(!settings.load_image_on_data);
        return settings.load_image_on_data
    }

    render() {
        const {load_image_on_data, language} = this.props.settings;
        const {i18n} = this.props;
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
                        <Image source={{uri:"ic_launcher"}}/>
                        {/*<Icon name='appBarIcon' height='48' width='152' viewBox='0 0 76 24' fill={PRIMARY_COLOR}/>*/}
                        <ProtoText
                            style={[globalStyles.primaryText, {fontSize: 24, fontWeight: '600', marginTop: 10,}]}>
                            Welcome !
                        </ProtoText>
                    </View>

                    <View
                        style={{
                            justifyContent: 'space-around',
                        }}
                    >
                        <View style={{
                            // marginBottom:20,
                        }}>
                            {/*<RadioButtonContainer*/}
                                {/*selectLanguage={this.props.selectLanguage}*/}
                                {/*lang={language}*/}
                                {/*title={i18n.settings.language.title} // Title for the setting*/}
                                {/*subTitle={i18n.settings.language.desc} //Description for setting*/}
                            {/*/>*/}
                            <SettingsSwitch
                                title={i18n.settings.image_load_on_data.title} // Title for the setting
                                subTitle={i18n.settings.image_load_on_data.desc} //Description for setting
                                switchAction={this.changeLoadImageOnData} // Function for switch value change
                                switchDisabled={false} // If disabled user will not be able to toggle switch.
                                value={load_image_on_data} //Default value for the switch.
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            paddingBottom: 16,
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

const mapStateToProps = (state) => {
    return {settings: state.settings}
};

export default connect(mapStateToProps, {
    selectLanguage,
    setLoadImageOnData
})(connectLocalization(IntroPagerItemOne))
const styles = EStyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        // resizeMode: 'stretch',
        justifyContent: 'space-between'
    }
});
