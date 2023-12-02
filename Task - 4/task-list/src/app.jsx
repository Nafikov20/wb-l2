import { useState } from 'react';

import {Button} from "./shared/ui/button/button";
import {Checkbox} from "./shared/ui/checkbox/checkbox";
import {Icon} from "./shared/ui/icon/icon";
import {Input} from "./shared/ui/input/input";
import {Modal} from "./shared/ui/modal/modal";

import '../public/styles/mocks/app.css';

export const App = () => {
    const [count, setCount] = useState(0);
    const [isModal, setModal] = useState(false);
    const onClose = () => setModal(false);

    const openModal = () => {
      setModal(true)
    }

    const [name, setName] = useState('');

    const handleNameChange = (newName) => {
        setName(newName);
    };
    const [checkedBox, setCheckedBox] = useState(false);
    const handleOnchangeCheckedBox = (event) => {
        setCheckedBox(event.target.checked)
    }
  return (
    <>
      <div>
          <Checkbox
              id='1'
              isChecked={checkedBox}
              label='Singel'
              onChange={handleOnchangeCheckedBox}
          />
      </div>
      <h1>Vite + React</h1>
        <Icon name='common/spinner'/>
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
        <Button onClick={openModal}>Клик-клик-клик</Button>
        <Modal
            title='Заголовок'
            visible={isModal}
            onClose={onClose}
        >
        123123123
        </Modal>
        <Input required label="Name" type='text' value={name} onChange={handleNameChange} />

    </>
  );
};
