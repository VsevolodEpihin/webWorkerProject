import React from 'react';

interface TransformedTextProps {
  result: string;
}

const TransformedText = ({ result }: TransformedTextProps) => (
  <div className="result">
    <h3>Результат:</h3>
    <p>{result}</p>
  </div>
)

export default TransformedText;
