import React from 'react'
import './App.css';
import { HomePage, LoginPage } from './screens';
import { Route, Routes } from "react-router-dom"
import Header from './components/Header';
const App = () => {
  return (
    <>
      <header className="header-wrapper">
        <Header />
      </header>
      <div className='container m-auto mt-5'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
      </div>
      
    </>

  )
}

export default App