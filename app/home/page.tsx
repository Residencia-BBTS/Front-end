'use client'

import React, { useEffect, useState } from "react";
import { Header } from "../../app/components/header";
import dayjs from 'dayjs'

export default function Home() {

  const [ ticketData, setTicketData ] = useState<any[] | null>(null)

  useEffect(() => {
   
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/tickets/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Incident[] = await response.json();
        setTicketData(data.map(ticket => ({
          name: ticket.object.name,
          firstActivityTimeUtc: ticket.object.properties.firstActivityTimeUtc,
          lastActivityTimeUtc: ticket.object.properties.lastModifiedTimeUtc,
          status: ticket.object.properties.status,
          severity: ticket.object.properties.severity,
          assignedTo: ticket.object.properties.owner.assignedTo,
          title: ticket.object.properties.title,
        })));
      } catch (error) {
        console.log(error.message)
      }
    };

    fetchTickets();

  }, [])

  return (
    <>
    
      <Header />

      <div className="flex flex-col items-center py-16 size-screen gap-8">

        <div className="w-[1600px] space-y-4">
          <h1 className="text-4xl">Tickets</h1>

          <div className="flex gap-2">
            <span className="text-2xl border-l border-gray75 pl-4">Exibir: </span>
            <select name="" id="">
              <option value="">Data de criação</option>
            </select>
          </div>
        </div>

        <table className="w-[1600px] table-fixed">
          <thead className="text-2xl h-16 border border-gray75">
            <tr>
              <th className="font-normal">ID</th>
              <th className="w-[13%] font-normal">Data de Criação</th>
              <th className="w-[16%] font-normal">Data de Modificação</th>
              <th className="font-normal">Status</th>
              <th className="font-normal">Gravidade</th>
              <th className="w-[15%] font-normal">Usuário Destinado</th>
              <th className="font-normal">Título</th>
              <th className="font-normal"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray75 border-b border-gray75">
            
              {ticketData && ticketData.map(ticket => {
                return (
                 <tr key={ticket.name} className="h-14">
                  <td className="text-center text-lg truncate">{ticket.name}</td>
                  <td className="text-center text-lg">{dayjs(ticket.firstActivityTimeUtc).format('DD/MM/YYYY')}</td>
                  <td className="text-center text-lg">{dayjs(ticket.lastActivityTimeUtc).format('DD/MM/YYYY')}</td>
                  <td className="text-center text-lg">{ticket.status}</td>
                  <td className="text-center text-lg">{ticket.severity}</td>
                  <td className="text-center text-lg truncate">{ticket.assignedTo}</td>
                  <td className="text-center text-lg truncate">{ticket.title}</td>
                  <td className="text-center text-lg">
                    <a href="#" className="bg-blue100 py-2.5 px-5 rounded-lg hover:bg-blue200 hover:text-white">
                      Acessar
                    </a>
                  </td>
                </tr>)
              })}

          </tbody>
        </table>

      </div>

    </>
  );
}
