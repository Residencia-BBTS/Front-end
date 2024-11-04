'use client'

import { LayoutGrid, Ticket } from "lucide-react"
import { useSelector, useDispatch } from "react-redux";
import { IStates } from "../lib/global-state-interface";
import { set_isNavOpen } from "../../redux/slices/state-slices";
import Link from "next/link";
import { useSession } from "next-auth/react";

export const Header = () => {

  const { data: session } = useSession()
  const dispatch = useDispatch()
  const isNavOpen = useSelector((state: { states: IStates }) => state.states.isNavOpen)

  return (
    <div 
      className={`flex flex-col gap-6 items-center absolute left-0 top-0 h-screen py-32 bg-blue400 transition-all duration-500 z-40 ${isNavOpen ? "px-8 w-96" : "px-8 w-24"}`}
      onMouseEnter={() => dispatch(set_isNavOpen(true))}
      onMouseLeave={() => dispatch(set_isNavOpen(false))}
    >
      <div className="flex gap-5">
        <img src="../BancoDoBrasil-Logo.svg" alt="Logo BB" />
        <img src="../Banco Do Brasil.svg" className={`transition-all duration-500 h-14 overflow-hidden ${isNavOpen ? "w-56" : "w-0"}`} alt="" />
      </div>
      <div className="px-8 w-full bg-gray75 h-px" />
      <ul className="space-y-10">
        <li>
          <Link href="/tickets"  className={`group flex items-center duration-500 ${isNavOpen ? 'gap-5' : 'gap-0'}`}>
            <span><Ticket className="group-hover:text-yellow400 rotate-90 text-white size-8" /></span>
            <span className={`group-hover:text-yellow400 text-white text-2xl transition-[width] overflow-hidden duration-500 ${isNavOpen ? 'w-40' : 'w-0'}`}>Ticket</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className={`group flex items-center duration-500 ${isNavOpen ? 'gap-5' : 'gap-0'}`}>
            <span><LayoutGrid className="group-hover:text-yellow400 text-white size-8" /></span>
            <span className={`group-hover:text-yellow400 text-white text-2xl overflow-hidden transition-[width] duration-500 ${isNavOpen ? 'w-40' : 'w-0'}`}>Dashboard</span>
          </Link>
        </li>
      </ul>
      <div className="px-8 w-full bg-gray75 h-px" />
      <Link href="/profile" className={`flex mt-auto transition-all duration-500 ${isNavOpen ? 'gap-5' : 'gap-0'}`}>
        <div 
          className="size-14 rounded-full bg-cover"
          style={{backgroundImage: `url(${session && session.user.image})`}}
        />
        <div className="group flex flex-col">
          <span className={`text-white group-hover:text-yellow400 text-2xl overflow-hidden transition-[width] duration-500 truncate ${isNavOpen ? 'w-40' : 'w-0'}`}>
            {session && session.user.name}
          </span>
          <span className={`text-white group-hover:text-yellow400 text-lg overflow-hidden transition-[width] duration-500 truncate ${isNavOpen ? 'w-40' : 'w-0'}`}>
            {session && session.user.email}
          </span>
        </div>
      </Link>
    </div>
  )
}