import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {View} from 'react-native';

let radio_props = [
    {label: 'English', value: 0},
    {label: 'नेपाली', value: 1}
];
import React from 'react';
import {BACKGROUND_COLOR, PRIMARY_COLOR, PRIMARY_TEXT_COLOR} from "../../styles/variables";
import ProtoTouchable from "../ProtoTouchable";
import ProtoText from "../ProtoText";
import EStyleSheet from "react-native-extended-stylesheet";
import {selectLanguage} from "../../../Settings/action";
import {languageSwitchFromSettings} from "../../utils/analytics";
import {globalStyles} from "../../styles";

export default class RadioButtonContainer extends React.Component {
    constructor() {
        super();
        this.onEnglishClicked = this.onEnglishClicked.bind(this);
        this.onNepaliClicked = this.onNepaliClicked.bind(this);
        this.selectLanguage = this.selectLanguage.bind(this);
        this.state = {
            value: 0
        };
    }

    onNepaliClicked() {

        this.selectLanguage(1);
    }

    onEnglishClicked() {

        this.selectLanguage(0);
    }

    selectLanguage(value) {
        // analytics
        languageSwitchFromSettings();

        if (value === 1) {
            this.props.selectLanguage('ne');
        } else if (value === 0) {
            this.props.selectLanguage('en');
        }

    }

    render() {
        const {onClick, lang} = this.props;
        const value = lang === 'en' ? 0 : 1;
        return (
            <View style={styles.container}>
                <View style={styles.settingsLabel}>
                    <ProtoText style={styles.mainLabel}>{this.props.title}</ProtoText>
                    <ProtoText style={styles.subLabel}>{this.props.subTitle}</ProtoText>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', margin: 16,}}>
                    <ProtoTouchable
                        style={[
                            styles.radioButton,
                            {
                                backgroundColor: value === 0 ? PRIMARY_COLOR : BACKGROUND_COLOR,
                            }
                        ]}
                        onPress={this.onEnglishClicked}
                    >
                        <ProtoText style={[
                            globalStyles.tertiaryText,
                            {
                                color: value === 0 ? '#fff' : PRIMARY_TEXT_COLOR,
                            }
                        ]}>
                            English
                        </ProtoText>
                    </ProtoTouchable>

                    <ProtoTouchable
                        style={[
                            styles.radioButton,
                            {
                                backgroundColor: value === 0 ? BACKGROUND_COLOR : PRIMARY_COLOR,
                            }
                        ]}
                        onPress={this.onNepaliClicked}
                    >
                        <ProtoText style={[
                            globalStyles.tertiaryText,
                            {
                                color: value === 1 ? '#fff' : PRIMARY_TEXT_COLOR,
                            }
                        ]}>
                            नेपाली
                        </ProtoText>
                    </ProtoTouchable>

                    {/*<RadioForm*/}
                    {/*formHorizontal={true}*/}
                    {/*animation={true}*/}
                    {/*radio_props={radio_props}*/}
                    {/*initial={initial_value}*/}
                    {/*borderWidth={0.3}*/}
                    {/*buttonInnerColor={PRIMARY_COLOR}*/}
                    {/*// buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}*/}
                    {/*buttonSize={10}*/}
                    {/*buttonOuterSize={20}*/}
                    {/*style={{marginLeft:10,}}*/}
                    {/*wrapStyle={{margin:10,}}*/}
                    {/*}}*/}
                    {/*>*/}
                    {/*</RadioForm>*/}
                </View>
            </View>
        );
    }
};

const styles = EStyleSheet.create({
    container: {
        padding: 16,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        borderBottomColor: '#eaeaea',
        borderBottomWidth: 1,
    },
    radioButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        margin: 10,
        borderRadius: 4,
        // borderWidth:1,
        borderColor: '$primaryColor',
    },
    settingsLabel: {
        // width:'75%'
    },
    mainLabel: {
        fontSize: '$secondaryTextSize',
        color: '$primaryTextColor',
        marginBottom: 7,
    },
    subLabel: {
        fontSize: '$tertiaryTextSize',
        color: '$tertiaryTextColor',
        marginBottom: 10,
    },
});

