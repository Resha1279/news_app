import React from 'react';
import {View} from 'react-native';
import {Text} from "react-native-elements";
import {connect} from 'react-redux';
import MemberInfo from "../../common/components/MemberInfo";
import {getMembers} from "../../common/constants/remote_config/action";
import {getMembersList} from "../../common/constants/remote_config/selector";
import Loader from "../../common/components/Loader";

class About extends React.Component {

    static navigationOptions  = ({navigation, screenProps: {i18n}})=>({
        title: i18n.extras.about,
    });

    componentDidMount(){
        this.props.getMembers()  ;
    }

    render() {
        const {members:{items, loading, error}} = this.props;
        if (loading){
            return <Loader />
        }
        return (
            <View style={{flex: 1}}>
                {
                    items.map(member => <MemberInfo key={member.id} member={member}/>)
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {members: getMembersList(state)}
};

export default connect(mapStateToProps, {getMembers})(About);
