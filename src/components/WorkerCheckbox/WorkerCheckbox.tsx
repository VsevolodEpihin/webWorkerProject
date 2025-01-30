import React from 'react';

interface WorkerCheckboxProps {
  handleChangeType: () => void;
}

const WorkerCheckbox = ({handleChangeType}: WorkerCheckboxProps) => {
  return (
    <div className='workerContainer'>
      <p>Использовать воркеры?</p>
      <input
        onChange={handleChangeType}
        type="checkbox"
      />
  </div>
  )
}

export default WorkerCheckbox;
