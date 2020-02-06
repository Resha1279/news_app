import React from 'react'
import {View, StyleSheet, Slider, Text} from 'react-native'
import EStyleSheet from "react-native-extended-stylesheet";
import {PRIMARY_COLOR} from "../../styles/variables";
import ProtoText from "../ProtoText";

export default class SettingsSlider extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.settingsLabel}>
                    <ProtoText style={styles.mainLabel}>{this.props.title}</ProtoText>
                    <ProtoText style={styles.subLabel}>{this.props.subTitle}</ProtoText>
                </View>
                <View style={{height:40,justifyContent: 'center'}}>
                    <Slider
                        minimumTrackTintColor={PRIMARY_COLOR}
                        style={styles.switch}
                        maximumValue={this.props.maximumValue}
                        minimumValue={this.props.minimumValue}
                        value={this.props.value}
                        onValueChange={this.props.onValueChange}
                        onSlidingComplete={this.props.onSlidingComplete}
                        thumbTintColor={PRIMARY_COLOR}
                        onTintColor='#858FCF'
                    />
                </View>
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    container: {
        padding: 16,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '$backgroundColorWhite',
        borderBottomColor: '$backgroundColor',
        borderBottomWidth: 1,
    },
    settingsLabel: {},
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
    triggerLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingTop: 0,
        paddingBottom: 5,
    },
    switch: {}
})