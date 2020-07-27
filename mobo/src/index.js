import React, {useEffect, useState} from 'react'
import { SafeAreaView ,FlatList , Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import api from './services/api'

export default function App(){
    const [ projects, SetProjects] = useState([])
    useEffect(()=>{
        api.get('projects').then(res =>{
          console.log(res.data)
          SetProjects(res.data) 
        })
    },[])
    
   async function handleAddProject(){
      const res = await api.post('projects',{
        title: `Carlos criado as: ${Date.now()}`,
        onwer: 'Carlos Silva'
      })
      const project = res.data
      SetProjects([...projects, project])
    }

    return (
      <>
      <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container} >
          <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project} key={project.id}>{project.title}</Text>
          )}
          />
          <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleAddProject}>
            <Text style={styles.buttonText}>Adicionar Projeto</Text>
          </TouchableOpacity>
        </SafeAreaView>
{/*         <StatusBar barStyle="dark-content" backgroundColor="#7159c1" />
        <View style={styles.container}>
          {projects.map(project => (<Text style={styles.project} key={project.id}>{ project.title }</Text>
          ))}
        </View> */}
      </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#7159c1',
    },
    project:{
        color: '#fff',
        fontSize: 30,
    },
    button:{
      backgroundColor: '#fff',
      margin: 20,
      height: 50,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: { 
      fontWeight: 'bold',
      fontSize: 16
    }
})