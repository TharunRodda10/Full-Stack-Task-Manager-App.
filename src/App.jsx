import React, { useEffect, useState } from 'react';
import TaskService from './services/TaskService';
import TaskList from './components/TaskList';

function App() {
  const userId = 1;
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await TaskService.getTasks(userId);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;