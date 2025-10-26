import { Link, Route, Router, Routes } from "react-router-dom";
import Buttn from "./button";
import { FaBars ,FaTimes } from 'react-icons/fa';
import { useState } from "react";
import Adduser from "./component/newregister";

function Nav() {
    let [open,setOpen]=useState(false);
    return ( 
        <div className="shadow-md w-full fixed top-10 left-4 z-10  right-6">
<div className="md:flex bg-tealTransparent py-4 md:px-10 px-7 items-center justify-between rounded-lg mr-6">
<div className="font-bold text-2xl cursor-pointer flex items-center font-[poppins]">
    <span></span>Awoke
</div>
<div onClick={()=>setOpen(!open)} className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
{/*<FaBars className={open ? 'close':'menu'}></FaBars>*/}
{open ? <FaTimes /> : <FaBars />}
</div>
    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static left-0 w-full md:w-auto pl-4 ${open ? 'top-16':'top-[-490px]'}`}>
<li className="md:ml-8 text-xl top-20 text-white"><Link className="hover:text-indigo-300" to="/">Home</Link></li>
<li className="md:ml-8 text-xl top-20 text-white"><Link className="hover:text-indigo-300" to="./cource/">About Me</Link></li>
<li className="md:ml-8 text-xl text-white"><Link className="hover:text-indigo-300" to="/">Projects</Link></li>
<li className="md:ml-8 text-xl text-white"><Link className="hover:text-indigo-300" to="/">Skills</Link></li>
<li className="md:ml-8 text-xl text-white"><Link className="hover:text-indigo-300" to="/">Contact Me</Link></li>
<Buttn>get start</Buttn>
</ul> 
</div>
        </div>
     );
}

export default Nav;