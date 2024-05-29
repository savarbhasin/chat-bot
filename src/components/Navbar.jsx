import React from 'react';
import { useNavigate } from 'react-router';

const Navbar = ({ setLoggedIn }) => {
    const navigate = useNavigate();
  return (
    <div className="w-full h-[100px] font-bold flex flex-row justify-between items-center px-40 py-5 bg-blue-600 text-white shadow-lg">
      <div className="cursor-pointer border px-5 py-3 rounded-xl bg-white text-blue-600 text-lg hover:bg-slate-100">
        DRI Next Action
      </div>
      <div 
        className="cursor-pointer border px-5 py-3 rounded-xl bg-white text-blue-600 text-lg hover:bg-slate-100"
        onClick={() => {
            setLoggedIn(false)
            navigate('/login')
        }}
      >
        Logout
      </div>
    </div>
  );
}

export default Navbar;
