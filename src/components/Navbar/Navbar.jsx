import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { useSelector } from "react-redux";

const Navbar =() => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click)
  const user=JSON.parse(localStorage.getItem('users'))
  const Navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((state)=> state.cart)
  const isActive = (path)=> location.pathname === path? 'bg-gray-900':'bg-gray-700';
  const Logout=()=> {
    localStorage.clear('users');
    Navigate("/login")
  }
  const navList = (
      <div className="lg:hidden block absolute top-16 w-full left-0 right-7 transition bg-gray-700">
          <ul className="text-center text-xl p-20">
            <Link spy= "true" smooth="true" to="/" >
                <li className="my-4 py-4 border-b border-black hover:bg-gray-400 hover:rounded">Home</li>
            </Link>
            <Link spy="true" smooth="true" to="/EventsPage" >
                <li className="my-4 py-4 border-b border-black hover:bg-gray-400 hover:rounded">Events</li>
            </Link>
            <Link spy="True" smooth="true" to="/ArchivesPage" >
                <li className="my-4 py-4 border-b border-black hover:bg-gray-400 hover:rounded">Archives</li>
            </Link>
            {user?.role==="user"&&<Link spy="true" smooth="true" to="Ticket" >
                <li className="my-4 py-4 border-b border-black hover:bg-gray-400 hover:rounded">Ticket</li>
            </Link>}
            {!user?<Link spy="True" smooth="true" to ="/login">
                <li className="my-4 py-4 border-b border-black hover:bg-gray-400 hover:rounded">Login</li>
            </Link>:""}
            {user?.role==="user"&&<Link spy="true" smooth="true" to="/Cart">
                <li className="my-4 py-4 border-b border-black hover:bg-gray-400 hover:rounded">Cart({cartItems.length})</li>
            </Link>}
            {user?.role==="user"&&<Link spy="true" smooth="true" to="/user-dashboard">
                <li className="my-4 py-4 border-b border-black hover:bg-gray-400 hover:rounded">{user?.name}</li>
            </Link>}
            {user?.role==="admin"&&<Link spy="true" smooth="true" to="/admin-dashboard">
                <li className="my-4 py-4 border-b border-black hover:bg-gray-400 hover:rounded">{user?.name}</li>
            </Link>}
            {user&&
                <li className=" cursor-pointer my-4 py-4 border-b border-black hover:bg-gray-400 hover:rounded" onClick={Logout}>Logout</li>
             }
          </ul>
      </div>
  )
  return(
    <nav className="bg-gray-700">
      <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4">
        <div className="flex items-center flex-1">
          <span className="text-3xl font-bold">Listen Nation</span>
        </div>
        <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex gap-8 mr-16 text-[18px]">
              <Link spy="true" smooth="true" to="/" >
                <li className={`px-3 py-2 text-gray-100 rounded-lg hover:bg-gray-200 hover:text-black ${isActive('/')}`}>Home</li>
              </Link>
              <Link spy="true" smooth="true" to="/EventsPage" >
                <li className={`px-3 py-2 text-gray-100 rounded-lg hover:bg-gray-200 hover:text-black ${isActive('/EventsPage')}`}>Events</li>
              </Link>
              <Link spy="true" smooth="true" to="/ArchivesPage" >
                <li className={`px-3 py-2 text-gray-100 rounded-lg hover:bg-gray-200 hover:text-black ${isActive('/ArchivesPage')}`}>Archives</li>
              </Link>
              {user?.role === "user" && (
                <Link spy="true" smooth="true" to="/Ticket" >
                  <li className={`px-3 py-2 text-gray-100 rounded-lg hover:bg-gray-200 hover:text-black ${isActive('/Ticket')}`}>Ticket</li>
                </Link>
              )}
              {user?.role === "user" && (
                <Link spy="true" smooth="true" to="/Cart">
                  <li className={`px-3 py-2 text-gray-100 rounded-lg hover:bg-gray-200 hover:text-black ${isActive('/Cart')}`}>Cart({cartItems.length})</li>
                </Link>
              )}
              {user?.role === "user" && (
                <Link spy="true" smooth="true" to="/user-dashboard">
                  <li className={`px-3 py-2 text-gray-100 rounded-lg hover:bg-gray-200 hover:text-black ${isActive('/user-dashboard')}`}>{user?.name}</li>
                </Link>
              )}
              {user?.role === "admin" && (
                <Link spy="true" smooth="true" to="/admin-dashboard">
                  <li className={`px-3 py-2 text-gray-100 rounded-lg hover:bg-gray-200 hover:text-black ${isActive('/admin-dashboard')}`}>{user?.name}</li>
                </Link>
              )}
              {!user ? (
                <li><Link spy="true" smooth="true" to="/login">
                  <button className="bg-gray-800 cursor-pointer px-3 py-2 border-2 rounded-lg border-white hover:bg-gray-400 hover:rounded">
                    Login
                  </button>
                </Link></li>
              ) : ""}
              {user && (
                <li><button 
                className="cursor-pointer px-3 py-2 border-2 rounded-lg border-white hover:bg-gray-400 hover:rounded" 
                onClick={Logout}>
                 Logout
                </button></li>
              )}
            </ul>
          </div>
        </div>
        <div>
          {click && navList}
        </div>
        <button className="block sm:hidden md:hidden transition" onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </nav>
  );
}
export default Navbar;