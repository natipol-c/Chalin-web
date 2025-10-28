import React from 'react'
import { useSelector } from 'react-redux'
import ResponsiveAppBar from '../layout/ResponsiveAppBar'
import NotFound404 from '../components/pages/NotFound404'
const UserRoutes = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }))
  
  //check

  return user && user.user.token
    ? <>
      <ResponsiveAppBar />
      {children}
    </>
    : <NotFound404 text='No Permission!!!'/>
}
export default UserRoutes