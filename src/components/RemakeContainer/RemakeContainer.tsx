import React, { useState } from 'react';

import ReplacementField from '../ReplacementField/ReplacementField';
import { Replacement } from '../../helpers/changeWords';
import { getId } from '../../helpers/getId';

interface InputField {
  id: string;
  word: string;
  synonyms: string[];
};

interface RemakeContainerProps {
  onReplacementsChange: (value: Replacement[]) => void;
};

const RemakeContainer = ({ onReplacementsChange }: RemakeContainerProps) => {
  const [inputs, setInputs] = useState<InputField[]>([]);

  const handleAddInput = () => {
    const newInputs = [
      ...inputs,
      { id: getId(), word: '', synonyms: [] },
    ];
    setInputs(newInputs);
    onReplacementsChange(newInputs);
  };

  const handleRemoveInput = (id: string) => {
    const updatedInputs = inputs.filter(input => input.id !== id);
    setInputs(updatedInputs);
    onReplacementsChange(updatedInputs);
};

  const handleInputChange = (id: string, field: keyof InputField, value: string[] | string) => {
    

    const updatedInputs = inputs.map((input) =>
      input.id === id ? { ...input, [field]: value } : input
    );
    setInputs(updatedInputs);
    onReplacementsChange(updatedInputs);
  };

  return (
    <>
      <div className="remakeContainer">
        <p>Какие слова необходимо заменить?</p>
        <button onClick={handleAddInput}>+</button>
      </div>
      <div className='replaceContainer'>
        {inputs.map((input) => (
          <ReplacementField
            key={input.id}
            id={input.id}
            word={input.word}
            synonyms={input.synonyms}
            onInputChange={handleInputChange}
            onRemove={handleRemoveInput}
          />
        ))}
      </div>
    </>
  );
}

export default RemakeContainer;
