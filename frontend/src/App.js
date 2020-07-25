import React, {useState, useEffect} from "react";
import api from './services/api'
import './App.css'
import Header from "./Components/Header"


function App(){

  const [projects, setProjects] = useState([])
  
  useEffect(() => {
    api.get('projects').then(response=>{
      setProjects(response.data)
    })
  }, [])
  async function hanleAddProject(){
    /* setProjects([... projects, `Novo projeto ${Date.now()}`]) */

    const response = await api.post('projects',{
      title: `Novo projeto ${Date.now()}`,
      owner: "Carlos Eduardo teixeira silva"
    })
    const project = response.data

    setProjects([... projects, project])
  }
    return (
      <>
        <Header title="Projects" />
        <ul>
          {projects.map(project => <li key={project.id}>{project.title}</li> )}
        </ul>
        <button type="button" onClick={hanleAddProject}>
          Adicionar Projeto
        </button>
      </>
    );
}

export default App