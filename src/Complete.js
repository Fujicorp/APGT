import React from 'react'
import {FlatList, View, TouchableOpacity, Text, Image} from 'react-native'

export default class FriendListScreen extends React.Component{

    static navigationOptions = (props) => ({
        title:'Completo',
        tabBarIcon:({tintColor}) => <Image style={{width:40, height:40, tintColor:tintColor}}/>,
    })

    constructor(){
        super();


    }

    render(){
        return (
            <View>
            
            </View>
        )
    }

}