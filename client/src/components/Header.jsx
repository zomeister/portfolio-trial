// import NavBar from "./NavBar"
import { useState, useContext } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { UserContext } from "./../contexts/UserContext"
import './../styles/Header.scss'

export default function Header ({logo}) {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [currentTab, setCurrentTab] = useState('/')
    const [input, setInput] = useState('')

    const handleTabChange = (e, tab) => {
        e.preventDefault()
        setCurrentTab(tab)
        navigate(tab)
    }
    const handleSubmitSearch = event => {
        event.preventDefault()
        const searchTerm = event.target.elements.search.value
        navigate(`/search?q=${searchTerm}`)
    }

    return (
        <div>
            <header>
                {/* <nav> */}
                    <button onClick={() => navigate("/")}><img src={logo} alt="logo" width="30" height="30"/></button>
                    <button onClick={(e) => handleTabChange(e,"/about")}>About</button>
                    <button onClick={(e) => handleTabChange(e,"/contact")}>Contact</button>
                    <button onClick={(e) => handleTabChange(e,"/blogs")}>Blogs</button>
                    <button onClick={(e) => handleTabChange(e,"/demos")}>Demos</button>

                    { user == null
                        ? <>
                            <button onClick={(e) => handleTabChange(e,"/login")}>Login</button>
                            <button onClick={(e) => handleTabChange(e,"/register")}>Register</button>
                        </>
                        : <>
                            <button onClick={(e) => handleTabChange(e,"/profile")}>Profile</button>
                            <button onClick={(e) => handleTabChange(e,"/logout")}>Logout</button>
                        </>
                    }
                {/* </nav> */}
                    {/* <form onSubmit={handleSubmitSearch}>
                        <input type="text" name="search" value={input} width='20px' onChange={(e) => setInput(e.target.value)} />
                        <button type="submit">Search</button>
                    </form> */}
            </header>
        </div>
    )

}