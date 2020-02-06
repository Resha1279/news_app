import {Dimensions} from 'react-native';
import {COLORS} from './colors';

// COMMON

export const PRIMARY_COLOR = COLORS.primaryBlue;
export const PRIMARY_COLOR_TRANSPARENT = COLORS.primaryBlueTransparent;
export const BACKGROUND_COLOR = COLORS.backgroundGrey;
export const BACKGROUND_COLOR_WHITE = COLORS.white;
export const CARD_BACKGROUND_COLOR = COLORS.white;
export const ICON_COLOR = COLORS.black;
export const CARD_ON_PLAY = COLORS.transparentRed;
export const SEPARATOR = COLORS.separator;

// HEADER AND TABS
export const STATUS_BAR = COLORS.black_decrease_s2;
export const STATUSBAR_HEIGHT = 20;
// header

export const HEADER_BACKGROUND_COLOR = COLORS.white;
export const HEADER_TINT_COLOR = COLORS.black_decrease_s1;
export const HEADER_SECONDARY_TINT_COLOR = COLORS.black_decrease_s2;
export const HEADER_ICON = COLORS.black_decrease_s2;
export const APPBAR_ICON = COLORS.primaryBlue;
export const APPBAR_HEIGHT = 50;

// top tab

export const ACTIVE_TAB = PRIMARY_COLOR;
export const INACTIVE_TAB = COLORS.black;
export const TAB_BACKGROUND_COLOR = COLORS.white;
export const TAB_TINT_COLOR = COLORS.primaryBlue;
export const TAB_HEIGHT = 40;

// bottom tab

export const ACTIVE_BOTTOM_TAB = PRIMARY_COLOR;
export const INACTIVE_BOTTOM_TAB = COLORS.black_decrease_s2;
export const BOTTOM_TAB_BACKGROUND_COLOR = COLORS.white;
export const BOTTOM_TAB_HEIGHT = 55;

// COMPONENT DIMENSIONS

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

// FONTS

// size

export const CAPTION_SIZE = 1.6;
export const PRIMARY_TEXT_SIZE = 1.4;
export const SECONDARY_TEXT_SIZE = 1;
export const TERTIARY_TEXT_SIZE = 0.8;

// color
export const CAPTION_COLOR = COLORS.black;
export const PRIMARY_TEXT_COLOR = COLORS.black_decrease_s1;
export const SECONDARY_TEXT_COLOR = COLORS.black_decrease_s1;
export const TERTIARY_TEXT_COLOR = COLORS.black_decrease_s2;

export const PRIMARY_TEXT_COLOR_WHITE = COLORS.white;
export const SECONDARY_TEXT_COLOR_WHITE = COLORS.white_decrease_s1;
export const TERTIARY_TEXT_COLOR_WHITE = COLORS.white_decrease_s2;
