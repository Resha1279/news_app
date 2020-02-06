import React from 'react';
import {ScrollView, View} from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import ProtoTouchable from "./ProtoTouchable";
import {BACKGROUND_COLOR_WHITE, ICON_COLOR, PRIMARY_COLOR} from "../styles/variables";
import ProtoText from "./ProtoText";
import {globalStyles} from "../styles";
import connectLocalization from "../localization/connectLocalization";
import Icon from "./Icon";

class UpdateAvailableButton extends React.Component{
    render(){
        return(
                <ProtoTouchable
                    onPress={this.props.onPress}
                    style = {styles.container}
                >
                    <View style = {{flexDirection:'row', alignItems:'center'}}>
                        <Icon name='reload' height='20' width='20' viewBox='0 0 20 20'
                              fill={BACKGROUND_COLOR_WHITE}/>
                    <ProtoText style = {[globalStyles.secondaryText,{color:BACKGROUND_COLOR_WHITE,marginLeft:10,}]}>
                        Latest feeds available
                    </ProtoText>
                    </View>
                </ProtoTouchable>
        )
    }
}
export default connectLocalization(UpdateAvailableButton)

styles = EStyleSheet.create({
    container:{
        elevation:4,
        zIndex:900,
        width:'100%',
        position:'absolute',
        top:0,
        right:0,
        left:0,
        paddingBottom:8,
        paddingTop:8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:PRIMARY_COLOR,
    }
});