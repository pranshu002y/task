import React, { useState } from 'react';
import './App.css';
import Projects from './Projects';
import Tasks from './Tasks';
import { ProjectsProvider } from './ProjectsContext';

function App() {
  const [selectedProject, setSelectedProject] = useState(0);

  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
  };

  return (
    <div className="App">
      <h1>Time Tracking Application</h1>
      <ProjectsProvider>
        <Projects handleProjectSelect={handleProjectSelect} />
        <Tasks selectedProject={selectedProject} />
      </ProjectsProvider>
    </div>
  );
}

export default App;
