import React from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'

function PublicLayout()
{
  return (
    <div>
        <Header />
        <br />
        <Outlet />
    </div>
  )
}

export { PublicLayout }