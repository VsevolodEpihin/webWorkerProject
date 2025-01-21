import React, { ChangeEvent, useState } from 'react';

import useWebWorker from '../../hooks/useWebWorker';
import { Replacement, changeWords } from '../../helpers/changeWords';
import { RemakeContainer, TransformedText } from '../../components';

import './WorkersPage.css';

const WorkersPage = () => {
  const [value, setValue] = useState('');
  const [enableWorker, setEnableWorker] = useState(false);
  const [replacements, setReplacements] = useState<Replacement[]>([])

  const { workerResult, run } = useWebWorker((text: string) => {
    return changeWords(text, replacements);
  });

  const handleClickWithWorker = () => {
    if (enableWorker) {
      run(value, replacements);
    } else {
      run(value, replacements, false);
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
      <RemakeContainer onReplacementsChange={setReplacements}/>
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
