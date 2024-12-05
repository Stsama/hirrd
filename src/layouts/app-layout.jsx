import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header'

const AppLayout = () => {
  return (
    <div className='container m-auto'>
        <div className="grid-background"></div>
        <main className='min-h-screen'>
            <Header />
            <Outlet />
        </main>
        <div className="p-10 text-center bg-gray-800 mt-10">
            Made by @Albert Ezoula
        </div>
    </div>
  )
}

export default AppLayout