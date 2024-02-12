import React from 'react'
import Logo from "../MovieLogo.png";
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="flex border space-x-8 items-center pl-3 py-4" >
        <div className="flex space-x-2 items-center" >
         <img src={Logo} alt='' className="w-[50px] mr-4" />
          <Link to ="/" className='text-blue-400 font-bold text-xl'>Home</Link>
        </div>    
        <Link to = "/watchlist" className='text-blue-400 font-bold text-xl'>WatchList</Link>
    </div>
  )
}

export default NavBar