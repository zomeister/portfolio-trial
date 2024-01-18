import { useState, useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext'

export default function ThemeSwitch( {  } ) {
    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <div>
            <button onClick={() => setTheme( theme === 'light'? 'dark' : 'light' )}>
                Toggle Theme
            </button>
        </div>
    )
}