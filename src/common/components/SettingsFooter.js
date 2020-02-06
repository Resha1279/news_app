import React from 'react';
import {View} from 'react-native';
import ProtoText from "./ProtoText";
import connectLocalization from "../localization/connectLocalization";
import EStyleSheet from "react-native-extended-stylesheet";
import {globalStyles} from "../styles";

class SettingsFooter extends React.Component {
    render() {
        const {i18n} = this.props;
        return (
            <View style={styles.container}>
                <ProtoText allowFontScaling = {false} style={[globalStyles.tertiaryText,styles.product,{marginBottom:5,fontSize:10}]}>
                    {i18n.product_info.title}
                </ProtoText>
                <ProtoText allowFontScaling = {false}  style={[globalStyles.secondaryText,styles.product,{marginBottom:0,fontSize:12}]}>
                    {i18n.product_info.desc}
                </ProtoText>
            </View>
        )
    }
}

export default connectLocalization(SettingsFooter);
const styles = EStyleSheet.create({
    container: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    product: {
        marginBottom: 16,
        color: 'rgba(0,0,0,0.3)',
    }
})