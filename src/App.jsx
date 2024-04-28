import ProjectsSideBar from "./components/ProjectsSideBar";
import NewProject from "./components/NewProject";
import NoProject from "./components/NoProject";
import { useEffect, useState } from "react";
import SelectedProject from "./components/SelectedProject";
import { requestFunction } from "./requests/request";
import { ProjectContext } from "./store/add-new-task-context";
import { useDeviceWidth } from "./components/DeviceWidthFunction";
import { ProjectSidebarMobile } from "./components/ProjectSidebarMobile";

function App() {
  const deviceWidth = useDeviceWidth();
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects:[]
  })
  const fetchData = async () => {
    try {
      const projects = await requestFunction({ destination: 'projects', id: '', fetchMethod: 'GET', data: undefined });
      setProjectState(prevState => ({
        ...prevState,
        selectedProjectId: undefined,
        projects: [...projects]
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  
  
  function handleSelectProject(id){
    setProjectState(prevState=>{return{
      ...prevState, selectedProjectId:id,
    }})
  }
  const selectedProject = projectState.projects.find(project=>project.id === projectState.selectedProjectId)
  function handleStartProjectState(){
    setProjectState(prevState=>{return{
      ...prevState, selectedProjectId:null
    }})
  }
  
  
  const handleDeleteProject = async ()=>{
    await requestFunction({destination: 'projects', id: projectState.selectedProjectId, fetchMethod: 'DELETE', data: '' });
    await requestFunction({destination: 'projectTasks', id: projectState.selectedProjectId, fetchMethod: 'DELETE', data: '' });
    await fetchData();
    setProjectState(prevState=>{
      return{
        ...prevState, 
      selectedProjectId: undefined,}
    })
  }
  const handleAfterProjectEdit = async () => {
    const currentProjectId = projectState.selectedProjectId
    await fetchData();
    setProjectState(prevState=>{
      return{
        ...prevState, 
      selectedProjectId: currentProjectId,}
    })
    
  }
  let content = <SelectedProject onProjectEdit={handleAfterProjectEdit} project={selectedProject} onDelete={handleDeleteProject} />
  if(projectState.selectedProjectId === null){
    content = <NewProject fetchData={fetchData} setProjectState={setProjectState}/>
  }else if(projectState.selectedProjectId === undefined){
    content = <NoProject onStartNewProject={handleStartProjectState} />
  }
  console.log(deviceWidth);
  return (<ProjectContext.Provider value={handleAfterProjectEdit}>
    <main className=" h-screen flex gap-8">
      {deviceWidth> 500? <ProjectsSideBar selectedProjectId={projectState.selectedProjectId} onSelectProject={handleSelectProject} onStartNewProject={handleStartProjectState} projects={projectState.projects} />: <ProjectSidebarMobile />}
      {content}
    </main>
    </ProjectContext.Provider>
  );
}

export default App;
