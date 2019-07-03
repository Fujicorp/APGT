import React from 'react'
import {FlatList, ListView, View, TouchableOpacity, Text, Image} from 'react-native'
var Realm = require('realm');
let realm;

export default class PendingScreen extends React.Component{

    static navigationOptions = {
        title:'Pendentes',
        tabBarIcon:({tintColor}) => <Image style={{width:40, height:40, tintColor:tintColor}} />
    }

    constructor(props){
        super(props);
        realm = new Realm({ path: 'UserDatabase.realm' });
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        });
        var activity = realm.objects('activity');
        this.state = {
          dataSource: ds.cloneWithRows(activity),
        };

    }

    render(){
        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={rowData => (
                        <TouchableOpacity 
                            onPress={() => {this.props.navigation.navigate('activity', {id:rowData.act_id, 
                                title:rowData.title, description:rowData.description, deadline: rowData.deadline, completion: rowData.completion});}}
                            style={{width:'100%', height:70, flexDirection:'row', paddingHorizontal:20, borderBottomWidth:1, borderColor:'#0002'}}>
                            <View style={{alignSelf:'center', marginLeft:10}}>
                                <Text style={{color:'gray'}}>{rowData.title}</Text>
                                <Text>{rowData.deadline}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }

}