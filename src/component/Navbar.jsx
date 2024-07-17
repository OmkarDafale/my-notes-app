import React from 'react'
import { SlNotebook } from './icons'
import './Navbar.css'
const Navbar = () => {
    return (
        <div className='main-navbar'>
            <div className='navbar-items'>
                <SlNotebook size={25} />
                <h1 className='navbar-items-title'>my-NOTEBOOK</h1>
            </div>
        </div>
    )
}

export default Navbar