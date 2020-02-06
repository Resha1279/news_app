import {StyleSheet} from 'react-native';
import * as globalStyleVariables from './variables';
import EStyleSheet from 'react-native-extended-stylesheet';
import {CARD_BACKGROUND_COLOR} from "./variables";

const globalStyles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'$backgroundColorWhite'
    },
    //common
    roundButtonContainer:{
        height:'$iconHeight',
        width:'$iconHeight',
        borderRadius:'$iconHeight/2',
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center'
    },
    roundButton:{
        padding:16,
        justifyContent:'center',
        alignItems:'center'
    },
    card: {
        backgroundColor:'$cardBackgroundColor',
        elevation:2,
        margin:10,
        borderRadius:4,
        marginBottom:5,
    },

    // fonts

    primaryText:{
        fontSize:'$primaryTextSize',
        color:'$primaryTextColor',
        fontFamily: "Raleway-Regular"
    },
    secondaryText:{
        fontSize:'$secondaryTextSize',
        color:'$secondaryTextColor',
        fontFamily: "Raleway-Regular"
    },
    tertiaryText:{
        fontSize:'$tertiaryTextSize',
        color:'$tertiaryTextColor',
        fontFamily: "Raleway-Regular"
    }
});

export {globalStyles, globalStyleVariables};
