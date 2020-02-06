import {createSelector} from "reselect";
import {__DEV__, ADS_INTERVAL} from "../common/constants";
import {insertAdsFeeds, objectToList} from "../common/utils";

const getPortals = (state, category) => state.portals;
const getCategory = (state,category)=>category;
export const getPortalsOfCategory = createSelector(
    [getPortals,getCategory],
    (portals,category) => {
        let items_with_ads = [];
        if (__DEV__){
            console.log("selector : Portals : state : category ", portals, category);
        }

        if (portals[category.key]){
            const items = objectToList(portals[category.key]['items']);
            items_with_ads = items;
        }
        return {...portals[category.key], items: items_with_ads};
    });
