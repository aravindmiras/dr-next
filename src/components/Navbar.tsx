// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className={`navbar bg-base-100 shadow-sm ${isClient ? "fixed" : ""} top-0 left-0 w-full z-50`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/addProfile">Add Patient</Link>
            </li>
            <li>
              <Link href="/profiles">Show Patients</Link>
            </li>
            <li>
              <Link href="/showdr">Check Diabetic Retinopathy</Link>
            </li>
            <li>
              <Link href="/chatbot">Chatbot</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          DoctorDR
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        <li>
              <Link href="/addProfile">Add Patient</Link>
            </li>
            <li>
              <Link href="/profiles">Show Patients</Link>
            </li>
            <li>
              <Link href="/showdr">Check Diabetic Retinopathy</Link>
            </li>
        </ul>
      </div>
      <div className="navbar-end">
      <button className="btn btn-circle">
        <a href="/chatbot">
  {/* start  */}
  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fillRule="evenodd" d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z" clipRule="evenodd"/>
</svg>

  {/* end  */}
  </a>
    </button>
      </div>
    </nav>
  );
};

export default Navbar;