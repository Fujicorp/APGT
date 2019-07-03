import React from 'react'
import {FlatList, View, TouchableOpacity, Text, Image, StatusBar, Platform} from 'react-native'

import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation'
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import CompleteScreen from './Complete'
import PendingScreen from './Pending'
import ActivityScreen from './ActivityScreen'
import EditScreen from './EditActivity'
import LoginScreen from './LoginScreen'
import AddActivity from './AddActivity'

//Tab
const Tab = TabNavigator({
    pending:{screen:PendingScreen},
    complete:{screen:CompleteScreen}   
},{
    tabBarOptions:{
        activeTintColor:'#4d3241',
        style:{backgroundColor:Platform.select({ios:'white', android:'#4d3241'}), borderTopColor: 'transparent', borderTopWidth: 0, elevation: 0},
        labelStyle:{color:Platform.select({ios:null, android:'#fff'})},
        indicatorStyle:{backgroundColor:'#fff'},
    }
})

const TabNavigationOptions = (props) => ({
    title:'APGT',
    headerStyle:{backgroundColor:'#4d3241', borderBottomColor: 'transparent', borderBottomWidth: 0, elevation: 0},
    headerLeft:<AddButton {...props} />
})

const StackNavigationOptions = (props) => ({
    headerStyle:{backgroundColor:'#4d3241'},
    headerTitleStyle:{color:'white'},
    headerTintColor:'white',
    headerBackTitle:null,
})

export const AddButton = (props) => (
    <TouchableOpacity onPress={() => props.navigation.navigate('add')}>
        <Image style={{marginLeft:15, width:24, height:24}} source={require('./../res/add1.png')}/>
    </TouchableOpacity>
)

//Stack
const Stack = StackNavigator({
    root:{screen:Tab, navigationOptions:TabNavigationOptions},
    activity:{screen:ActivityScreen},
    add:{screen:AddActivity},
    edit:{screen:EditScreen}
},{
    navigationOptions:StackNavigationOptions,
    transitionConfig:getSlideFromRightTransition
})

//Drawer
const Drawer = DrawerNavigator({
    main:{screen:Stack}
},{
    navigationOptions:{
        drawerLockMode:'locked-closed',
    },
    backBehavior:'none'
})

//Modal Stack (root)
const ModalStack = StackNavigator({
    logout:{screen:LoginScreen},
    login:{screen:Drawer}
},{
    mode:'modal',
    headerMode:'none'
})

export default class Navigation extends React.Component{
    render(){
        return([
            <StatusBar key='statusbar' barStyle="light-content"/>,
            <ModalStack key='navigation'/>
        ])
    }
}
