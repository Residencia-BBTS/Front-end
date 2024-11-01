'use client'

import React, { useEffect, useState } from "react";
import { Header } from "../components/header";
import AboutModal from "./about-modal";
import { useDispatch, useSelector } from "react-redux";
import { IStates } from "../lib/global-state-interface";
import { set_isAboutModal, set_ticketData } from "../../redux/slices/state-slices";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import { Button } from "../components/button";

const Home = () => {

  const { data: session } = useSession()

  if(!session) {
    redirect('/login')
  }

  const dispatch = useDispatch()
  const isAboutModalOpen = useSelector((state: { states: IStates }) => state.states.isAboutModal)
  const ticketData = useSelector((state: { states: IStates }) => state.states.ticketData)
  const [ selectedTicket, setSelectedTicket ] = useState<Incident | null>(null)
  const [ ticketOrder, setTicketOrder ] = useState<string>('recent')
  const [ ticketFilterStatus, setTicketFilterStatus ] = useState<string | null>(null)
  const [ ticketFilterSeverity, setTicketFilterSeverity ] = useState<string | null>(null)

  useEffect(() => {
    if (ticketFilterStatus === 'Todos') {
      setTicketFilterStatus(null)
    }
  }, [ ticketFilterStatus ])

  useEffect(() => {
    if (ticketFilterSeverity === 'Todos') {
      setTicketFilterSeverity(null)
    }
  }, [ ticketFilterSeverity ])

  useEffect(() => {
    console.log(ticketFilterSeverity)
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/?order=${ticketOrder}${ticketFilterSeverity ? `&severity=${ticketFilterSeverity}` : ''}${ticketFilterStatus ? `&status=${ticketFilterStatus}` : ''}`
        );
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
  }, [ ticketOrder, ticketFilterStatus, ticketFilterSeverity ])

  return (
    <>
    
      <Header />

      <div className="flex flex-col items-center py-16 px-36 size-screen gap-8">

        <div className="self-start space-y-4">
          <h1 className="text-4xl">Tickets</h1>

          <div className="flex gap-8 border-l border-gray75 pl-4">
            <div className="flex gap-2">
              <span className="text-2xl">Exibir: </span>
              <select onChange={e => setTicketOrder(e.currentTarget.value)}>
                <option value="recent">Mais recentes</option>
                <option value="oldest">Mais antigos</option>
              </select>
            </div>
            
            <div className="flex gap-2">
              <span className="text-2xl">Severidade: </span>
              <select onChange={e => setTicketFilterSeverity(e.currentTarget.value)}>
                <option value={null}>Todos</option>
                <option value="High">Alta</option>
                <option value="Medium">Média</option>
                <option value="Low">Baixa</option>
              </select>
            </div>

            <div className="flex gap-2">
              <span className="text-2xl">Status: </span>
              <select onChange={e => setTicketFilterStatus(e.currentTarget.value)}>
                <option value={null}>Todos</option>
                <option value="New">Tickets Novos</option>
                <option value="In_Progess">Em progresso</option>
                <option value="Resolved">Resolvidos</option>
              </select>
            </div>
          </div>
        </div>

        <div className="max-h-[700px] overflow-y-scroll overflow-x-hidden">
          <table className="w-full table-fixed">
            <thead className="text-2xl h-16 border border-gray75">
              <tr>
                <th className="w-[15%] font-normal">ID</th>
                <th className="w-[13%] font-normal">Criação</th>
                <th className="w-[16%] font-normal">Modificação</th>
                <th className="w-[12%] font-normal">Status</th>
                <th className="w-[10%] font-normal">Gravidade</th>
                <th className="w-[15%] font-normal">Usuário </th>
                <th className="w-[20%] font-normal">Título</th>
                <th className="w-[10%]"></th> 
              </tr>
            </thead>
            <tbody className="divide-y divide-gray75 border-b border-gray75">
              {ticketData && ticketData.map(ticket => (
                <tr key={ticket.uuid} className="h-14">
                  <td className="w-[15%] text-center text-lg truncate">{ticket.uuid}</td>
                  <td className="w-[13%] text-center text-lg">{dayjs(ticket.createdTime).format('DD/MM/YYYY')}</td>
                  <td className="w-[16%] text-center text-lg">{dayjs(ticket.lastModifiedTime).format('DD/MM/YYYY')}</td>
                  <td className="w-[12%] text-center text-lg">{ticket.status}</td>
                  <td className="w-[10%] text-center text-lg">{ticket.severity}</td>
                  <td className="w-[15%] text-center text-lg truncate">{ticket.assignedTo}</td>
                  <td className="w-[20%] text-center text-lg truncate">{ticket.title}</td>
                  <td className="w-[10%]">
                    <div className="flex items-center justify-center">
                      <Button
                        size="small"
                        onClick={() => {
                          setSelectedTicket(ticket)
                          dispatch(set_isAboutModal(true))
                        }} 
                      >
                        Acessar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {isAboutModalOpen && selectedTicket && (
        <AboutModal ticket={selectedTicket} />
      )}

    </>
  );
}

export default Home