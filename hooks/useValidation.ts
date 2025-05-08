// hooks/useValidation.ts
import { useState } from 'react';

export const useValidation = () => {
  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>({});

  const validate = (title: string, dueDate: string) => {
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = 'Title is required.';

    const dateTimeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM) (0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/;
    if (dueDate && !dateTimeRegex.test(dueDate)) {
      newErrors.dueDate = 'Format must be hh:mm AM/PM MM-DD-YYYY';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};
