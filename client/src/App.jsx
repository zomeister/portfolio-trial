import { useState } from 'react'
import { Routes, Route, Link, Outlet } from 'react-router-dom'
// import logo from './assets/logo.png'
import reactLogo from './assets/react.svg'
import logo from './assets/logo.png'
// import viteLogo from '/vite.svg'
import './App.scss'

import { UserProvider } from './contexts/UserContext'

import Header from './components/Header'


import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Blogs from './pages/Blogs'
import Demos from './pages/Demos'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <UserProvider>
      <Header logo={logo}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/demos" element={<Demos />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
      <br/>
      <div>
        {/* <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a> */}
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
        </UserProvider>
    </>
  )
}

export default App
