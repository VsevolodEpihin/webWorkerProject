import React from 'react';
import { useNavigate } from 'react-router';

const ProfilePage = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/web-workers')
  }

  return (
    <>
      <div onClick={handleClick}>WebWorkers</div>
    </>
  )
}

export default ProfilePage;