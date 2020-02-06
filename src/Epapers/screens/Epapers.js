import {Component} from 'react';
import React from "react";
import {Text} from 'react-native';
import FeedsList from "../../common/containers/FeedsList";
import EpapersList from "../../common/containers/EpapersList";


class Epapers extends Component{
    constructor(){
        super();
    }

    render() {
        return (
            <EpapersList item={this.props.item}/>
        );
    }

}

export default Epapers;
