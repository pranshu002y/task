import React, { useState, useContext } from 'react';
import { ProjectsContext } from './ProjectsContext';

const Projects = ({ handleProjectSelect }) => {
  const { projects, setProjects } = useContext(ProjectsContext);
  const [projectName, setProjectName] = useState('');

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim() !== '') {
      const newProject = { name: projectName, tasks: [] };
      setProjects([...projects, newProject]);
      setProjectName('');
    }
  };

  return (
    <div>
      <h2>Create a Project</h2>
      <form onSubmit={handleProjectSubmit}>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project Name"
        />
        <div className='btn'>
        <button type="submit">Create Project</button>
        </div>
       
      </form>
      <h2>Project List</h2>
      {projects.length === 0 ? (
        <p>No projects created yet.</p>
      ) : (
        <ul>
          {projects.map((project, index) => (
            <li key={index} onClick={() => handleProjectSelect(index)}>
              {project.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Projects;
