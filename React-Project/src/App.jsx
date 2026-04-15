import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { getLocalStorage, setLocalStorage } from './utils/localStorage'
import { AuthContext } from './context/AuthProvider'

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (email,password)=>{
    if(email == "admin@me.com" && password == "123"){
      setUser('admin')
      console.log(user);
      
    }else if(email == "user@me.com" && password == "123"){
      setUser('employee')
      console.log(user);
    }
    else{
      alert("Invalid credentials")
    }
  }

  const data = useContext(AuthContext)
  console.log(data);

  

  return (
    <>
      {!user?<Login handleLogin={handleLogin} />:''}
      {/* {user == "admin" ? <AdminDashboard/> : <EmployeeDashboard/>} */}
      {user == "admin" && <AdminDashboard/>}
      {user == "employee" && <EmployeeDashboard/>}
    </>
  )
}

export default App
