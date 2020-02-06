import firebase from 'react-native-firebase';
import events from '../constants/analytics_events';

export type FeedItemAnalytics = {
  category: string,
  from?: string,
  ago: string,
  bookmarked: boolean,
  has_image: boolean,
  load_more?: boolean,
};

export function feedsItemClicked(params) {
  firebase.analytics().logEvent(events.feeds_item, params);
}

export function feedsItemShare(params) {
  // same params
  firebase.analytics().logEvent(events.feeds_item_share, params);
}

export function feedsItemBookmark(params) {
  // same params
  firebase.analytics().logEvent(events.feeds_item_bookmark, params);
}

export function languageSwitchFromSettings() {
  firebase.analytics().logEvent(events.language_switch_from_settings);
}

export function articleViewOpen(from) {
  firebase.analytics().logEvent(events.article_view_open, {from});
}

export function feedsItemViewTypeChanged(view_type) {
  firebase
    .analytics()
    .logEvent(events.feeds_item_view_type_change, {view_type});
}

export function feedsItemPlay(params) {
  // play_status: ""
  firebase.analytics().logEvent(events.feeds_item_play, params);
}

export function tts_error(error_type) {
  firebase.analytics().logEvent(events.tts_error, {error_type});
}

export function portalItem(params) {
  firebase.analytics().logEvent(events.portal_item, params);
}

export function imageViewerOpened(from) {
  // from: string
  firebase.analytics().logEvent(events.image_viewer_opened, {from});
}

export function showVideoAdsClicked() {
  firebase.analytics().logEvent(events.show_video_ads_clicked);
}

export function inviteFriendsClicked() {
  firebase.analytics().logEvent(events.invite_friends_clicked);
}

export function inviteFriendsShareClicked() {
  firebase.analytics().logEvent(events.invite_friends_share_clicked);
}

export function inviteFriendsCopyToClipboardClicked() {
  firebase
    .analytics()
    .logEvent(events.invite_friends_copy_to_clipboard_clicked);
}

export function settingsClicked() {
  firebase.analytics().logEvent(events.settings_clicked);
}
