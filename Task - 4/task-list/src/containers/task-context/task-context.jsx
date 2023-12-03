import { createContext, useContext } from 'react';

// Создаем контекст
const TaskContext = createContext(undefined);

// Экспортируем провайдер для использования в верхних уровнях
export const TaskProvider = TaskContext.Provider;

// Создаем хук для использования в компонентах
export const useTaskContext = () => useContext(TaskContext);


