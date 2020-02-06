import React from 'react';
import {Image, Text, View} from 'react-native';
import {globalStyles} from "../styles";
import ProtoTouchable from "./ProtoTouchable";
import Icon from "./Icon";
import {PRIMARY_COLOR, PRIMARY_TEXT_COLOR} from "../styles/variables";
import ProtoText from "./ProtoText";
import connectLocalization from "../localization/connectLocalization";

class WelcomeCard extends React.Component{

    props: {
        onClosePressed: ()=>{}
    };

    render(){
        const {i18n} = this.props;
        return(
            <View style={[globalStyles.card]}>
                <View style={[globalStyles.roundButtonContainer,{alignSelf:'flex-end'}]}>
                    <ProtoTouchable style={[globalStyles.roundButton]} onPress={this.props.onClosePressed}>
                        <Icon name='close' height='16' width='16' viewBox='0 0 16 16' fill={PRIMARY_COLOR}/>
                    </ProtoTouchable>
                </View>
                <Image source={{uri: 'welcome'}}
                       style={{height: 300, width: '100%', resizeMode: 'contain'}}/>
                <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20}}>
                    <ProtoText style={[globalStyles.secondaryText, {
                        color: PRIMARY_TEXT_COLOR,
                        fontWeight: '500',
                        marginBottom: 8,
                        textAlign: 'center',
                    }]}>
                        {i18n.extras.welcome}
                    </ProtoText>
                    <ProtoText
                        style={[globalStyles.tertiaryText, {
                            lineHeight: 18,
                            textAlign: 'center',
                            width: '70%'
                        }]}>
                        {i18n.extras.welcome_desc}
                    </ProtoText>
                </View>
            </View>
        )
    }
}

export default (connectLocalization(WelcomeCard));
