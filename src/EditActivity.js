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
            completion: '',
        };
        if (Realm === null) { Realm = require('realm'); };
        realm = new Realm({ path: 'UserDatabase.realm'});
    }

    update_activity = () => {
        var that = this;
        const { title } = this.state;
        const { description } = this.state;
        const { deadline } = this.state;
        const { completion } = this.state;
        if (title) {
            if (description) {
                if (deadline) {
                    if (completion) {
                        realm.write(() => {
                            var ID = this.props.navigation.state.params.id;
                            var obj = realm
                            .objects('activity')
                            .filtered('act_id =' + this.props.navigation.state.params.id);
                            if (obj.length > 0) {
                                obj[0].title = this.state.title;
                                obj[0].description = this.state.description;
                                obj[0].deadline = this.state.deadline;
                                obj[0].completion = this.state.completion;
                                Alert.alert(
                                    'Sucesso', 'A atividade foi editada com sucesso', [
                                        {
                                            text: 'Ok',
                                            onPress: () => that.props.navigation.navigate('pending'),
                                        },
                                    ],
                                    { cancelable: false }
                                );
                            }
                        });
                    } else {
                        alert('Por favor preencher o progresso');
                    }
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
        title:'Editar Atividade',
    })
//<Text>key of previous screen : {this.props.navigation.state.params.keyGoBackToRoot}</Text>
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text>Titulo</Text>
                    <TextInput placeholder={this.props.navigation.state.params.title} onChangeText={title => this.setState({ title })} />
                    <Text>Descrição</Text>
                    <TextInput placeholder={this.props.navigation.state.params.description} onChangeText={description => this.setState({ description })}></TextInput>
                    <Text>Prazo</Text>
                    <TextInput placeholder={this.props.navigation.state.params.deadline} onChangeText={deadline => this.setState({ deadline })}></TextInput>
                    <Text>Progresso</Text>
                    <TextInput placeholder={this.props.navigation.state.params.completion} onChangeText={completion => this.setState({ completion })}></TextInput>
                    <Button title="Salvar" onPress={this.update_activity.bind(this)} />      
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
  