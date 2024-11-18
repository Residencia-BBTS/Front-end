'use client'

import { useCallback, useEffect } from "react";
import { Header } from "../components/header"
import { useDispatch, useSelector } from "react-redux";
import { set_userList } from "../../redux/slices/state-slices";
import { IStates } from "../lib/global-state-interface";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';

const Users = () => {

  const { data: session } = useSession()

  if(!session) {
    redirect('/login')
  }

  dayjs.extend(duration)

  const dispatch = useDispatch()
  const userList = useSelector((state: { states: IStates }) => state.states.userList)

  const formatTime = useCallback((seconds) => {
    const ms = seconds * 1000
    const time = dayjs.duration(ms)
    const days = Math.floor(time.asDays())
    const hours = String(time.hours())
    const minutes = String(time.minutes())
    const secondsFormatted = String(time.seconds())
    return `${days} dias, ${hours} horas, ${minutes} minutos, ${secondsFormatted} segundos`
}, [ userList ])

console.log(formatTime(1641600))

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_USER_API_URL}/all-users`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: User[] = await response.json();
        dispatch(set_userList(data))
      } catch (error) {
        console.log(error.message)
      }
    };

    fetchTickets();

    const intervalId = setInterval(fetchTickets, 1800000);

    return () => clearInterval(intervalId);
  }, [])

  return (
    <>
      <Header />

      <div className="flex flex-col items-center py-16 px-36 size-screen gap-8">
        
        <div className="self-start space-y-4">
          <h1 className="text-4xl">Usuários ativos</h1>
        </div>

        <div className="max-h-[700px] overflow-y-scroll overflow-x-hidden">
          <table className="w-full table-fixed">
            <thead className="text-2xl h-16 border border-gray75">
              <tr>
                <th className="w-[15%] font-normal"></th>
                <th className="w-[15%] font-normal">Nome</th>
                <th className="w-[15%] font-normal">E-mail</th>
                <th className="w-[15%] font-normal">Tickets atribuidos</th>
                <th className="w-[15%] font-normal">Tickets fechados</th>
                <th className="w-[25%] font-normal">Média de fechamento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray75 border-b border-gray75">
              {userList && userList.map((user, index) => (
                  <tr key={index} className="h-14">
                    <td className="text-center text-lg truncate">{user.is_staff ? 'Admin' : 'Analista'}</td>
                    <td className="text-center text-lg truncate">{user.username}</td>
                    <td className="text-center text-lg truncate">{user.email}</td>
                    <td className="text-center text-lg truncate">{user.tickets_atribuidos}</td>
                    <td className="text-center text-lg truncate">{user.tickets_fechados}</td>
                    <td className="text-center text-lg truncate">{formatTime(user.avg_resolution_time)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}

export default Users