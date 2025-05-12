import { useQuery } from '@tanstack/react-query';
import { supabase } from '../utils/supabase';

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase.from('tasks').select('*');

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }

      console.log('Fetched tasks:', data); // 👈 Add this

      return data;
    },
  });
};
