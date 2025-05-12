// hooks/useAddTasks.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../utils/supabase';

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
mutationFn: async (newTask) => {
  const { data, error } = await supabase.from('tasks').insert([newTask]);

  if (error) {
    console.error('Supabase insert error:', error);
    throw new Error(error.message);
  }

  return data;
}
,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']); // Refresh task list
    },
  });
};
