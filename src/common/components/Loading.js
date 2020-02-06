import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

export default class Loading extends React.PureComponent
{
    render()
    {
        return(
            <View style ={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flex:1,
        padding:20,
        justifyContent:'center',
        alignItems:'center',

    },
});

