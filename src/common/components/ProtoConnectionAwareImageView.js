import React, {Component} from 'react';
import FastImage from 'react-native-fast-image';
import {connect} from "react-redux";
import {View, Image, Text, ImageBackground} from 'react-native';
import {Button} from "react-native-elements";
import {setLoadImageOnData} from "../../Settings/action";
import {getLoadImageOnData} from "../../Settings/selector";

import EStyleSheet from "react-native-extended-stylesheet";
import ProtoTouchable from "./ProtoTouchable";
import ProtoText from "./ProtoText";
import {globalStyles} from "../styles";

import connectLocalization from "../localization/connectLocalization";

class ProtoConnectionAwareImageView extends Component {
    constructor() {
        super();
        this.renderImage = this.renderImage.bind(this);
        this.renderDataMode = this.renderDataMode.bind(this);
        this.setLoadImageOnData = this.setLoadImageOnData.bind(this);
        this.viewThisImage = this.viewThisImage.bind(this);
        this.state = {override: false, source: null};

    }

    setLoadImageOnData() {
        this.props.setLoadImageOnData(true)
    }

    viewThisImage() {
        this.setState({override: true});
    }

    render() {
        const {connectivity, data_setting} = this.props;
        return (
            <View>
                {!this.state.override ? !data_setting && connectivity.type === 'cellular' ? this.renderDataMode() : this.renderImage() : this.renderImage()}
            </View>
        )
    }

    renderImage() {
        const {style, source, resizeMode, ...otherProps} = this.props;
        if (this.state.source) {
            return (
                <Image
                    source={this.state.source}
                    style={style}
                    {...otherProps}
                />
            )
        }
        return (
            <FastImage
                source={source}
                style={style}
                resizeMode={resizeMode}
                onLoad={
                    () => {
                        this.setState({source: null})
                    }
                }
                onError={
                    (error) => {
                        this.setState({source: {uri: "empty_contents"}})
                    }}
                {...otherProps}
            />
        )
    }

    renderDataMode() {
        // const {connectivity, data_setting} = this.props;
        const {i18n, show_setting} = this.props;
        if (!show_setting) {
            return (
                <ImageBackground source={{uri: 'blur_bg'}} style={styles.squareBG}>
                    <View style={styles.turnOnButtonContainer}>
                        <ProtoTouchable onPress={this.viewThisImage} style={styles.button}>
                            <ProtoText style={[globalStyles.tertiaryText, styles.buttonText, {fontWeight: '400'}]}>
                                {i18n.settings.view_this_image}
                            </ProtoText>
                        </ProtoTouchable>
                    </View>
                </ImageBackground>
            )
        }
        return (
            <View style={styles.actionContainer}>
                <FastImage
                    style={styles.blurBackground}
                    source={require('../../../assets/blur_bg.png')}

                    resizeMode={FastImage.resizeMode.cover}
                />
                <ProtoText style={[globalStyles.secondaryText, styles.descText]}>
                    {i18n.settings.cellular_data_image_load_desc}
                </ProtoText>
                <View style={styles.buttonContainer}>
                    <ProtoTouchable onPress={this.setLoadImageOnData} style={styles.button}>
                        <ProtoText style={[globalStyles.secondaryText, styles.buttonText]}>
                            {i18n.settings.image_load_on_cellular_data_button}
                        </ProtoText>
                    </ProtoTouchable>
                    <ProtoTouchable onPress={this.viewThisImage} style={styles.button}>
                        <ProtoText style={[globalStyles.secondaryText, styles.buttonText]}>
                            {i18n.settings.view_this_image}
                        </ProtoText>
                    </ProtoTouchable>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {connectivity: state.connectivity, data_setting: getLoadImageOnData(state)}
};
export default connect(mapStateToProps, {setLoadImageOnData})(connectLocalization(ProtoConnectionAwareImageView));


const styles = EStyleSheet.create({
    actionContainer: {
        height: 180,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    squareBG: {
        height: 100,
        width: 100,
        borderRadius: 4,
        marginRight: 16,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    blurBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        height: 180,
        width: '100%',
    },
    turnOnButtonContainer: {
        width: 100,
        height: 100,
        borderRadius: 4,
        // borderWidth: 1,
        // borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    descText: {
        marginBottom: 16,
        textAlign: 'center',
        color: '#fff',
        width: '75%',
    },
    buttonContainer: {
        width: 150,
        height: 45,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    button: {
        flex: 1,
        width: 150,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '600'
    }
});


