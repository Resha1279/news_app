import React from 'react'
import {View,StyleSheet,Switch,Text} from 'react-native'
import {BACKGROUND_COLOR_WHITE, PRIMARY_COLOR, PRIMARY_COLOR_TRANSPARENT} from "../../styles/variables";
import EStyleSheet from "react-native-extended-stylesheet";
import ProtoText from "../ProtoText";

export default class SettingsSwitch extends React.Component{
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.settingsLabel}>
                    <ProtoText style = {styles.mainLabel}>{this.props.title}</ProtoText>
                    <ProtoText style = {styles.subLabel}>{this.props.subTitle}</ProtoText>
                </View>
                <Switch
                    onTintColor = {PRIMARY_COLOR_TRANSPARENT}
                    onValueChange = {this.props.switchAction}
                    thumbTintColor = {this.props.value ? PRIMARY_COLOR : '#f7f7f7'}
                    disabled = {this.props.switchDisabled}
                    value ={this.props.value}
                />
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    container:{
        padding:16,
        paddingTop:10,
        paddingBottom:10,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        borderBottomColor:'#eaeaea',
        borderBottomWidth:1,
    },
    settingsLabel :{
        width:'75%'
    },
    mainLabel:{
        fontSize:'$secondaryTextSize',
        color:'$primaryTextColor',
        marginBottom:7,
    },
    subLabel:{
        fontSize:'$tertiaryTextSize',
        color:'$tertiaryTextColor',
        marginBottom:10,
    },
});