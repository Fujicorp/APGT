import React from 'react'
import {FlatList, View, StyleSheet, TouchableOpacity, Text, TextInput, Button, Alert } from 'react-native'
//var Realm = require('realm');
const Realm = null;
let realm;


export default class AdvancedScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            deadline: '',
        };
        if (Realm === null) { Realm = require('realm'); };
        realm = new Realm({ path: 'UserDatabase.realm'});
    }

    add_activity = () => {
        var that = this;
        const { title } = this.state;
        const { description } = this.state;
        const { deadline } = this.state;
        if (title) {
            if (description) {
                if (deadline) {
                    realm.write(() => {
                        var ID = realm.objects('activity').sorted('act_id', true).length > 0
                        ? realm.objects('activity').sorted('act_id', true)[0].act_id + 1 : 1;
                        realm.create('activity', {
                            act_id: ID,
                            title: that.state.title,
                            description: that.state.description,
                            deadline: that.state.deadline,
                            completion: "0",
                        });
                        Alert.alert(
                            'Sucesso', 'A atividade foi inserida com sucesso', [
                                {
                                    text: 'Ok',
                                    onPress: () => that.props.navigation.navigate('pending'),
                                },
                            ],
                            { cancelable: false }
                        );
                    });
                } else {
                    alert('Por favor preencher o prazo');
                }
            } else {
                alert('Por favor preencher a descrição');
            }
        } else {
            alert('Por favor preencher o título');
        }
    };

    static navigationOptions = (props) => ({
        title:'Adicionar Atividade',
    })
//<Text>key of previous screen : {this.props.navigation.state.params.keyGoBackToRoot}</Text>
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text>Titulo</Text>
                    <TextInput onChangeText={title => this.setState({ title })} />
                    <Text>Descrição</Text>
                    <TextInput onChangeText={description => this.setState({ description })}></TextInput>
                    <Text>Prazo</Text>
                    <TextInput onChangeText={deadline => this.setState({ deadline })}></TextInput>
                    <Button title="Salvar" onPress={this.add_activity.bind(this)} />      
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    form: {
        width: "80%",
        justifyContent: 'flex-start',
        padding: 20
    }
  });
  