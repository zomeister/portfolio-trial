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

const properties =
  {
    'distance': {
      emoji: '📏',
      options: [
        {
          'centimeter': {
            abbr: 'cm',
            formula: 0,
            compUnit: 'in',
          },

          'meter': {
            abbr: 'm',
            formula: 100,
            compUnit: 'cm',
          },

          'kilometer': {
            abbr: 'km',
            formula: 1000,
            compUnit: 'm'
          },

          'inch': {
            abbr: 'in',
            formula: 2.54,
            compUnit: 'cm',
          },

          'foot': {
            abbr: 'ft',
            formula: 12,
            compUnit: 'in',
          },

          'mile': {
            abbr: 'mile',
            formula: 5280,
            compUnit: 'ft',
          }, 
        }
      ]
    }
  }

function PropertySelector({name}) {
  // const [currentProperty, setCurrentProperty] = useState(properties[length])
  // const [currentEmoji, setCurrentEmoji] = useState(currentProperty.emoji)
  // const [currentUnit, setCurrentUnit] = useState(currentProperty.options[0])

  return (
    <div className="property-selector">
      <h1>Property: {name}</h1>
    </div>
  )
}

function UnitSelector({name, abbr, formula, compUnit}) {
  const [currentProperty, setCurrentProperty] = useState(options[0])
  const [currentUnit, setCurrentUnit] = useState(name)
  const [currentEmoji, setCurrentEmoji] = useState(emoji)
}
function Converter({units, selectors}) {
  const [selectedUnit, setSelectedUnit] = useState(units[0])
  const [initialValue, setInitialValue] = useState(selectors[0])
  const [convertedValue, setConvertedValue] = useState(initialUnit)
}

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
      <p>{properties.toString()}</p>
      <p>{properties["distance"].toString()}</p>
      <p>{properties["distance"].emoji}</p>
      {/* <p>{properties["distance"].options["centimeters"][abbr]}</p> */}
      {/* <PropertySelector name={properties['distance']}/> */}
      {/* <UnitSelector selectors={length} /> */}
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
