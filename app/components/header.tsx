'use client'

import { AlignJustify, LayoutGrid, Settings, Ticket, X } from "lucide-react"
import { useSelector, useDispatch } from "react-redux";
import { IStates } from "../lib/global-state-interface";
import { set_isNavOpen } from "../../redux/slices/state-slices";

export const Header = () => {

  const dispatch = useDispatch()
  const isNavOpen = useSelector((state: { states: IStates }) => state.states.isNavOpen)

  const toggleNavbar = () => {
    dispatch(set_isNavOpen(!isNavOpen))
  }

  return (
    <div className={`flex flex-col gap-6 items-center absolute left-0 top-0 h-screen py-32 bg-blue400 transition-all duration-500 ${isNavOpen ? "px-8 w-96" : "px-8 w-24"}`}>
      <div className="flex gap-5">
        <img src="BancoDoBrasil-Logo.svg" alt="Logo BB" />
        <img src="Banco Do Brasil.svg" className={`transition-all duration-500 h-14 overflow-hidden ${isNavOpen ? "w-56" : "w-0"}`} alt="" />
      </div>
      <div className="px-8 w-full bg-gray75 h-px" />
      <ul className="space-y-10">
        <li className="flex justify-center">
          {isNavOpen ? (
              <button
                onClick={toggleNavbar}
              ><X className="text-white size-8" /></button>  
          ) : (
              <button
                onClick={toggleNavbar}
              ><AlignJustify className="text-white size-8" /></button>  
          )}
        </li>
        <li className={`flex items-center transition-all duration-500 ${isNavOpen ? 'gap-5' : 'gap-0'}`}>
          <a href=""><Ticket className="rotate-90 text-white size-8" /></a>
          <span className={`text-white text-2xl overflow-hidden transition-all duration-500 ${isNavOpen ? 'w-40' : 'w-0'}`}>Ticket</span>
        </li>
        <li className={`flex items-center transition-all duration-500 ${isNavOpen ? 'gap-5' : 'gap-0'}`}>
          <a href=""><LayoutGrid className="text-white size-8" /></a>
          <span className={`text-white text-2xl overflow-hidden transition-all duration-500 ${isNavOpen ? 'w-40' : 'w-0'}`}>Dashboard</span>
        </li>
        <li className={`flex items-center transition-all duration-500 ${isNavOpen ? 'gap-5' : 'gap-0'}`}>
          <a href=""><Settings className="text-white size-8" /></a>
          <span className={`text-white text-2xl overflow-hidden transition-all duration-500 ${isNavOpen ? 'w-40' : 'w-0'}`}>Settings</span>
        </li>
      </ul>
      <div className="px-8 w-full bg-gray75 h-px" />
      <div className={`flex mt-auto transition-all duration-500 ${isNavOpen ? 'gap-5' : 'gap-0'}`}>
        <div 
          className="size-14 rounded-full bg-cover"
          style={{backgroundImage: "url(https://www.prosettings.com/site/wp-content/uploads/2018/05/Alan-alanzoka-Ferreira-250x350.jpg)"}}
        />
        <div className="flex flex-col">
          <span className={`text-white text-2xl overflow-hidden transition-all duration-500 truncate ${isNavOpen ? 'w-40' : 'w-0'}`}>Alan F.</span>
          <span className={`text-white text-lg overflow-hidden transition-all duration-500 truncate ${isNavOpen ? 'w-40' : 'w-0'}`}>The Best Streamer</span>
        </div>
      </div>
    </div>
  )
}