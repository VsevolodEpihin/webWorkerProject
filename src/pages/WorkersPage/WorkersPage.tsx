import React, { ChangeEvent, useState } from 'react';

import useWebWorker from '../../hooks/useWebWorker';
import { changeWords } from '../../helpers/changeWords';
import TransformedText from '../../components/TransformedText/TransformedText';

import './WorkersPage.css';

const WorkersPage = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const { run } = useWebWorker(changeWords);

  const handleClick = async () => {
    try {
      const transformedText = await run(value);
      setResult(transformedText);
    } catch (error) {
      console.error('Error during text transformation:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className='container'>
      <div className='text'>
        <textarea
          onChange={handleChange}
          value={value}
          placeholder="Введите текст"
        />
      </div>
      <button
        onClick={handleClick}
        className='buttonText'
      >
        Заменить текст
      </button>
      {result && <TransformedText result={result} />}
    </div>
  );
};

export default WorkersPage;
