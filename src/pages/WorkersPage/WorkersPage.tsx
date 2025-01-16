import React, { useState } from 'react';

import useWebWorker from '../../hooks/useWebWorker';
import { changeWords } from '../../helpers/changeWords';
import TransformedText from '../../components/TransformedText/TransformedText';

import './WorkersPage.css';

const WorkersPage = () => {
  const [value, setValue] = useState('');
  const { result, run } = useWebWorker(changeWords);

  const handleClick = () => {
    run(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="container">
      <div className="text">
        <textarea
          onChange={handleChange}
          value={value}
          placeholder="Введите текст"
        />
      </div>
      <button
      onClick={handleClick}
      className="button">
        Заменить текст
      </button>
      {result && <TransformedText result={result} />}
    </div>
  );
};

export default WorkersPage;
