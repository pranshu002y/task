import React, { createContext, useState } from 'react';

export const ProjectsContext = createContext();

export function ProjectsProvider(props) {
  const [projects, setProjects] = useState([]);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {props.children}
    </ProjectsContext.Provider>
  );
}
