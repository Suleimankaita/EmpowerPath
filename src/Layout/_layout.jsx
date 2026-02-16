import React from 'react'
import Header from './Header'
import Fotter from './fotter'
import { Outlet } from 'react-router-dom'
const _layout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Fotter />
    </>
  )
}

export default _layout
