// contexts/TaskContext
import React, { createContext, useContext, useState } from 'react';
import taskData from '../data/tasks.json'; // Adjust path if needed

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(taskData);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
