'use client'

import { useDispatch, useSelector } from "react-redux"
import { Header } from "../../components/header"
import { IStates } from "../../lib/global-state-interface"
import { useEffect } from "react"
import { set_ticketData } from "../../../redux/slices/state-slices"

const Dashboard = () => {

  const dispatch = useDispatch()
  const ticketData = useSelector((state: { states: IStates }) => state.states.ticketData)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/tickets/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Incident[] = await response.json();
        dispatch(set_ticketData(data))
      } catch (error) {
        console.log(error.message)
      }
    };

    fetchTickets();

    const intervalId = setInterval(fetchTickets, 60000);

    return () => clearInterval(intervalId);
  }, [])

  return (
    <>
      <Header />

      <div className="flex flex-col items-center py-16 px-36 size-screen gap-8">

        <div className="self-start space-y-4">
          <h1 className="text-4xl">Dashboard</h1>
          <div className="flex gap-2">
            <span className="text-2xl border-l border-gray75 pl-4">Exibir: </span>
            <select name="" id="">
              <option value="">Últimos 7 dias</option>
            </select>
          </div>
        </div>

        <div className="flex gap-24">

          <div className="flex flex-col justify-around h-28 w-52 rounded-xl p-4 bg-blue400">
            <span className="flex items-center gap-2 text-lg font-semibold text-white">
              <div className="h-4 w-[2px] bg-yellow400" />
              Novos tickets
            </span>
            <span className="text-yellow400 font-semibold text-3xl">
              {!ticketData ? '0' : ticketData.filter(ticket => ticket.status === 'New').length}
            </span>
          </div>

          <div className="flex flex-col justify-around h-28 w-52 rounded-xl p-4 bg-blue400">
            <span className="flex items-center gap-2 text-lg font-semibold text-white">
              <div className="h-4 w-[2px] bg-yellow400" />
              Tickets ativos
            </span>
            <span className="text-yellow400 font-semibold text-3xl">
              {!ticketData ? '0' : ticketData.filter(ticket => ticket.status === 'In Progress').length}
            </span>
          </div>

          <div className="flex flex-col justify-around h-28 w-52 rounded-xl p-4 bg-blue400">
            <span className="flex items-center gap-2 text-lg font-semibold text-white">
              <div className="h-4 w-[2px] bg-yellow400" />
              Tickets fechados
            </span>
            <span className="text-yellow400 font-semibold text-3xl">
              {!ticketData ? '0' : ticketData.filter(ticket => ticket.status === 'Resolved').length}
            </span>
          </div>

          <div className="flex flex-col justify-around h-28 w-52 rounded-xl p-4 bg-blue400">
            <span className="flex items-center gap-2 text-lg font-semibold text-white">
              <div className="h-4 w-[2px] bg-yellow400" />
              Todos tickets
            </span>
            <span className="text-yellow400 font-semibold text-3xl">
              {!ticketData ? '0' : ticketData.length}
            </span>
          </div>

        </div>
      </div>
    </>
  )
}

export default Dashboard