import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    InteractionManager,
    Platform,
    LayoutAnimation,
    UIManager,
    DeviceEventEmitter,
} from 'react-native';
import { connect } from 'react-redux';
import * as globalStyleVariables from "../../common/styles/variables";
import {globalStyles} from "../../common/styles/index";
import connectLocalization from "../../common/localization/connectLocalization";
import Loader from "../../common/components/Loader";




const THUMBNAIL_SIZE = 30;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        width: globalStyleVariables.WINDOW_WIDTH,
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: Platform.OS === 'android' ? 'flex-start' : 'center',
        ...Platform.select({
            ios: {
                maxWidth: globalStyleVariables.WINDOW_WIDTH - 150,
            },
        }),
    },
    headerThumnailNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameContainer: {
        flexDirection: 'column',
        marginLeft: 10,
    },
    headerText: {
        color: '#fff',
    },
    headerRightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

class ProtoDetailViewTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mounting: true,
            selectedIndex: null,
        };
        if (Platform.OS === 'android') {
            /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
            UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.renderMainContent = this.renderMainContent.bind(this);
        this.handleOnViewPagerPageSelected = this.handleOnViewPagerPageSelected.bind(this);
        this.renderContent = this.renderContent.bind(this);
    }

    componentDidMount() {

        InteractionManager.runAfterInteractions(() => {
            if (this.detailView) {
                this.setState({ mounting: false });
            }

        });
    }


    handleOnViewPagerPageSelected = index => {
        if (this.props.index !== undefined && this.props.index !== index) {
            const { setParams } = navigation;
            setParams({
                index,
            });
            InteractionManager.runAfterInteractions(() => {

            });
        }
    };

    handleOnListEndReached = () => {
        const { onListEndReached } = this.props;
        if (onListEndReached) {
            onListEndReached();
        }
    };


    handleOnPressHeaderBackButton = () => {
        const { goBack } = this.props.navigation;
        goBack();
    };

    handleOnPressHardwareBackButton = () => {
        const { isOpenDetailInfoModal } = this.state;
        if (isOpenDetailInfoModal) {
            this.setState({
                isOpenDetailInfoModal: false,
            });
            return true;
        }
        return false;
    };

    renderHeaderTitle = item => {
        const { navigation: { push } } = this.props;
        return (
            <View style={styles.headerTitleContainer}>
              <Text>Header Text</Text>
            </View>
        );
    };

    renderHeaderRight = item => {

        return (
            <View style={styles.headerRightContainer}>
              <Text>Header Right</Text>
            </View>
        );
    };

    renderContent = ({ item }) => {
        const {navigation} = this.props;
        return (
            <View style={styles.content} key={item.id}>
              <Text>Content</Text>
            </View>
        );
    };

    renderMainContent() {
        const { items, item, index } = this.props.navigation.state.params;
        const { mounting } = this.state;
        if (mounting) {
            return <Loader/>;
        }
        return (
            <ProtoDetailViewTest
                items={items}
                keyExtractor={vpItem => index.toString()}
                index={index}
                renderContent={this.renderContent}
                onPageSelected={this.handleOnViewPagerPageSelected}
                onEndReached={this.handleOnListEndReached}
            />
        );
    }

    render() {
        const { item, i18n} = this.props;
        const {selectedIndex} = this.state;
        return (
              <View
                  // key = {item.id}
                  style={globalStyles.container}
                  ref={ref => (this.detailView = ref)}
              >
                  {this.renderMainContent.bind(this)()}

              </View>

        );
    }
}

export default connect(null,{})(connectLocalization(ProtoDetailViewTest));

