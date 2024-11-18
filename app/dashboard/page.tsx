'use client'

import { useDispatch, useSelector } from "react-redux"
import { Header } from "../components/header"
import { useEffect } from "react"
import { set_dayAmountFilter, set_ticketData } from "../../redux/slices/state-slices"
import { TicketBarGraph } from "./ticket-bar-graph"
import { TicketCard } from "./ticket-card"
import { TicketLineGraph } from "./ticket-line-graph"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { IStates } from "../lib/global-state-interface"

const Dashboard = () => {

  const dispatch = useDispatch()

  const { data: session } = useSession()

  const dayAmount = useSelector((state: { states: IStates }) => state.states.dayAmountFilter)

  if(!session) {
    redirect('/login')
  }

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_TICKET_API_URL}/?days=${dayAmount}`);
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

    const intervalId = setInterval(fetchTickets, 10000);
    return () => clearInterval(intervalId);
  }, [ dayAmount ])

  return (
    <>
      <Header />

      <div className="flex flex-col items-center py-16 px-36 size-screen gap-10">

        <div className="self-start space-y-4">
          <h1 className="text-4xl">Dashboard</h1>
          <div className="flex gap-2">
            <span className="text-2xl border-l border-gray75 pl-4">Exibir: </span>
            <select onChange={e => {
              dispatch(set_dayAmountFilter(Number(e.currentTarget.value)))
            }}>
              <option value={7}>Últimos 7 dias</option>
              <option value={15}>Últimos 15 dias</option>
              <option value={30}>Últimos 30 dias</option>
            </select>
          </div>
        </div>

        <div className="flex gap-16">
          <TicketCard 
            name="Tickets novos"
            type="New"
          />
          <TicketCard 
            name="Tickets ativos"
            type="In Progress"
          />
          <TicketCard 
            name="Tickets fechados"
            type="Resolved"
          />
          <TicketCard 
            name="Todos tickets"
            type="All"
          />
        </div>

        <div className="flex gap-16">
          <TicketBarGraph />
          <TicketLineGraph />
        </div>

      </div>
    </>
  )
}

export default Dashboard