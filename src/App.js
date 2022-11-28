import React from 'react'
import './App.css';
import { HomePage, LoginPage, ProfilePage } from './screens';
import { Route, Routes } from "react-router-dom"
import Header from './components/Header';
import { useStore } from './store';

const App = () => {
  return (
    <div className='container m-auto px-2 xl:px-0'>
      <header className="header-wrapper">
        <Header />
      </header>
      <div className='mt-5'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
      </div>
    </div>

  )
}

export default App