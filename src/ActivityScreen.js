import React from 'react'
import {Alert, View, TouchableOpacity, Text, Button, StyleSheet} from 'react-native'
var Realm = require('realm');
let realm;

export default class ActivityScreen extends React.Component{
    constructor(props) {
        super(props);
        realm = new Realm({ path: 'UserDatabase.realm' });
    }

    deleteUser = () => {
        var that = this;
        realm.write(() => {
          var ID = this.props.navigation.state.params.id;
            realm.delete(
              realm.objects('activity').filtered('act_id =' + this.props.navigation.state.params.id)
            );
            var activity = realm.objects('activity');
            console.log(activity);
            Alert.alert(
              'Successo',
              'A atividade foi removida com sucesso',
              [
                {
                  text: 'Ok',
                  onPress: () => that.props.navigation.navigate('pending'),
                },
              ],
              { cancelable: false }
            );
        });
      };

    static navigationOptions = (props) => ({
        title: props.navigation.state.params.title
    })

    render(){
      return (
        <View>
          <View>
            <Text style={styles.item}>Descrição:</Text>
            <Text style={styles.detalhes}>{this.props.navigation.state.params.description}</Text>
            <Text style={styles.item}>Prazo: </Text>
            <Text style={styles.detalhes}>{this.props.navigation.state.params.deadline}</Text>
            <Text style={styles.item}>Progresso: </Text>
            <Text style={styles.detalhes}>{this.props.navigation.state.params.completion} %</Text>
            <Text style={styles.item}>Ações: </Text>
          </View>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('edit', {
              id:this.props.navigation.state.params.id, 
              title:this.props.navigation.state.params.title, 
              description:this.props.navigation.state.params.description, 
              deadline: this.props.navigation.state.params.deadline, 
              completion: this.props.navigation.state.params.completion});}}>
            <Text style={styles.acao}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.deleteUser}>
            <Text style={styles.acao}>Deletar</Text>
          </TouchableOpacity>
        </View>
      )
    }
}

const styles = StyleSheet.create({
    item: {
        margin: 10,
        fontSize: 18,
        borderBottomWidth:1,
        borderColor:'#0002'
    },
    detalhes: {
        margin: 20,
        fontSize: 22,
        marginTop: 10,
        marginBottom: 10
    },
    acao: {
      width: "100%",
      margin: 20,
      fontSize: 22
    },  
});
