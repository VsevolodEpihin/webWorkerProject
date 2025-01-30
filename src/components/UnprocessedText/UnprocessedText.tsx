import React, { ChangeEvent } from 'react';

import './UnprocessedText.css'

interface UnprocessedProps {
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

const UnprocessedText = ({value, handleChange}: UnprocessedProps) => {
  return (
  <div className='text'>
    <textarea
      onChange={handleChange}
      value={value}
      placeholder="Введите текст"
    />
  </div>
  )
}

export default UnprocessedText;
