// contexts/TaskContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetTasks } from '../hooks/useGetTasks';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data: fetchedTasks, error: fetchError } = useGetTasks();

  // Load cached tasks on mount
  useEffect(() => {
    const loadCachedTasks = async () => {
      try {
        const cached = await AsyncStorage.getItem('tasks');
        if (cached) {
          setTasks(JSON.parse(cached));
        }
      } catch (err) {
        console.error('Failed to load cached tasks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCachedTasks();
  }, []);

  // Update tasks and cache when fetched from Supabase
  useEffect(() => {
    if (fetchedTasks) {
      setTasks(fetchedTasks);
      AsyncStorage.setItem('tasks', JSON.stringify(fetchedTasks)).catch(err =>
        console.error('Failed to cache tasks:', err)
      );
    }

    if (fetchError) {
      setError(fetchError);
    }
  }, [fetchedTasks, fetchError]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, isLoading, error }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
