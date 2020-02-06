import {createSelector} from 'reselect';

const getSettings = state => state.settings;
const getTts = state => state.tts;
const getWelcome = state => state.settings.welcomed;
export const getLoadImageOnData = createSelector(
  [getSettings],
  settings => {
    return settings.load_image_on_data;
  },
);

export const getFontSize = createSelector(
  [getSettings],
  settings => {
    return settings.font_size;
  },
);

export const getFeedListViewType = createSelector(
  [getSettings],
  settings => {
    return settings.feed_list_view_type;
  },
);

export const getCurrentTabRoute = createSelector(
  [getSettings],
  settings => {
    return settings.current_tab_route_name;
  },
);

export const getCurrentRoute = createSelector(
  [getSettings],
  settings => {
    return settings.current_route;
  },
);

export const getTtsDataForSettings = createSelector(
  [getTts],
  tts => {
    return {
      lang_status: tts.lang_status,
      initialization_status: tts.initialization_status,
      is_playing: tts.is_playing,
      speech_rate: tts.speech_rate,
    };
  },
);

export const isAppOpenedForFirstTime = createSelector(
  [getSettings],
  settings => {
    return settings.is_app_opened_for_first_time;
  },
);

export const isWelcomed = createSelector(
  [getWelcome],
  welcomed => {
    return welcomed;
  },
);
