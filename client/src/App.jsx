import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/header/Navbar'
import Footer from './components/footer/Footer'
import FetchUsers from './pages/FetchUsers'
import Form from './pages/Form'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
        <BrowserRouter>
        <Navbar />
              <Routes>
                    <Route path="/" element={<FetchUsers />}></Route>
                    <Route path="/adduser" element={<Form />}></Route>
              </Routes>
        <Footer />
        </BrowserRouter>
        <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App