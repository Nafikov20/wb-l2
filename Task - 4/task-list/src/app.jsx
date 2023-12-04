import {useEffect, useState} from 'react';

import cc from "classcat";

import {ModalAddTask} from "./components/modal-add-task/modal-add-task";
import {ModalEditTask} from "./components/modal-edit-task/modal-edit-task";
import {TaskProvider} from "./containers/task-context/task-context";
import {Button} from "./shared/ui/button/button";
import {Checkbox} from "./shared/ui/checkbox/checkbox";
import {Icon} from "./shared/ui/icon/icon";

import '../public/styles/mocks/app.css';

export const App = () => {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    const [isModal, setModal] = useState(false);
    const [isEditModal, setEditModal] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

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

    const handleToggleDone = (index) => {
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks];
            updatedTasks[index].done = !updatedTasks[index].done;
            return updatedTasks;
        });
    };
    const handleSortTasks = () => {
        setTasks((prevTasks) => {
            const sortedTasks = [...prevTasks];
            sortedTasks.sort((a, b) => {
                const dateA = new Date(a.date.split('.').reverse().join(' '));
                const dateB = new Date(b.date.split('.').reverse().join(' '));


                return dateA - dateB;
            });
            return sortedTasks;
        });
    };
  return (
      <TaskProvider value={{ setTasks, tasks }}>
          <Button onClick={openModalAddTask}>
              Добавть задачу
          </Button>
          <h1>Список задач</h1>
          {tasks.length !== 0 && (
              <Button onClick={handleSortTasks}>
                  Сортировать по дате
              </Button>
          )}
          {tasks && tasks.map(({name, description, date, done}, idx) => (
              <div key={idx} className='tasks-list__wrapper'>
                  <div className='tasks-list__title-wrap'>

                      {name && <div className={cc([
                          {'done-task': done}]
                      )}>
                          {`Наименование: ${name}`}
                      </div>}

                      {description && <div className={cc([
                          {'done-task': done}]
                      )}>
                          {`Описание: ${description}`}
                      </div>}

                      {done && <div className='done-task-text'>Задача выполнена</div>}

                      {date && <div>{`Дата окончания: ${date}`}</div>}
                  </div>
                 <div className='tasks-list__btn-wrap'>
                     <Checkbox
                         id={idx}
                         isChecked={done}
                         label='Singel'
                         onChange={() => handleToggleDone(idx)}
                     />

                     <Button
                         className='delete-btn'
                         onClick={() => handleDeleteTask(idx)}
                     >
                         <Icon className='delete-btn__icon' name='toast/delete'/>
                     </Button>

                     <Button
                         className='update-btn'
                         isDisabled={done}
                         onClick={() => handleUpdateTask(idx)}
                     >
                         <Icon className='update-btn__icon' name='toast/pencil'/>
                     </Button>
                 </div>
              </div>
          ))}
          <div className='card'>
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
