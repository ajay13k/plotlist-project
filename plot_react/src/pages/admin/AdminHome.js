import React, { useEffect } from 'react'
import Sidebar from '../../miscellaneous/Sidebar'
import AdminDashboard from './AdminDashboard'

const AdminHome = () => {
return (
    <>
    <Sidebar>
      <AdminDashboard></AdminDashboard>
    </Sidebar>
    </>
  )
}

export default AdminHome