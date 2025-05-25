import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://crbhnrxshkxnwnlvvkpi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyYmhucnhzaGt4bndubHZ2a3BpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2NjUzNTUsImV4cCI6MjA2MjI0MTM1NX0.styfKLk0GizURBKDG365H58fUsX0oJAPoUsTr7zAIk0',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
