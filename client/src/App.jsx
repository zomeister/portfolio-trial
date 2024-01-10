import { useState, useEffect } from 'react'
import { Routes, Route, Link, Outlet, useNavigate} from 'react-router-dom'
import './styles/App.css'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Blogs from './pages/Blogs'
import Demos from './pages/Demos'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Logout from './pages/Logout'

import UserContext from './contexts/UserContext'
import ThemeContext from './contexts/ThemeContext'

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <>
      <ThemeContext.Provider value={{darkMode, setDarkMode}}>
        <UserContext.Provider value={{user, setUser}}>
          <Header navigate={navigate}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/demos" element={<Demos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          <Footer />
        </UserContext.Provider>
      </ThemeContext.Provider>
    </>
  )
}

export default App
