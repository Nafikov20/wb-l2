import {useEffect, useState} from "react";

import {useTaskContext} from "../../containers/task-context/task-context";
import {Button} from "../../shared/ui/button/button";
import {Input} from "../../shared/ui/input/input";
import {Modal} from "../../shared/ui/modal/modal";

import './modal-add-task.css'

// eslint-disable-next-line react/prop-types
export const ModalAddTask = ({onClose, visible, title}) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const { setTasks } = useTaskContext();

    const resetState = () => {
        setName('');
        setDescription('');
        setDate('');
    }

    useEffect(() => {
        if(!visible) {
            resetState()
        }
    }, [visible]);


    const createModalClick = () => {
        let newTask = {
            date: date,
            description: description,
            done: false,
            name: name
        };

        onClose();
        setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    const handleDescriptionAddTaskChange = (newDescription) => {
        setDescription(newDescription)
    }

    const handleTitleAddTaskChange = (newTitle) => {
        setName(newTitle)
    };

    const handleDateAddTaskChange = (newDate) => {
        const updateDate = newDate.split('-');
        const time = updateDate[2].split('T');
        const newFormatDate = time[0] + '.' + updateDate[1] + '.' + updateDate[0] + ' ' + time[1];
        setDate(newFormatDate);
    }
    return (
        <Modal title={title} visible={visible} onClose={onClose}>
            <form action="">
                <Input
                    required
                    label='Название'
                    name='name'
                    type='text'
                    value={name}
                    onChange={handleTitleAddTaskChange}
                />
                <Input
                    required
                    label='Описание'
                    name='descripton'
                    type='text'
                    value={description}
                    onChange={handleDescriptionAddTaskChange}
                />
                <Input
                    required
                    label="Дата окночания"
                    name='date'
                    type='datetime-local'
                    onChange={handleDateAddTaskChange}
                />
                <Button className='modal-add-task-btn' typeButton='button' onClick={createModalClick}>
                    Создать задачу
                </Button>
            </form>
        </Modal>
    )
}
