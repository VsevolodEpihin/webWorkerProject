import React, { ChangeEvent, useState } from 'react';

import useWebWorker from '../../hooks/useWebWorker';
import { changeWords } from '../../helpers/changeWords';
import TransformedText from '../../components/TransformedText/TransformedText';

import './WorkersPage.css';

const WorkersPage = () => {
  const [value, setValue] = useState('');
  const [enableWorker, setEnableWorker] = useState(false);
  
  const { workerResult, run } = useWebWorker(changeWords);

  const handleClickWithWorker = () => {
    if (enableWorker) {
      run(value);
    } else {
      run(value, false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleChangeType = () => {
    setEnableWorker(prev => !prev);
  }

  return (
    <div className='container'>
      <div className='text'>
        <textarea
          onChange={handleChange}
          value={value}
          placeholder="Введите текст"
        />
      </div>
      <div className='workerContainer'>
        <p>Использовать воркеры?</p>
        <input
          onChange={handleChangeType}
          type="checkbox"
        />
      </div>
      <button
        onClick={handleClickWithWorker}
        className='buttonText'
      >
        Заменить текст
      </button>
     <pre>
     {workerResult && <TransformedText result={workerResult} />}
     </pre>
    </div>
  );
};

export default WorkersPage;
