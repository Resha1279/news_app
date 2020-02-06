import React from 'react';
import {View, Text} from 'react-native';
import Icon from "./Icon";
import EStyleSheet from "react-native-extended-stylesheet";
import ProtoTouchable from "./ProtoTouchable";

export default class ZoomButton extends React.Component {

    render() {
        return (
            <View>
                {this.props.right ?
                    <View style={styles.container}>
                        <ProtoTouchable style={styles.button} onPress={this.props.onClick}>
                            <Icon name='zoomIn' height='30' width='30' viewBox='0 0 20 20'
                                  fill='rgba(255,255,255,0.6)'/>
                        </ProtoTouchable>
                    </View>
                    :
                    <View style={styles.containerLeft}>
                        <ProtoTouchable style={styles.buttonLeft} onPress={this.props.onClick}>
                            <Icon name='zoomOut' height='30' width='30' viewBox='0 0 30 30'
                                  fill='rgba(255,255,255,0.6)'/>
                        </ProtoTouchable>
                    </View>
                }

            </View>
        )
    }
}

const styles = EStyleSheet.create({
    container: {
        backgroundColor: 'rgba(33,33,33,0.4)',
        borderColor: 'rgba(255,255,255,0.3)',
        borderLeftWidth: 1,
        borderTopWidth: 1,

        // position: 'absolute',
        // zIndex: 999,
        // bottom: 0,
        // right: 0,
        height: 65,
        width: 65,
        borderTopLeftRadius: 50,
        overflow: 'hidden',
    },
    containerLeft: {
        backgroundColor: 'rgba(33,33,33,0.4)',
        borderColor: 'rgba(255,255,255,0.3)',
        borderRightWidth: 1,
        borderTopWidth: 1,

        // position: 'absolute',
        // zIndex: 999,
        // bottom: 0,
        // right: 0,
        height: 65,
        width: 65,
        borderTopRightRadius: 50,
        overflow: 'hidden',
    },
    button: {
        height: 65,
        width: 65,
        paddingTop: 15,
        paddingLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLeft: {
        height: 65,
        width: 65,
        paddingTop: 15,
        paddingRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    }
});