import React from 'react';
import {Modal, ScrollView, View} from 'react-native';
import {globalStyles} from "../styles/index";
import {__DEV__} from "../constants/index";
import NavigationService from "../navigators/helpers/NavigationService";
import InviteFriend from "../components/InviteFriend";

class InviteFriendsModal extends React.Component {

    props: {navigation:{}};

    constructor(props){
        super(props);
        this.hideInviteFriendsModal = this.hideInviteFriendsModal.bind(this);
        this.renderInviteFriendsModal = this.renderInviteFriendsModal.bind(this);

    }

    renderInviteFriendsModal() {
        const {navigation} = this.props;
        if (__DEV__) {
            console.log("Invite friends : ", navigation);
        }
        if (navigation){
            const {params} =navigation.state;
            if (params) {
                const {show_invite_friends_modal} = params;
                return (
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={params && show_invite_friends_modal}
                        onRequestClose={this.hideInviteFriendsModal}
                    >
                        <ScrollView
                            style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}
                            contentContainerStyle={{
                                justifyContent: 'center'
                            }}
                        >
                            <InviteFriend/>
                        </ScrollView>
                    </Modal>
                )
            }
        }
        return null
    }

    render() {
        return (
            <View style={globalStyles.container}>
                {this.renderInviteFriendsModal()}
            </View>
        )
    }
}

export default InviteFriendsModal;
