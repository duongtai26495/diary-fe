import React from 'react'
import './App.css';
import { DiaryContent, HomePage, LoginPage, NewDiary, ProfilePage, UpdateDiary } from './screens';
import { Route, Routes } from "react-router-dom"
import Header from './components/Header';
import { useStore } from './store';
import TopBar from './components/TopBar';

const App = () => {
  return (
    <div className='container m-auto px-2 xl:px-0'>
      <header className="header-wrapper">
        <Header />
        <TopBar />
      </header>
      <div className='mt-5'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/diary=:id' element={<DiaryContent/>} />
        <Route path='/diary/new' element={<NewDiary/>} />
        <Route path='/diary/edit/id=:id' element={<UpdateDiary/>} />
      </Routes>
      </div>
    </div>

  )
}

export default App