'use client'

import { signOut, useSession } from "next-auth/react"
import { Header } from "../components/header"
import { redirect } from "next/navigation"

const Profile = () => {

  const { data: session } = useSession()

  if (!session) {
    redirect('/login')
  }

  const logout = () => {
    signOut()
    redirect('/login')
  }

  return (
    <div className="flex justify-between overflow-hidden">
      <Header />

      <div className="flex flex-col gap-12 px-40 py-16">
        <label className="flex flex-col gap-6 text-2xl border-b pb-3 focus:outline-none">Nome
          <span className="text-lg truncate">{session && session.user.name}</span>
        </label>
        <label className="flex flex-col gap-6 text-2xl border-b pb-3 focus:outline-none">ID
          <span className="text-lg truncate">5837198721</span>
        </label>
        <label className="flex flex-col gap-6 text-2xl border-b pb-3 focus:outline-none">E-mail
          <span className="text-lg truncate">{session && session.user.email}</span>
        </label>
        <button 
          className="h-20 text-3xl font-semibold bg-red500 w-full text-white rounded-xl"
          onClick={logout}
        >
          Sair
        </button>
      </div>

      <div className="absolute right-0 flex items-center justify-center min-h-screen">
        <div className=" absolute top-16 right-16 rounded-full bg-yellow400 p-6 z-30">
          <div 
            className="rounded-full z-20 size-60 bg-center bg-cover" 
            style={{ backgroundImage: `url(${session && session.user.image})`}} 
          />
        </div>
        <div className="absolute h-[400px] w-[800px] -right-[300px] -top-[100px] rotate-45 z-10 bg-blue400" />
        <div className="absolute h-[500px] w-[1100px] -right-[350px] -top-[50px] rotate-45 bg-yellow400" />
      </div>
    </div>
  )
}

export default Profile