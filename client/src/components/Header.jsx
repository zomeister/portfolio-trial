// import NavBar from "./NavBar"
import { useState, useContext } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import UserContext from "./../contexts/UserContext"
import logo from './../assets/logo.png'
// import './../styles/Header.scss'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Login', href: '/login' },
    { name: 'Company', href: '#' },
  ]
export default function Header ({navigate}) {
    const { user, setUser } = useContext(UserContext)
    const [currentTab, setCurrentTab] = useState('/')
    const [input, setInput] = useState('')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
        <div className="border-3">
            <header className="bg-gray-900 flex">
                    <button onClick={() => navigate("/")}>
                        <img src={logo} alt="logo"  className="logo" width="30" height="30"/>
                    </button>
                    <button
                        onClick={(e) => handleTabChange(e,"/about")} 
                        className="font-bold inline-flex items-center justify-center"
                    >About</button>
                    <button onClick={(e) => handleTabChange(e,"/contact")} className="font-bold inline-flex border-2 items-center justify-center">Contact</button>
                    <button onClick={(e) => handleTabChange(e,"/blogs")} className="font-bold inline-flex items-center justify-center">Blogs</button>
                    <button onClick={(e) => handleTabChange(e,"/demos")} className="font-bold inline-flex items-center justify-center">Demos</button>

                    { user == null
                        ? <>
                            <button onClick={(e) => handleTabChange(e,"/login")} className="font-bold inline-flex items-center justify-center">Login</button>
                            <button onClick={(e) => handleTabChange(e,"/register")} className="font-bold inline-flex items-center justify-center">Register</button>
                        </>
                        : <>
                            <button onClick={(e) => handleTabChange(e,"/profile")} className="font-bold inline-flex items-center justify-center">Profile</button>
                            <button onClick={(e) => handleTabChange(e,"/logout")} className="font-bold inline-flex items-center justify-center">Logout</button>
                        </>
                    }
                <label className="cursor-pointer grid place-items-center">
                  <input type="checkbox" value="synthwave" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"/>
                  <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
                  <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </label>
            </header>
            {/* <header className="bg-gray-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
            
          {

          navigation.map((item) => (
            <button onClick={(e) => handleTabChange(e,"/demos")}key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white">
              {item.name}
            </button>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-white">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header> */}
        </div>
    )

}