export const __DEV__ = true;
export const MAX_FEEDS_ITEMS = 60;
export const FEEDS_BATCH = 20;
export const ANDROID_PACKAGE_NAME = 'com.qbitsx.tech_news';
export const VERSION_CODE = '1.4';
export const DEFAULT_FONT_SIZE = 22;
export const MAX_FONT_SIZE = 24;
export const MINIMUM_FONT_SIZE = 20;
export const TTS_LANG = 'en-US';
export const APP_NAME = 'tech_news_app';
export const NOTIFICATION_CHANNEL_ID = 'notification_channel_id';
export const NOTIFICATION_CHANNEL_DESCRIPTION =
  'notification channel description';
export const FEED_LIST_VIEW_TYPES = ['detail', 'normal', 'minimal'];
export const VIEW_TYPE_CHANGE_LOADING_TIME = 3000;

export const DEFAULT_FEED_LIST_VIEW_TYPE = FEED_LIST_VIEW_TYPES[0];

export const SCREENS = {
  Main: 'Main',
  Login: 'Login',
  Home: 'Home',
  Initial: 'Initial',
  ImageViewer: 'ImageViewer',
  Test: 'Test',
  IntroPager: 'LanguageSelect',
  ProtoDetailView: 'ProtoDetailView',
  Feeds: 'Feeds',
  FeedCategory: 'FeedCategory',
  FeedsDetail: 'FeedsDetail',
  ArticleView: 'ArticleView',
  ReaderView: 'ReaderView',
  Epapers: 'Epapers',
  EpapersCategory: 'EpapersCategory',
  Library: 'Library',
  LibraryCategories: 'LibraryCategories',
  Downloads: 'Downloads', // inside library
  Bookmarks: 'Bookmarks', // ''
  Portals: 'Portals',
  PortalsList: 'PortalsList',
  PortalsCategories: 'PortalsCategories',
  WebViewer: 'ProtoWebView',
  Settings: 'Settings',
  License: 'License',
  About: 'About',
};
export const ADS_INTERVAL = 3;

export const PORTALS_CATEGORIES = [
  {key: 'popular', title: 'popular'},
  {key: 'general', title: 'general'},
  {key: 'industry', title: 'industry'},
  {key: 'apps', title: 'apps'},
];

export const PORTALS_CATEGORIES_TITLE = [
  'popular',
  'general',
  'industry',
  'apps',
];

export const FEEDS_CATEGORIES = [
  {key: 'phones', title: 'phones'},
  {key: 'security', title: 'security'},
  {key: 'techindustry', title: 'techindustry'},
  {key: 'apps', title: 'apps'},
  {key: 'gadgets', title: 'gadgets'},
  {key: 'gaming', title: 'gaming'},
  {key: 'miscellaneous', title: 'miscellaneous'},
];

export const FEEDS_CATEGORIES_TITLE = [
  'phones',
  'security',
  'techindustry',
  'apps',
  'gadgets',
  'gaming',
  'miscellaneous',
];

export const VIEW_PAGER_FEED_CATEGORY = FEEDS_CATEGORIES[4];

export const EPAPERS_CATEGORIES = [
  {key: 'favourites', title: 'Favourites', title_other: 'Favourites Np'},
  {key: 'daily', title: 'Daily', title_other: 'Daily Np'},
  {key: 'weekly', title: 'Weekly', title_other: 'Weekly Np'},
  {key: 'monthly', title: 'Monthly', title_other: 'Monthly Np'},
];

export const ADMOD_APP_ID = 'ca-app-pub-2614489627379437~1388061228';

export const ADS_PLACEMENT_IDS = {
  test: {
    fb: {
      banner: 'IMG_16_9_LINK#102101467085455_202419810386953',
      interstitial:
        'CAROUSEL_IMG_SQUARE_APP_INSTALL#102101467085455_202419810386953',
      video: 'VID_HD_16_9_46S_APP_INSTALL#102101467085455_202419810386953',
      native: '2204795092928818_2204795409595453',
      // IMG_16_9_APP_INSTALL#102101467085455_115548542407414
    },
    admob: {
      banner: 'ca-app-pub-3940256099942544/6300978111',
      interstitial: 'ca-app-pub-3940256099942544/1033173712',
      interstitial_video: 'ca-app-pub-3940256099942544/8691691433',
      video: 'ca-app-pub-3940256099942544/5224354917',
    },
  },
  release: {
    fb: {
      // banner: "IMG_16_9_LINK#102101467085455_202419810386953",
      // interstitial: "CAROUSEL_IMG_SQUARE_APP_INSTALL#102101467085455_202419810386953",
      // video: "VID_HD_16_9_46S_APP_INSTALL#102101467085455_202419810386953",
      native: '2204795092928818_2204795409595453',
      // 2204795092928818_2204795409595453
    },
    admob: {
      banner: 'ca-app-pub-2614489627379437/3153688596',
      interstitial: 'ca-app-pub-2614489627379437/3942906525',
      interstitial_video: 'ca-app-pub-2614489627379437/3942906525',
      // video: "ca-app-pub-3940256099942544/5224354917"
    },
  },
};
