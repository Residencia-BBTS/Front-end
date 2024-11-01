'use client'

import { signIn, useSession } from "next-auth/react"

const Login = () => {

  const { data: session } = useSession()
  
  console.log(session)

 return (
  <div className="grid grid-cols-2 h-screen overflow-hidden">
    <div className="flex items-center justify-center relative h-full bg-yellow400">
      <img src="../BB Logo full.svg" alt="" />
      <div className="absolute top-0 -right-[200px] w-[200px] h-[110%] bg-white transform origin-top-right rotate-12" />
    </div>

    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-[425px] gap-3">
        <button className="h-20 text-3xl font-semibold bg-blue400 w-full text-white rounded-xl" onClick={() => signIn("azure-ad-b2c", { callbackUrl: '/tickets' })}>Azure</button>
        <button className="h-20 text-3xl font-semibold bg-blue400 w-full text-white rounded-xl" onClick={() => signIn("github", { callbackUrl: '/tickets' })}>Github</button>
      </div>
    </div>
  </div>
 )
}

export default Login