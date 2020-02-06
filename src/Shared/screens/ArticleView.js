import {Component} from 'react';
import React from "react";
import {PixelRatio, InteractionManager, Dimensions, ScrollView, StyleSheet, View, StatusBar, ToastAndroid} from 'react-native';
import connectLocalization from "../../common/localization/connectLocalization";
import {connect} from "react-redux";
import HTMLView from 'react-native-htmlview';
import {__DEV__, SCREENS} from "../../common/constants";
import ProtoHighlightText from "../../common/components/ProtoHighlightText";
import {zoomInText, zoomOutText} from "../../Settings/action";
import {getFontSize} from "../../Settings/selector";
import type {FeedItem} from "../../common/components/items/feeds/DetailView";
import EStyleSheet from "react-native-extended-stylesheet";
import ProtoTouchable from "../../common/components/ProtoTouchable";
import Icon from "../../common/components/Icon";
import ZoomButton from "../../common/components/ZoomButton";
import TestWebView from "../../Test/screen/WebViewTest";
import CleanWebView, {makehtmlReadAble} from 'react-native-clean-webview';
import ProtoText from "../../common/components/ProtoText";
import HTML from 'react-native-render-html';
import ProtoConnectionAwareImageView from "../../common/components/ProtoConnectionAwareImageView";
import {play, pause} from "../../TTS/action";
import DetailHeaderArticleView from "../../common/components/headers/DetailHeaderArticleView";
import {bookmark, remove_bookmark} from "../../Library/action";
import ProtoArticleViewImage from "../../common/components/ProtoArticleViewImage";
import FastImage from "react-native-fast-image";
import {style} from "../../common/styles/ArticleStyle";
import ProtoButton from '../../common/components/ProtoButton'
import {BACKGROUND_COLOR_WHITE, CARD_ON_PLAY, PRIMARY_TEXT_COLOR} from "../../common/styles/variables";
import Loader from "../../common/components/Loader";

function hiliter(word, element) {
    var rgxp = new RegExp(word, 'g');
    var repl = `<b class="highlightedText"> ` + word + '</b>';
    if (__DEV__){
        console.log("highlighter : element " , element)
    }
    return element.replace(rgxp, repl);
}

class ArticleView extends Component {
    props: { item: FeedItem };

    constructor() {
        super();
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.playOrPause = this.playOrPause.bind(this);
        this.isPlaying = this.isPlaying.bind(this);
        this.getPlayOrPause = this.getPlayOrPause.bind(this);
        this.onBookmarkPressed = this.onBookmarkPressed.bind(this);
        this.onLinkPressed = this.onLinkPressed.bind(this);
        this.onHtmlParsed = this.onHtmlParsed.bind(this);
        this.state = {is_html_parsed:false, is_mounting:true}
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.setState({is_mounting: false});
        })
    }


    componentWillMount() {
        let item = {};
        if (this.props.navigation && this.props.navigation.state.params.item) {
            item = this.props.navigation.state.params.item;
        } else {
            item = this.props.item;
        }
        this.html = this.getHtml(item.desc_original);
        // htmlToDisplay = `${this.html + style}`;

    }

    componentWillReceiveProps(nextProps) {
        let item = {};
        if (this.props.navigation && this.props.navigation.state.params.item) {
            item = this.props.navigation.state.params.item;
        } else {
            item = this.props.item;
        }
        const {playing: {text}} = nextProps.tts;
        if (this.isPlaying() && text) {
            this.html = this.getHtml(hiliter(text.trim(), item.desc_original));
            if (__DEV__) {
                console.log(" Article View :  html ", this.html);
            }
        } else {
            this.html = this.getHtml(item.desc_original);

        }

    }

    getHtml(desc_original){
        return`<body><div style="padding-top: 10px;" class = 'main'>${desc_original}</div></body>`;

    }

    zoomIn() {
        this.props.zoomInText();
    }

    zoomOut() {
        this.props.zoomOutText();
    }

    playOrPause() {
        const {play_status} = this.props.tts;
        if (this.isPlaying()) {
            if (play_status === "playing") {
                this.pause();
            } else {
                this.play();
            }
        } else {
            this.play();
        }


    }

    pause() {
        this.props.pause();
    }

    play() {
        let item = {};
        if (this.props.navigation && this.props.navigation.state.params.item) {
            item = this.props.navigation.state.params.item;
        } else {
            item = this.props.item;
        }
        const isPlaying = this.isPlaying();
        if (isPlaying) {
            const {playing: {index}, playing_item} = this.props.tts;
            this.props.play(playing_item, index);
        } else {
            this.props.play(item, 0);
        }

    }

    isPlaying() {
        let item = {};
        if (this.props.navigation && this.props.navigation.state.params.item) {
            item = this.props.navigation.state.params.item;
        } else {
            item = this.props.item;
        }
        const {playing_item} = this.props.tts;
        if (playing_item) {
            return playing_item.id === item.id;
        }
        return false;

    }

    getPlayOrPause() {
        const {playing: {index}, playing_item, play_status} = this.props.tts;
        const pauseOrPlay = play_status === "playing" ? "Pause" : "Play";
        if (this.isPlaying()) {
            return pauseOrPlay;
        }
        return "Play"
    }

    onBookmarkPressed() {
        const {toast} = this.props.i18n;
        let item = null;
        if (this.props.navigation && this.props.navigation.state.params.item) {
            item = this.props.navigation.state.params.item;
        } else {
            item = this.props.item;
        }
        if (item) {
            item['bookmark_time'] = Date.now();
            if (!item.bookmarked) {
                item['bookmarked'] = true;
                this.props.bookmark(item);
                ToastAndroid.show(toast.item_bookmarked, ToastAndroid.SHORT);
            } else {
                item['bookmarked'] = false;
                this.props.remove_bookmark(item);
                ToastAndroid.show(toast.item_removed_from_bookmarked, ToastAndroid.SHORT);
            }
        }

    };

    onLinkPressed(event, href) {
        if (__DEV__) {
            console.log("On link pressed : ", href, event);
        }
        if (href) {
            if (href.includes("/"))
                this.props.navigation.navigate(SCREENS.WebViewer, {link: href})
        }
    }

    onHtmlParsed(){
        this.setState({is_html_parsed:true})
    }


    render() {
        if (this.state.is_mounting){
            return <Loader/>
        }
        // if (!this.state.is_html_parsed){
        //     return <Loader/>
        // }
        let htmlContent;
        let item = null;
        if (this.props.navigation && this.props.navigation.state.params.item) {
            item = this.props.navigation.state.params.item;
        } else {
            item = this.props.item;
        }
        const {fontSize} = this.props;

        const playOrPause = this.getPlayOrPause();
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor={PRIMARY_TEXT_COLOR}
                    hidden={true}
                    barStyle="light-content"
                    animate = {true}
                />
                <View style={{
                    position: 'absolute',
                    zIndex: 999,
                    bottom: 0,
                    right: 0,
                }}>
                    <ZoomButton right={true} onClick={this.zoomIn}/>
                </View>
                <View style={{
                    position: 'absolute',
                    zIndex: 999,
                    bottom: 0,
                    left: 0,
                }}>
                    <ZoomButton right={false} onClick={this.zoomOut}/>
                </View>
                <DetailHeaderArticleView
                    onPlay={this.playOrPause}
                    closeArticleView={this.props.closeArticleView}
                    isArticleView={true}
                    item={item}
                    playOrPause={playOrPause}
                    onBookmarkClicked={this.onBookmarkPressed}/>

                <ScrollView contentContainerStyle={styles.container}>
                    <HTML
                        html={this.html}
                        // onParsed={this.onHtmlParsed}
                        onLinkPress={this.onLinkPressed}
                        imagesMaxWidth={Dimensions.get('window').width}
                        baseFontStyle={{fontSize: fontSize,color: BACKGROUND_COLOR_WHITE, lineHeight: 32,}}
                        renderers={{
                            img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                                return (
                                    <ProtoArticleViewImage
                                        key={htmlAttribs.src}
                                        from={SCREENS.ArticleView}
                                        source={{uri: htmlAttribs.src}}
                                        style={{width: '100%', height: 250}}
                                        resizeMode={FastImage.resizeMode.contain}
                                    />
                                )
                            }
                        }}
                        tagsStyles={{
                            p: {margin: 16, marginTop: 0,},
                            body: {margin: 0, padding: 0},
                        }}
                        classesStyles={{
                            main: {backgroundColor: '#000', margin: 0, padding: 0},
                            highlightedText: {
                                backgroundColor: 'rgba(255,255,0,0.2)',
                                borderRadius: 4,
                                // marginLeft: 2,
                                // marignRight: 2,
                                // marginBottom: 4,
                                borderBottomColor: 'rgba(255,255,0.4)',
                                borderBottomWidth: 3
                            }
                        }}
                    />
                    {/*<View style={styles.buttonVessel}>*/}
                    {/*<ProtoButton*/}
                    {/*buttonWidth='50%'*/}
                    {/*style={{backgroundColor: '#212121'}}*/}
                    {/*iconName='logOut'*/}
                    {/*label={this.props.i18n.button_labels.article_exit_button}*/}
                    {/*tintColor={BACKGROUND_COLOR_WHITE}*/}
                    {/*onClick={this.props.navigation.goBack}*/}
                    {/*/>*/}
                    {/*</View>*/}

                </ScrollView>
            </View>
        );
    }


}

const mapStateToProps = (state) => {
    return {fontSize: getFontSize(state), tts: state.tts}
};

export default connect(mapStateToProps,
    {zoomInText, zoomOutText, play, pause, bookmark, remove_bookmark}
)(connectLocalization(ArticleView));

const styles = EStyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    materialButton: {
        backgroundColor: '#212121',
    },
    buttonVessel: {
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    }
});
