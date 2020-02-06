import {PureComponent} from 'react';
import React from "react";
import {View, InteractionManager, Text} from 'react-native';
import {__DEV__} from "../constants";
import EStyleSheet from "react-native-extended-stylesheet";
import {PRIMARY_COLOR, STATUS_BAR} from "../styles/variables";


class ProtoFeedDetailProgress extends PureComponent {

    props: {
        totalItems: number,
        index: number,
    };

    constructor() {
        super();
        this.state = {is_mounting: true}
    }

    componentWillMount() {
        this.makeList(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.makeList(nextProps);
    }

    componentDidMount() {

        InteractionManager.runAfterInteractions(() => {
            this.setState({is_mounting: false});
        });
    }

    makeList({totalItems}) {
        this.list = [];
        for (let i = 0; i < totalItems; i++) {
            this.list.push(i);
        }

    }


    render() {

        const {totalItems, index} = this.props;

        return (
            <View style={{
                width: '100%',
                height: 4,
                backgroundColor: STATUS_BAR,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                {this.list ? this.list.map((item) => {
                    if (item === index) {
                        return <View key={item} style={styles.active}/>
                    }
                    else if (item < index) {
                        return <View key={item} style={styles.active}/>
                    }
                    return <View key={item} style={styles.inactive}/>
                }) : <View style={{
                    width: '100%',
                    height: 4,
                    backgroundColor: '#000',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}/>}
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    inactive: {
        flex: 1,
        height: 1,
        backgroundColor: 'white',
        opacity: 0.7,
    },
    active: {
        flex:1,
        height: 3,
        // width: 10,
        backgroundColor: 'white',
    }
});
export default (ProtoFeedDetailProgress);
