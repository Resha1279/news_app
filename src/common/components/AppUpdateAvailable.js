import React from 'react';
import {View,Linking} from 'react-native'
import {globalStyles} from "../styles";
import ProtoText from "./ProtoText";
import {BACKGROUND_COLOR_WHITE, PRIMARY_COLOR, PRIMARY_TEXT_COLOR_WHITE} from "../styles/variables";
import Icon from "./Icon";
import ProtoButton from "./ProtoButton";
import {connect} from "react-redux";
import {getConstants} from "../constants/remote_config/selector";
import {ANDROID_PACKAGE_NAME, VERSION_CODE} from "../constants/index";

class AppUpdateAvailable extends React.Component {

    constructor(){
        super();
        this.hideView = this.hideView.bind(this);
        this.state = {show:true}
    }

    hideView(){
        this.setState({show:false})
    }
    onUpdateClicked(){
        Linking.openURL(`market://details?id=${ANDROID_PACKAGE_NAME}`);
    }

    render() {
        const {version_code, version_feature} = this.props.constants;
        if (!this.state.show){
            return <View/>
        }
        if (!(parseFloat(version_code) > parseFloat(VERSION_CODE))){
                return <View/>
        }
        return (
            <View style={[
                globalStyles.card,
                {
                    padding: 16,
                    paddingBottom:0,
                    backgroundColor: PRIMARY_COLOR
                }
            ]}>
                <ProtoText style={[globalStyles.primaryText, {
                    alignSelf: 'center',
                    fontWeight: '500',
                    color: PRIMARY_TEXT_COLOR_WHITE,
                    marginBottom: 16,
                }]}>
                    UPDATE AVAILABLE
                </ProtoText>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{width: '65%'}}>
                        <ProtoText style={[globalStyles.secondaryText, {color: PRIMARY_TEXT_COLOR_WHITE, lineHeight:25,}]}>
                            {version_feature}
                        </ProtoText>
                    </View>
                    <View style={{opacity: 0.3}}>
                        <Icon name='appBarIcon' height='52' width='60' viewBox='0 0 26 30' fill='#fff'/>
                    </View>
                </View>
                <View
                    style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', marginTop:16,}}>
                    <ProtoButton
                        backgroundColor='transparent'
                        tintColor={BACKGROUND_COLOR_WHITE}
                        onClick={this.hideView}
                        label='LATER'
                        style={{
                            borderRadius: 2,
                            width: 120,
                            elevation: 0,
                            shadowOpacity: 0,
                            shadowRadius: 2,
                            shadowColor: '#000',
                            shadowOffset: {height: 2, width: 0}
                        }}
                    />
                    <ProtoButton
                        backgroundColor={BACKGROUND_COLOR_WHITE}
                        tintColor={PRIMARY_COLOR}
                        onClick={this.onUpdateClicked}
                        label='UPDATE'
                        style={{
                            borderRadius: 2,
                            width: 120,
                            // elevation: 3,
                            shadowOpacity: 0.2,
                            shadowRadius: 2,
                            shadowColor: '#000',
                            shadowOffset: {height: 2, width: 0}
                        }}
                    />
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {constants: getConstants(state)}
};

export default connect(mapStateToProps)(AppUpdateAvailable)
