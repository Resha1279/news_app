import React from 'react';
import {View} from 'react-native';
import {globalStyles} from "../../styles";
import FastImage from "react-native-fast-image";
import ProtoText from "../ProtoText";
import EStyleSheet from "react-native-extended-stylesheet";
import ProtoTouchable from "../ProtoTouchable";
import {SCREENS} from "../../constants/index";

class LicenseItem extends React.Component {

    onLinkPressed = (link)=>()=>{
        this.props.navigation.navigate(SCREENS.WebViewer,{link})
    };

    emptyFunction = ()=>{};

    render() {
        const {data:{title, author, image_url, site_link}} = this.props;
        return (
            <ProtoTouchable style={[globalStyles.card, {
                padding: 16,
                paddingTop:20,
                paddingBottom:20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }]} onPress={site_link?this.onLinkPressed(site_link):this.emptyFunction}>
                <View style = {{width:'65%'}}>
                    <ProtoText numberOfLines = {1} style={[globalStyles.primaryText, {marginBottom: 5, fontWeight: '500'}]}>
                        {title}
                    </ProtoText>
                    <ProtoText numberOfLines = {1} style={globalStyles.secondaryText}>
                        {author}
                    </ProtoText>
                </View>
                <FastImage
                    source={{uri: image_url}}
                    style={styles.image}
                />
            </ProtoTouchable>
        )
    }
}

const styles = EStyleSheet.create({
    image: {
        height: 80,
        width: 80,
        borderRadius: 5,
        overflow: 'hidden'
    }
});

export default LicenseItem
