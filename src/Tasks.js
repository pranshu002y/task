import React, { useState, useContext, useEffect } from 'react';
import { ProjectsContext } from './ProjectsContext';

const Tasks = ({ selectedProject }) => {
  const { projects, setProjects } = useContext(ProjectsContext);
  const [taskName, setTaskName] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const setSelectedProject = (projectId) => {
    // Add any custom logic you need when selecting a project
  };

  useEffect(() => {
    const tasksFromStorage = JSON.parse(localStorage.getItem('tasks') || '[]');
    setProjects((prevProjects) =>
      prevProjects.map((project, index) =>
        index === selectedProject ? { ...project, tasks: tasksFromStorage } : project
      )
    );
  }, [selectedProject]);

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
    setShowModal(false);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() !== '' && timeSpent.trim() !== '') {
      const newTask = {
        name: taskName,
        timeSpent: parseFloat(timeSpent),
        description: description,
      };

      const tasksFromStorage = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasksFromStorage.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(tasksFromStorage));

      setProjects((prevProjects) =>
        prevProjects.map((project, index) =>
          index === selectedProject ? { ...project, tasks: [...project.tasks, newTask] } : project
        )
      );

      setTaskName('');
      setTimeSpent('');
      setDescription('');
    }
  };

  const getTotalHours = () => {
    if (projects.length > 0 && projects[selectedProject]?.tasks?.length > 0) {
      return projects[selectedProject].tasks.reduce(
        (total, task) => total + task.timeSpent,
        0
      );
    }
    return 0;
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  return (
    <div>
      <h2>Tasks</h2>
      <div>
        <h3>Select a Project</h3>
        <select value={selectedProject} onChange={handleProjectChange}>
          {projects.map((project, index) => (
            <option key={index} value={index}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <form onSubmit={handleTaskSubmit}>
        <div>
          <label>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task Name"
          />
        </div>
        <div>
          <label>Time Spent (hours):</label>
          <input
            type="number"
            step="0.1"
            value={timeSpent}
            onChange={(e) => setTimeSpent(e.target.value)}
            placeholder="Time Spent"
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
        <div className='btn'><button type="submit">Add Task</button> </div>
        
      </form>
      {projects[selectedProject]?.tasks?.length === 0 ? (
        <p>No tasks added for this project yet.</p>
      ) : (
        <div>
          <h3>Total Hours Covered for the Day:</h3>
          <p>{getTotalHours()} hours</p>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Time Spent: {selectedTask ? selectedTask.timeSpent : ''} hours</h3>
            <p>{selectedTask ? selectedTask.description : ''}</p>
          
           <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
