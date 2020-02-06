import React from 'react';
import {View,Text} from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import ProtoTouchable from "./ProtoTouchable";
import Icon from "./Icon";
import ProtoText from "./ProtoText";

const ProtoButton = props =>{
    const {style,iconName,label,tintColor,backgroundColor,onClick} = props;
        return(
            <View style = {[styles.buttonContainer,{margin:16,borderRadius:2},style]}>
            <ProtoTouchable style = {[styles.button,{backgroundColor:backgroundColor}]} onPress = {onClick}>
                <View style = {styles.buttonContent}>
                    {iconName?
                        <Icon name = {iconName} width = '20' height = '20' viewBox = '0 0 20 20' fill = {tintColor}/>:<View/>
                    }
                    <ProtoText allowFontScaling = {false} style = {[styles.buttonText,{color :tintColor,marginLeft:iconName?10:0}]}>
                        {label}
                    </ProtoText>
                </View>
            </ProtoTouchable>
            </View>
        )
};

const styles= EStyleSheet.create({
    buttonContainer:{
        height:40,
        overflow:'hidden',
    },
    button:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonContent:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText:{
        // marginLeft:10,
        fontSize:14,
        fontWeight:'600',
    }
});
export default ProtoButton;
