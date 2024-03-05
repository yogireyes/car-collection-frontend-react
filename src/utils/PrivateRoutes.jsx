import React,{useContext} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const PrivateRoutes=()=> {
  const { token } = useContext(AuthContext)

  if (!token) return <Navigate to="/" />;
  return <Outlet />;
}

export default PrivateRoutes