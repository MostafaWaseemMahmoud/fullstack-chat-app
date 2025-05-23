import { LogOut, MessageSquare, User } from "lucide-react";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/userAuthStore';
const Navbar = () => {
  const {logout, authUser} = useAuthStore();
  const Navigate = useNavigate();
  return (
    <div>
      <h1>
        <header className='bg-base-100 border-b border-base-300 fixed  w-full top-0 z-40 backdrop-blur-lg bg-base-100/80'>
        <div className="container mx-auto px-4 h-16">
          <div className='flex items-center justify-between h-full w-full'>
            <Link to='/' className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary"/>
              </div>
              <h1 className="text-lg font-bold">Chatoo</h1>
            </Link>
            <div className="flex items-center gap-2">
          {authUser ? (
            <>
                      <div className="flex items-center gap-2">
                      <Link className="btn btn-sm gap-2 transition-colors" to={"/profile"}>
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline">Profile</span>
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="btn btn-sm gap-2 transition-colors" onClick={()=>{logout(); Navigate("/")}}>
                      <LogOut className="w-4 h-4" />
                      <span className="hidden sm:inline">LogOut</span>
                      </button>
                    </div>
            </>
          ) : (null)}
          </div>
            </div>
        </div>
        </header>
      </h1>
    </div>
  )
}

export default Navbar
