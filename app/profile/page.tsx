'use client'

import { useSession } from "next-auth/react"
import { Header } from "../components/header"
import { redirect } from "next/navigation"

const Profile = () => {

  const { data: session } = useSession()

  if(!session) {
    redirect('/login')
  }

  return (
    <div className="flex justify-between overflow-hidden">
      <Header />

      <div className="flex flex-col gap-12 px-40 py-16">
        <label className="flex flex-col gap-6 text-2xl border-b pb-3 focus:outline-none" htmlFor="name">Nome
          <input 
            type="text" 
            value='Alanzoka' 
            name="name"
            className="text-lg truncate"
          />
        </label>
        <label className="flex flex-col gap-6 text-2xl border-b pb-3 focus:outline-none" htmlFor="id">ID
          <input 
            type="text" 
            value='5837198721' 
            name="id"
            className="text-lg truncate"
          />
        </label>
        <label className="flex flex-col gap-6 text-2xl border-b pb-3 focus:outline-none" htmlFor="email">E-mail
          <input 
            type="email" 
            value='thebeststreamerbr@gmail.com' 
            name="email"
            className="text-lg truncate"
          />
        </label>
        <label className="flex flex-col gap-6 text-2xl border-b pb-3 focus:outline-none" htmlFor="password">Senha
          <input 
            type="password" 
            value='bob123' 
            name="password"
            className="text-lg truncate"
          />
        </label>
        <button className="h-20 text-3xl font-semibold bg-red500 w-full text-white rounded-xl">Sair</button>
      </div>

      <div className="absolute right-0 flex items-center justify-center min-h-screen">
        <div className=" absolute top-16 right-16 rounded-full bg-yellow400 p-6 z-30">
          <div 
            className="rounded-full z-20 size-60" 
            style={{ backgroundImage: "url(https://www.prosettings.com/site/wp-content/uploads/2018/05/Alan-alanzoka-Ferreira-250x350.jpg)"}} 
          />
        </div>
        <div className="absolute h-[400px] w-[800px] -right-[300px] -top-[100px] rotate-45 z-10 bg-blue400" />
        <div className="absolute h-[500px] w-[1100px] -right-[350px] -top-[50px] rotate-45 bg-yellow400" />
      </div>
    </div>
  )
}

export default Profile