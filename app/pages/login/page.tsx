'use client'

const Login = () => {
 return (
  <div className="grid grid-cols-2 h-screen overflow-hidden">
    <div className="flex items-center justify-center relative h-full bg-yellow400">
      <img src="../BB Logo full.svg" alt="" />
      <div className="absolute top-0 -right-[200px] w-[200px] h-[110%] bg-white transform origin-top-right rotate-12" />
    </div>

    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-[425px] gap-12">
        <span className="text-3xl font-semibold border-b-2 pb-2.5 border-blue400">Sign in</span>
        <form className="flex flex-col gap-6 w-full">
          <label htmlFor="username" className="border-b-2 p-4">
            <input 
              type="text" 
              className="text-xl w-full focus:outline-none" 
              placeholder="Id ou Usuário"
              name="username"
            />
          </label>
          <label htmlFor="password" className="border-b-2 p-4">
            <input 
              type="password" 
              className="text-xl w-full focus:outline-none"
              placeholder="Senha" 
              name="password"
            />
          </label>
        </form>
        <button className="h-20 text-3xl font-semibold bg-blue400 w-full text-white rounded-xl">Login</button>
      </div>
    </div>
    </div>
 )
}

export default Login