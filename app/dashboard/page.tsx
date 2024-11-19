'use client'

import { useDispatch, useSelector } from "react-redux"
import { Header } from "../components/header"
import { useEffect, useState } from "react"
import { set_dayRangeFilter, set_ticketData } from "../../redux/slices/state-slices"
import { TicketBarGraph } from "./ticket-bar-graph"
import { TicketCard } from "./ticket-card"
import { TicketLineGraph } from "./ticket-line-graph"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { IStates } from "../lib/global-state-interface"
import { DateRange, DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import dayjs from "dayjs"
import { Calendar } from "lucide-react"

const Dashboard = () => {

  const dispatch = useDispatch()

  const { data: session } = useSession()

  const dateRange = useSelector((state: { states: IStates }) => state.states.dayRangeFilter)
  const [ isDateModalOpen, setIsDateModalOpen ] = useState<boolean>(false)
  const [ dateRangeAsDate, setDateRangeAsDate ] = useState<DateRange | null>(null)

  if(!session) {
    redirect('/login')
  }

  const handleDateModal = () => {
    setIsDateModalOpen(!isDateModalOpen)
  }

  useEffect(() => {
    setDateRangeAsDate({
      from: new Date(dateRange.from),
      to: new Date(dateRange.to),
    });
  }, [])

  useEffect(() => {
    if(dateRangeAsDate) {
      dispatch(set_dayRangeFilter({
        from: dateRangeAsDate.from.toISOString(),
        to: dateRangeAsDate.to.toISOString(),
      }))
    }
  }, [ dateRangeAsDate ])

  useEffect(() => {   
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_TICKET_API_URL}/?start_date=${dateRange.from}&end_date=${dateRange.to}`);
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
  }, [ dateRange ])

  return (
    <>
      <Header />

      <div className="flex flex-col items-center py-16 px-36 size-screen gap-10">

        <div className="self-start space-y-4">
          <h1 className="text-4xl">Dashboard</h1>
          <button 
            className="flex items-center gap-2"
            onClick={handleDateModal}
          >
            <span className="text-2xl border-l border-gray75 pl-4">Exibir: </span>
            <span>{`${dayjs(dateRange.from).format('DD/MM/YYYY')} até ${dayjs(dateRange.to).format('DD/MM/YYYY')}`}</span>
            <Calendar />
          </button>
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
          {/* <TicketBarGraph />
          <TicketLineGraph /> */}
        </div>

      </div>

      {isDateModalOpen && (
        <>
          <div onClick={handleDateModal} className="absolute inset-0 z-50 flex items-center justify-center bg-black/80">
            <div onClick={e => e.stopPropagation()} className="flex flex-col gap-5 rounded-xl p-12 bg-white">
              <DayPicker 
                mode="range" 
                selected={dateRangeAsDate} 
                onSelect={setDateRangeAsDate} 
              />
            </div>
          </div>
        </>
      )}

    </>
  )
}

export default Dashboard