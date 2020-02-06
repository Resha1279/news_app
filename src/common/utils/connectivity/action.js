import {ON_CONNECTIVITY_CHANGED} from "./type";

export function onConnectivityStatusChange(netInfo){
    const {type, effectiveType} = netInfo;
    const is_available = type !== 'none';
    return ({type:ON_CONNECTIVITY_CHANGED, payload:{is_available,type, effectiveType}})
}