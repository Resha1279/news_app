import {ON_CONNECTIVITY_CHANGED} from "./type";

const INITIAL_STATUS = {
    is_available:false,
    type: {},
    effectiveType:{}
};

export default (state=INITIAL_STATUS,action)=>{
    switch (action.type) {
        case ON_CONNECTIVITY_CHANGED:
            const {is_available, type, effectiveType} = action.payload;
            return {...state, is_available, type, effectiveType };
        default:
            return state;

    }
}