import React from 'react'
import { useNavigate } from 'react-router-dom'

function UserIndex() {
const navigate = useNavigate();
  const handleLogout =()=>{
    localStorage.removeItem("userData")
    navigate('/');
  }
  return (
    <div>UserIndex
      <button onClick={()=>handleLogout()}>
        Log out
      </button>
    </div>
  )
}

export default UserIndex