import React, { ChangeEvent } from 'react';

import { WORD, SYNONYMS } from '../../constants';
import { ReplacementField } from '../../types';

import './ReplacementField.css';

interface ReplacementFieldProps {
  id: string;
  word: string;
  synonyms: string[];
  onInputChange: (id: string, field: ReplacementField, value: string[] | string) => void;
  onRemove: (id: string) => void;
}

const ReplacementField: React.FC<ReplacementFieldProps> = ({
  id,
  word,
  synonyms,
  onInputChange,
  onRemove
}) => {
  const handleChangeWord = (e: ChangeEvent<HTMLInputElement>) => {
    onInputChange(id, WORD, e.target.value);
  };

  const handleChangeSynonyms = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    const result = e.target.value
    .split(',')
    .map(synonym => synonym.trim())
    .filter(synonym => synonym !== '');
    onInputChange(id, SYNONYMS, result);
  };

  const handleClick = () => {
    onRemove(id)
  }

  return (
    <div className="replaceFieldContainer">
      <input
        value={word}
        onChange={handleChangeWord}
        type="text"
        className="inputField"
        placeholder="Слово"
      />
      <input
        value={synonyms}
        onChange={handleChangeSynonyms}
        type="text"
        className="inputField"
        placeholder="Синоним/ы"
      />
      <button
        className='fieldBtn'
        onClick={handleClick}
        >
          X
      </button>
    </div>

  );
};

export default ReplacementField;
