import React, { useEffect } from 'react'
import './App.css';
import { DiaryContent, HomePage, LoginPage, NewDiary, ProfilePage, RegisterPage, UpdateDiary } from './screens';
import { Route, Routes } from "react-router-dom"
import Header from './components/Header';
import TopBar from './components/TopBar';
import { useStore } from './store';
import { loadUserLocal } from './store/actions';
import { LOCAL_LOGIN_STATE, USER_LOCAL } from './api/constants';
import AddButton from './components/AddButton';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

const App = () => {

  const [state, dispatch] = useStore()
  const { userLoginState } = state

  useEffect(() => {
    dispatch(loadUserLocal(JSON.parse(localStorage.getItem(USER_LOCAL))))
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  }, [userLoginState])

  return (
    <React.Fragment>
<div className='w-full pt-2'>
      <div className='container m-auto px-2  relative xl:px-0'>
          <Header />
          {localStorage.getItem(LOCAL_LOGIN_STATE) ? <TopBar /> : ""}
        <div className='mt-5'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/diary=:id' element={<DiaryContent />} />
            <Route path='/diary/new' element={<NewDiary />} />
            <Route path='/diary/edit/id=:id' element={<UpdateDiary />} />
          </Routes>
        </div>
      </div>
       <BottomNav />
    </div>
      {/* <Footer /> */}
    {/* <LoadingScreen /> */}
    </React.Fragment>
    
  )
}

export default App