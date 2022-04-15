import React from 'react'
// import logo from './logo.svg'; don't need but for knowing how to get a logo

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//component imports
import Header from './components/Header'

//page imports
import Main from './pages/Main'
import Login from './pages/Login'
import MyAccount from './pages/MyAccount'
import RegisterBuyer from './pages/RegisterBuyer'
import RegisterSeller from './pages/RegisterSeller'
import SavedProperties from './pages/SavedProperties'
import ListedProperties from './pages/ListedProperties'
import Property from './pages/Property'
import User from './pages/User'
import AddProperty from './pages/AddProperty'
import MakeOffer from './pages/MakeOffer'
import Agreement from './pages/Agreement'

function App () {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/login' element={<Login />} />
            <Route path='/my-account' element={<MyAccount />} />
            <Route path='/register/buyer' element={<RegisterBuyer />} />
            <Route path='/register/seller' element={<RegisterSeller />} />
            <Route path='/saved-properties' element={<SavedProperties />} />
            <Route path='/listed-properties' element={<ListedProperties />} />
            <Route path='/add-property' element={<AddProperty />} />
            <Route path='/property/:id' element={<Property />} />
            <Route path='/user/:id' element={<User />} />
            <Route path='/property/:id/make-offer' element={<MakeOffer />} />
            <Route path='/agreement/:id' element={<Agreement />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
