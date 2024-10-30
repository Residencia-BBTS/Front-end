'use client'

import React, { useEffect, useState } from "react";
import { Header } from "../../components/header";
import dayjs from 'dayjs'
import AboutModal from "./about-modal";
import { useDispatch, useSelector } from "react-redux";
import { IStates } from "../../lib/global-state-interface";
import { set_isAboutModal, set_ticketData } from "../../../redux/slices/state-slices";

const Home = () => {

  const dispatch = useDispatch()
  const isAboutModalOpen = useSelector((state: { states: IStates }) => state.states.isAboutModal)
  const [ selectedTicket, setSelectedTicket ] = useState<Incident | null>(null)
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
          <h1 className="text-4xl">Tickets</h1>

          <div className="flex gap-2">
            <span className="text-2xl border-l border-gray75 pl-4">Exibir: </span>
            <select name="" id="">
              <option value="">Data de criação</option>
            </select>
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
                <th className="w-[10%] font-normal"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray75 border-b border-gray75">
              {ticketData && ticketData.map(ticket => (
                <tr key={ticket.uuid} className="h-14">
                  <td className="w-[15%] text-center text-lg truncate">{ticket.uuid}</td>
                  <td className="w-[13%] text-center text-lg">{ticket.createdTime}</td>
                  <td className="w-[16%] text-center text-lg">{ticket.lastModifiedTime}</td>
                  <td className="w-[12%] text-center text-lg">{ticket.status}</td>
                  <td className="w-[10%] text-center text-lg">{ticket.severity}</td>
                  <td className="w-[15%] text-center text-lg truncate">{ticket.assignedTo}</td>
                  <td className="w-[20%] text-center text-lg truncate">{ticket.title}</td>
                  <td className="w-[10%] text-center text-lg">
                    <button 
                      onClick={() => {
                        setSelectedTicket(ticket)
                        dispatch(set_isAboutModal(true))
                      }} 
                      className="bg-blue100 py-2.5 px-5 rounded-lg hover:bg-blue200 hover:text-white">
                      Acessar
                    </button>
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