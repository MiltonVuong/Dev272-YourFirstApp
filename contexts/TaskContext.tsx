// contexts/TaskContext.tsx

import React, { createContext, useContext, useState } from 'react';
import taskData from '../data/tasks.json'; // Initial task data

// Create context for managing tasks
const TaskContext = createContext();

// Provider component to wrap the app with task state
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(taskData);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to access task context
export const useTasks = () => useContext(TaskContext);
