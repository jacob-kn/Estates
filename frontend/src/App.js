import React from 'react'
// import logo from './logo.svg'; don't need but for knowing how to get a logo

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//component imports
import Header from './components/Header'

//page imports
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import MyAccount from './pages/MyAccount'
import RegisterBuyer from './pages/RegisterBuyer'
import RegisterSeller from './pages/RegisterSeller'
import SavedProperties from './pages/SavedProperties'
import UploadPost from './pages/UploadPost'

function App () {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/my-account' element={<MyAccount />} />
            <Route path='/register/buyer' element={<RegisterBuyer />} />
            <Route path='/register/seller' element={<RegisterSeller />} />
            <Route path='/saved-properties' element={<SavedProperties />} />
            <Route path='/uploadPost' element={<UploadPost />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
