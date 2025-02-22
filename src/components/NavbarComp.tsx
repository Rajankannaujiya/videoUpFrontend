import { useState } from "react"
import Links from "./common/Links"
import { useRecoilValue } from "recoil";
import { isAuthenticated } from "../state/userRecoil";
import Logout from "./Logout";


function Navbar() {

  const isLoggedIn = useRecoilValue(isAuthenticated)

  const[isClicked, setIsClicked]= useState(false);

  return (
    <nav className="max-h-screen bg-white border-gray-200 border-b-2 fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">VU</span>
        </div>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">

          {!isLoggedIn && (
            <>
                    <li>
                        <Links linkto="/" linkfor="SignUp" />
                    </li>

                  <li>
                  <Links linkto="/login" linkfor="Login" />
                  </li>
                  </>

                )}
                {isLoggedIn && (
                    <>
                        <li>
                            <Links linkto="/posts" linkfor="Posts" />
                        </li>
                        <li>
                            <Links linkto="/videos" linkfor="Videos" />
                        </li>
                        <li>
                            <Links linkto="/photos" linkfor="Photos" />
                        </li>
                        <li>
                            <Links linkto="/upload" linkfor="Upload" />
                        </li>
                    </>
                )}
             

{isLoggedIn &&
          <button 
          onClick={()=>{
            setIsClicked(!isClicked)
          }}
          data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto">Account <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
  </svg></button>
}

            {/* <!-- Dropdown menu --> */}

            {isLoggedIn &&
            <div id="dropdownNavbar" className={`z-10 ${isClicked ?"":"hidden"} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-0`}>
                <ul className="text-sm text-gray-700 font-light hover:bg-gray-100" aria-labelledby="dropdownLargeButton">
                 <li className="mt-2 p-1 border-b-2 font-semibold">
                  <Links linkto="/myPosts" linkfor="myposts"/>
                 </li>
                </ul>

              {/* importing the logout component her */}
                <div>
                  <Logout />
                </div>
            </div>
}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
