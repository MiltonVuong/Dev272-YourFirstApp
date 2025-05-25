import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from './index';
import { useTasks } from '../../../contexts/TaskContext';

// Mock the router and theme hooks
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('../../../hooks/useThemeColor', () => ({
  useThemeColor: (_props: any, colorName: string) => {
    const colors = {
      background: '#fff',
      text: '#000',
      icon: '#ccc',
    };
    return colors[colorName];
  },
}));

// Mock the TaskContext
jest.mock('../../../contexts/TaskContext', () => ({
  useTasks: jest.fn(),
}));

describe('HomeScreen', () => {
  const mockTasks = [
    { id: 1, title: 'Buy groceries', dueDate: '2025-05-26' },
    { id: 2, title: 'Read a book', dueDate: '2025-05-27' },
    { id: 3, title: 'Workout', dueDate: '2025-05-28' },
  ];

  beforeEach(() => {
    (useTasks as jest.Mock).mockReturnValue({ tasks: mockTasks });
  });

  it('renders a list of tasks', () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText('Buy groceries')).toBeTruthy();
    expect(getByText('Read a book')).toBeTruthy();
    expect(getByText('Workout')).toBeTruthy();
  });

  it('filters the list when typing in the search input', () => {
    const { getByPlaceholderText, queryByText } = render(<HomeScreen />);
    const searchInput = getByPlaceholderText('Search...');

    fireEvent.changeText(searchInput, 'read');

    expect(queryByText('Read a book')).toBeTruthy();
    expect(queryByText('Buy groceries')).toBeNull();
    expect(queryByText('Workout')).toBeNull();
  });
});
