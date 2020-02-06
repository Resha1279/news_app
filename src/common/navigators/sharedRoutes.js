import {SCREENS} from "../constants/index";
import ImagesViewer from "../../Shared/screens/ImagesViewer";
import ProtoViewPager from "../../Shared/screens/ProtoDetailView";
import FeedsDetail from "../../Shared/screens/FeedsDetail";
import ArticleView from "../../Shared/screens/ArticleView";
import WebViewer from "../../Shared/screens/WebViewer";
import ReaderView from "../../Shared/screens/ReaderView";
import License from "../../Settings/screen/License";
import {headerOptions} from "../styles/headerOptions";
import About from "../../Settings/screen/About";

const sharedConfig = {
    [SCREENS.ImageViewer]: {
        screen: ImagesViewer,
        navigationOptions: {
            header: null,
        }
    }, [SCREENS.ProtoDetailView]: {
        screen: ProtoViewPager,
        navigationOptions: {
            header: null,
        }
    },

    [SCREENS.ArticleView]: {
        screen: ArticleView,
        navigationOptions: {
            header: null,
        }
    },
    [SCREENS.WebViewer]: {
        screen: WebViewer,
        navigationOptions: {
            header: null,
        }
    },
    [SCREENS.ReaderView]: {
        screen: ReaderView,
        navigationOptions: {
            header: null,
        }
    },
    [SCREENS.License]: {
        screen: License,
        ...headerOptions.common
    },
    [SCREENS.About]: {
        screen: About,
        ...headerOptions.common
    },

};

export const insideTabSharedRoutes = {
    [SCREENS.FeedsDetail]: {
        screen: FeedsDetail,
        navigationOptions: {
            header: null,
        }
    },

};

export default sharedConfig;
