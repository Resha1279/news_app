import React from "react";
import {Animated, Easing, ToastAndroid, View} from 'react-native';
import ProtoText from "../../ProtoText";
import {globalStyles} from "../../../styles/index";
import EStyleSheet from 'react-native-extended-stylesheet'
import {__DEV__} from "../../../constants/index";
import ProtoTouchable from "../../ProtoTouchable";
import FastImage from "react-native-fast-image";
import Icon from "../../Icon";
import {
    CARD_BACKGROUND_COLOR,
    CARD_ON_PLAY,
    ICON_COLOR,
    PRIMARY_COLOR,
    TERTIARY_TEXT_COLOR,
    SEPARATOR
} from "../../../styles/variables";
import {connect} from "react-redux";
import {bookmark, remove_bookmark} from "../../../../Library/action";
import {incrementFeedRead} from "../../../../Feeds/action";
import ProtoConnectionAwareImageView from "../../ProtoConnectionAwareImageView";
import {play, pause} from "../../../../TTS/action";
import {feedsItemPlay} from "../../../utils/analytics";
import connectLocalization from "../../../localization/connectLocalization";


export
type
FeedItem = {
    id: number,
    id_original: number,
    news_url: string,
    category: string,
    site_name: string,
    title: string,
    short_desc? : string,
    desc_original: string,
    desc_formatted? : string,
    desc_list: Array < string >,
    images? : Array < string >,
    thumb_url? : string,
    published_date? : string,
    created_date: Date,
    author? : string,
    tags: Array < string >,
    num_reads: number,
    ago: string,
    read_time: string,
    site_title: string,
    bookmarked: boolean,
    display_date: string,
    is_playing: boolean,
    play_index: number,
    play_status: string,
    view_type: string

}

class DetailView extends React.Component {

    props: { item: FeedItem };

    constructor() {
        super();
        this.onBookmarkPressed = this.onBookmarkPressed.bind(this);
        this.onFeedItemClicked = this.onFeedItemClicked.bind(this);
        this.onPlayButtonPressed = this.onPlayButtonPressed.bind(this);
        this.onShareButtonPressed = this.onShareButtonPressed.bind(this);

    }

    shouldComponentUpdate(nextProps) {
        const {
            bookmarked: prevBookmarked,
            num_reads: prevNumReads,
            ago: prevAgo,
            play_status: prevPlayStatus
        } = this.props.item;
        const {refresh: prevRefresh} = this.props;
        const {refresh} = nextProps;
        const {bookmarked, num_reads, play_status, ago} = nextProps.item;
        return (
            prevBookmarked !== bookmarked ||
            prevRefresh !== refresh ||
            ago !== prevAgo ||
            play_status !== prevPlayStatus
        );
    }

    infoWithIcon(icon, info) {
        return (
            <View style={styles.infoWithIcon}>
                <Icon name={icon} height='20' width='20' viewBox='0 0 23 18'
                      fill={TERTIARY_TEXT_COLOR}/>
                <ProtoText style={[globalStyles.tertiaryText, {marginLeft: 10}]}>
                    {info}
                </ProtoText>
            </View>
        )
    };

    renderActionButtons(icon, label, onPress) {
        return (
            <View style={{flex: 1}}>
                <ProtoTouchable
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                    }}
                    onPress={() => onPress()}

                >
                    <Icon name={icon} height='20' width='20' viewBox='0 0 23 18'
                          fill={TERTIARY_TEXT_COLOR}/>
                    <ProtoText style={{
                        marginLeft: 10
                    }}>
                        {label}
                    </ProtoText>
                </ProtoTouchable>
            </View>
        )
    }


    onBookmarkPressed() {
        const {item} = this.props;
        const {toast} = this.props.i18n;
        window.requestAnimationFrame(() => {
            if (item) {
                item['bookmark_time'] = Date.now();
                if (!item.bookmarked) {
                    this.props.bookmark(item);
                    ToastAndroid.show(toast.item_bookmarked, ToastAndroid.SHORT);
                } else {
                    this.props.remove_bookmark(item);
                    ToastAndroid.show(toast.item_removed_from_bookmarked, ToastAndroid.SHORT);
                }
            }
        });


    };

    onPlayButtonPressed() {
        const {item: {is_playing, play_index, play_status},item} = this.props;
        const params_for_analytics = {
            ...item['analytics_item'],
            play_status,
            play_index,
            from:"feeds_item"
        };
        feedsItemPlay(params_for_analytics);
        if (play_status && play_status === "playing") {
            this.props.pause();
        } else {
            this.props.play(this.props.item, play_index);
        }
    }

    onShareButtonPressed() {
        this.props.shareOnClick();
    }

    onFeedItemClicked() {
        const {item, index, onClick} = this.props;
        // this.props.incrementFeedRead(item);
        onClick();
    }

    render() {
        const {item, index, onClick, hideViews} = this.props;
        const source_title = item.site_name.replace('.com', "");
        if (__DEV__) {
            // console.log('feeds item : ', item)
        }
        const {bookmarked, read_time, is_playing, play_status} = item;
        const bookmark_icon = bookmarked ? "bookmark" : "bookmarkOutline";
        const play_text = is_playing ? play_status !== "paused" ? "Pause" : "Play" : "Play";
        const player_icon = is_playing ? play_status !== "paused" ? "pause" : "play" : "play";
        let sourceImage;
        return (
            <ProtoTouchable style={[
                globalStyles.card,
                {
                    backgroundColor: is_playing ? play_status !== "paused" ? CARD_ON_PLAY : CARD_BACKGROUND_COLOR : CARD_BACKGROUND_COLOR,
                }
            ]}
                            onPress={this.onFeedItemClicked}
            >
                <View style={styles.feedsCardContent}>
                    <View style={styles.headerContainer}>
                        <View style={styles.headerContent}>
                            {sourceImage ?
                                <FastImage
                                    source={{uri: sourceImage}}
                                    style={styles.sourceImage}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                                :
                                <View style={styles.noImageContainer}/>
                            }
                            <View style={styles.sourceInfo}>
                                <ProtoText
                                    style={[
                                        globalStyles.secondaryText,
                                        styles.sourceTitle,
                                    ]}
                                >
                                    {source_title}
                                </ProtoText>
                                <ProtoText
                                    style={[
                                        globalStyles.tertiaryText,
                                        styles.ago
                                    ]}>
                                    {item.ago}
                                </ProtoText>
                            </View>
                        </View>
                        <View style={globalStyles.roundButtonContainer}>
                            <ProtoTouchable style={globalStyles.roundButton} onPress={this.onBookmarkPressed}>
                                <Icon name={bookmark_icon} height='24' width='24' viewBox='0 0 15 19'
                                      fill={ICON_COLOR}/>
                            </ProtoTouchable>
                        </View>
                    </View>
                    {/*views and read time*/}

                    {/*<View style={styles.userInteractionInfo}>*/}
                    {/*<ProtoTouchable style={{padding: 10, paddingLeft: 0}} onPress={this.onCategoryPressed}>*/}
                    {/*<ProtoText*/}
                    {/*style={[*/}
                    {/*globalStyles.tertiaryText,*/}
                    {/*styles.category*/}
                    {/*]}>*/}
                    {/*#{item.category.toUpperCase()}*/}
                    {/*</ProtoText>*/}
                    {/*</ProtoTouchable>*/}
                    {/*{!hideViews ? this.infoWithIcon('views', item.num_reads) : null}*/}
                    {/*{this.infoWithIcon('readTime', `${read_time} read`)}*/}
                    {/*</View>*/}

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        {/*title*/}
                        <ProtoText
                            style={[
                                globalStyles.primaryText,
                                styles.newsTitle,
                            ]}
                        >
                            {item.title}
                        </ProtoText>


                        {/*thumbnail image*/}
                        {/*{item.thumb_url ?*/}
                        {/*<ProtoConnectionAwareImageView*/}
                        {/*source={{uri: item.thumb_url}}*/}
                        {/*style={styles.thumbnail}*/}
                        {/*resizeMode={FastImage.resizeMode.cover}*/}
                        {/*/> : <View/>*/}
                        {/*}*/}

                    </View>
                    {/*description*/}

                    <ProtoText
                        style={[
                            globalStyles.secondaryText,
                            styles.newsDescription
                        ]}
                        numberOfLines={4}
                    >
                        {item.desc_list}
                    </ProtoText>
                </View>
                <View style={styles.actionButtons}>
                    {this.renderActionButtons(player_icon, play_text, this.onPlayButtonPressed)}
                    <View style={styles.break}/>
                    {this.renderActionButtons('share', 'Share', this.onShareButtonPressed)}
                </View>

            </ProtoTouchable>
        );
    }

}

export default connect(null,
    {
        bookmark,
        remove_bookmark,
        incrementFeedRead,
        play,
        pause
    })(connectLocalization(DetailView));

const styles = EStyleSheet.create({
    feedsCardContent: {},
    headerContainer: {
        padding: 16,
        paddingRight: 7,
        paddingBottom: 5,
        paddingTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    noImageContainer: {
        height: '$logoHeight',
        width: '$logoHeight',
        borderRadius: '$logoHeight / 2',
        backgroundColor: '$backgroundColor'
    },
    sourceImage: {
        height: '$logoHeight',
        width: '$logoHeight',
        borderRadius: '$logoHeight / 2',
    },
    headerContent: {
        flexDirection: 'row'
    },
    sourceInfo: {
        marginLeft: 16,
        justifyContent: 'center',
    },
    sourceTitle: {
        color: '$primaryTextColor'
    },

    thumbnail: {
        height: 100,
        width: 100,
        borderRadius: 4,
        marginRight: 16,
    },
    metaData: {
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    category: {
        color: '$primaryColor'
    },
    newsTitle: {
        fontWeight: '500',
        color: '$secondaryTextColor',
        fontSize:'$primaryTextSize-4',
        padding: 16,
        paddingTop: 0,
        paddingBottom: 10,
        lineHeight: 32,

    },
    newsDescription: {
        color: '$tertiaryTextColor',
        padding: 16,
        paddingTop: 0,
        lineHeight: 26,
    },
    userInteractionInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        marginBottom: 10,
        marginLeft: 6,
    },
    infoWithIcon: {
        marginLeft: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButtons: {
        borderTopWidth: 1,
        borderTopColor: SEPARATOR,
        flexDirection: 'row',
    },
    break: {
        width: 1,
        backgroundColor: SEPARATOR,
    }
});
