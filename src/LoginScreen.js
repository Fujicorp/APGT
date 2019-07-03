import React from 'react'
import {FlatList, View, TouchableOpacity, Text, Image} from 'react-native'

export default class LoginScreen extends React.Component{
    constructor(props) {
        super(props);
        realm = new Realm({
          path: 'UserDatabase.realm',
          schema: [
            {
              name: 'activity',
              properties: {
                act_id: { type: 'int', default: 0 },
                title: 'string',
                description: 'string',
                deadline: 'string',
                completion: 'string',
              },
            },
          ],
        });
    }

    render(){
        return (
            <View style={{flex:1, justifyContent:'center'}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('login')} style={{alignSelf:'center'}}>
                    <Text style={{fontSize:36}}>Acessar</Text>
                </TouchableOpacity>
            </View>
        )
    }

}