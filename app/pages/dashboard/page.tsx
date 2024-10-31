'use client'

import { useDispatch } from "react-redux"
import { Header } from "../../components/header"
import { useEffect } from "react"
import { set_ticketData } from "../../../redux/slices/state-slices"
import { TicketBarGraph } from "./ticket-bar-graph"
import { TicketCard } from "./ticket-card"
import { TicketLineGraph } from "./ticket-line-graph"

const Dashboard = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchTickets = async () => {
      console.log('fetched')
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

    const intervalId = setInterval(fetchTickets, 10000);

    return () => clearInterval(intervalId);
  }, [])

  return (
    <>
      <Header />

      <div className="flex flex-col items-center py-16 px-36 size-screen gap-10">

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