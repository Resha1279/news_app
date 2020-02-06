import React from 'react';
import {View} from 'react-native';
import {globalStyles} from "../styles";
import EStyleSheet from "react-native-extended-stylesheet";
import FastImage from "react-native-fast-image";
import ProtoText from "./ProtoText";
import ProtoTouchable from "./ProtoTouchable";
import Icon from "./Icon";
import {PRIMARY_COLOR, SECONDARY_TEXT_COLOR} from "../styles/variables";
import Communications from "react-native-communications";

const thumb = 'https://scontent.fktm8-1.fna.fbcdn.net/v/t1.0-9/24900113_171151283629024_175590097435553155_n.jpg?_nc_cat=0&oh=8bb5f3cb6f4a77960fbd91f9446a2763&oe=5C2E181B';
const title = 'Kobid Upadhyay';
const designation = 'UI/UX Designer & Developer';
const email = 'kobid.upadhyay.589@gmail.com';

export type member_info = {
    thumb: string, // url
    title: string,
    designation: string,
    email: string,
    social: Array<social>
    // facebook: string,
    // instagram: string,
    // googlePlus: string,
    // twitter: string,
    // youTube:string
}

export type social = {
    name: string,
    id: string,
    link: string,
    icon_url: string
}


class MemberInfo extends React.Component {

    props: {
        member: member_info
    };

    renderActionButton(icon, onPress, iconurl) {
        let viewBox;

        if (icon === 'facebook') {
            viewBox = '0 0 11 20';
        } else if (icon === 'youTube') {
            viewBox = '0 0 20 15'
        } else {
            viewBox = '0 0 20 20';
        }
        if (iconurl) {
            return (
                <View key={icon} style={globalStyles.roundButtonContainer}>
                    <ProtoTouchable style={globalStyles.roundButton} onPress={onPress}>
                        <FastImage
                            source={{uri:iconurl}}
                            style={{height: 20, width: 20}}/>
                    </ProtoTouchable>
                </View>
            )
        }
        return (
            <View style={globalStyles.roundButtonContainer}>
                <ProtoTouchable style={globalStyles.roundButton} onPress={onPress}>
                    <Icon name={icon} height='20' width='20' viewBox={viewBox}
                          fill={SECONDARY_TEXT_COLOR}/>
                </ProtoTouchable>
            </View>
        )
    }

    render() {
        const {thumb, title, designation, email, social} = this.props.member;
        return (
            <View style={[globalStyles.card, styles.card]}>
                <FastImage
                    style={styles.thumbnail}
                    source={{uri: thumb}}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <ProtoText style={[globalStyles.primaryText, {marginBottom: 8}]}>
                    {title}
                </ProtoText>
                <ProtoText style={[globalStyles.secondaryText, {marginBottom: 8}]}>
                    {designation}
                </ProtoText>
                <ProtoTouchable onPress={this.onEmailClicked(email)}>
                    <ProtoText style={[globalStyles.tertiaryText, {marginBottom: 8}]}>
                        {email}
                    </ProtoText>
                </ProtoTouchable>
                <View style={styles.actionButtonContainer}>
                    {social ? social.map(item => {
                        const {name, id, link, icon_url} = item;
                        return this.renderActionButton(id, this.onSocialClick(link), icon_url)
                    }) : <View/>}
                </View>
            </View>
        )
    }

    onEmailClicked = (email) => () => {
        Communications.email(email)
    };

    onSocialClick = (link) => () => {
        Communications.web(link);
    }

}

export default MemberInfo;

const styles = EStyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonContainer: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    thumbnail: {
        height: 100,
        width: 100,
        borderRadius: 55,
        margin: 10,
        marginTop: 16,
    }
});