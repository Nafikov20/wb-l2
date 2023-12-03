import {useEffect, useState} from 'react';

import {ModalAddTask} from "./components/modal-add-task/modal-add-task";
import {ModalEditTask} from "./components/modal-edit-task/modal-edit-task";
import {TaskProvider} from "./containers/task-context/task-context";
import {Button} from "./shared/ui/button/button";
import {Checkbox} from "./shared/ui/checkbox/checkbox";

import '../public/styles/mocks/app.css';

export const App = () => {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    const [count, setCount] = useState(0);
    const [isModal, setModal] = useState(false);
    const [isEditModal, setEditModal] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [checkedBox, setCheckedBox] = useState(false);

    const onClose = () => setModal(false);
    const openModalAddTask = () => {
        setModal(true);
    }

    const handleDeleteTask = (index) => {
        setTasks((prevTasks) => [
            ...prevTasks.slice(0, index),
            ...prevTasks.slice(index + 1)
        ]);
    };


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleUpdateTask = (index) => {
        setTaskToEdit({
            ...tasks[index],
            index,
        });
        setEditModal(true);
    };

    const handleEditTask = (editedTask) => {
        const updatedTasks = [...tasks];
        updatedTasks[taskToEdit.index] = editedTask;
        setTasks(updatedTasks);
    };



    const handleOnchangeCheckedBox = (event) => {
        setCheckedBox(event.target.checked)
    }
  return (
      <TaskProvider value={{ setTasks, tasks }}>
          <div>
              <Button onClick={openModalAddTask}>
                  Добавть задачу
              </Button>


          </div>
          <h1>Список задач</h1>
          {tasks && tasks.map((i, idx) => (
              <div key={idx}>
                  <div>{i.name}</div>
                  <div>{i.description}</div>
                  <Button onClick={() => handleDeleteTask(idx)}>
                      Удалить задачу
                  </Button>
                  <Button onClick={() => handleUpdateTask(idx)}>
                      Редактировать задачу
                  </Button>
                  <Checkbox
                      id={idx}
                      isChecked={checkedBox}
                      label='Singel'
                      onChange={handleOnchangeCheckedBox}
                  />
              </div>
          ))}
            {/*<Icon name='common/spinner'/>*/}
          <div className='card'>
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className='read-the-docs'>
            Click on the Vite and React logos to learn more
          </p>

          <ModalAddTask
              title="Добавить задачу"
              visible={isModal}
              onClose={onClose}
          />

          {isEditModal && (
              <ModalEditTask
                  taskToEdit={taskToEdit}
                  title="Редактировать задачу"
                  visible={isEditModal}
                  onClose={() => setEditModal(false)}
                  onEdit={handleEditTask}
              />
          )}
      </TaskProvider>
  );
};
