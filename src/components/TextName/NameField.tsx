import React, { ChangeEvent } from 'react';

interface NameFieldProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
}

const NameField = ({
  handleChange,
  placeholder,
  type
}: NameFieldProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
    />
  )
}

export default NameField;
