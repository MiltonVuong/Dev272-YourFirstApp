# Task Management App

This repository contains a React Native task management app with Supabase integration, React Query for data fetching and mutation, and AsyncStorage for caching and session persistence.

---

## 📦 Supabase Configuration and Table Setup

### Supabase Client

The Supabase client is initialized using:

- **Project URL** and **anon key**
- `AsyncStorage` for session persistence
- Auto-refreshing tokens and session detection disabled in URLs

```ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient('https://your-project.supabase.co', 'your-anon-key', {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

Tasks Table Schema
-The tasks table in Supabase should include:

Column	    Type	    Description
id	        int8	    Primary key
title	      Text	    Task title (required)
description	Text	    Optional task description

React Query Usage
-Fetching Tasks

useQuery({
  queryKey: ['tasks'],
  queryFn: async () => {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) throw new Error(error.message);
    return data;
  },
});

-Adding Tasks

useMutation({
  mutationFn: async (newTask) => {
    const { data, error } = await supabase.from('tasks').insert([newTask]);
    if (error) throw new Error(error.message);
    return data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['tasks']);
  },
});

AsyncStorage Implementation
-Caching Tasks
--On app startup, cached tasks are loaded from AsyncStorage if available.
--When tasks are fetched from Supabase, they are saved to AsyncStorage for offline access.

useEffect(() => {
  const loadCachedTasks = async () => {
    const cached = await AsyncStorage.getItem('tasks');
    if (cached) setTasks(JSON.parse(cached));
  };
  loadCachedTasks();
}, []);

useEffect(() => {
  if (fetchedTasks) {
    setTasks(fetchedTasks);
    AsyncStorage.setItem('tasks', JSON.stringify(fetchedTasks));
  }
}, [fetchedTasks]);
