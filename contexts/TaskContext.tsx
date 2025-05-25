import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetTasks } from '../hooks/useGetTasks';
import { Task } from '../types'; // Adjust the path if needed

interface TaskContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  isLoading: boolean;
  error: Error | null;
}

interface TaskProviderProps {
  children: ReactNode;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { data: fetchedTasks, error: fetchError } = useGetTasks();

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

  useEffect(() => {
    if (fetchedTasks) {
      setTasks(fetchedTasks);
      AsyncStorage.setItem('tasks', JSON.stringify(fetchedTasks)).catch((err) =>
        console.error('Failed to cache tasks:', err),
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

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
