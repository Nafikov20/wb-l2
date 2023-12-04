import { useEffect, useState } from 'react';

import { Button } from '../../shared/ui/button/button';
import { Input } from '../../shared/ui/input/input';
import { Modal } from '../../shared/ui/modal/modal';

import './modal-edit-task.css';

// eslint-disable-next-line react/prop-types
export const ModalEditTask = ({ onClose, visible, title, taskToEdit, onEdit }) => {
    // eslint-disable-next-line react/prop-types
    const [name, setName] = useState(taskToEdit.name);
    // eslint-disable-next-line react/prop-types
    const [date, setDate] = useState(taskToEdit.date);
    // eslint-disable-next-line react/prop-types
    const [description, setDescription] = useState(taskToEdit.description);
    const resetState = () => {
        setName('');
        setDescription('');
    };

    useEffect(() => {
        if (!visible) {
            resetState();
        }
    }, [visible]);

    const handleEditClick = () => {
        const editedTask = {
            ...taskToEdit,
            date,
            description,
            name,
        };

        onEdit(editedTask);
        onClose();
    };

    const handleDescriptionEditChange = (newDescription) => {
        setDescription(newDescription);
    };

    const handleTitleEditChange = (newTitle) => {
        setName(newTitle);
    };

    const handleDateEditChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <Modal title={title} visible={visible} onClose={onClose}>
            <form action="">
                <Input
                    required
                    label="Название"
                    name="name"
                    type="text"
                    value={name}
                    onChange={handleTitleEditChange}
                />
                <Input
                    required
                    label="Описание"
                    name="description"
                    type="text"
                    value={description}
                    onChange={handleDescriptionEditChange}
                />
                <Input
                    required
                    label="Дата окночания"
                    name='date'
                    type='datetime-local'
                    value={date}
                    onChange={handleDateEditChange}
                />
                <Button className="modal-edit-task-btn" typeButton="button" onClick={handleEditClick}>
                    Сохранить изменения
                </Button>
            </form>
        </Modal>
    );
};