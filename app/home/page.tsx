'use client'

import React, { useEffect, useState } from "react";
import { Header } from "../../app/components/header";

export default function Home() {

  const [ ticketData, setTicketData ] = useState<any | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      await fetch('http://127.0.0.1:8000/api/tickets/', {
        method: 'GET', 
      })
    }

    fetchData().then(response => {
      setTicketData(response)
    })
    
  })

  useEffect(() => {
    console.log(ticketData)
  }, [ticketData])

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

        <table className="w-[1600px]">
          <thead className="text-2xl h-16 border border-gray75">
            <tr>
              <th className="font-normal">ID</th>
              <th className="font-normal">Data de Criação</th>
              <th className="font-normal">Data de Modificação</th>
              <th className="font-normal">Status</th>
              <th className="font-normal">Gravidade</th>
              <th className="font-normal">Usuário Destinado</th>
              <th className="font-normal">Título</th>
              <th className="font-normal"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray75 border-b border-gray75">
            {/* 
              tickets.map(ticket => {
                return (
                  <tr>
                    <td>{ticket.id}</td>
                    <td>{ticket.dateCreation}</td>
                    <td>{ticket.dateLastMod}</td>
                    <td>{ticket.status}</td>
                    <td>{ticket.priority}</td>
                    <td>{ticket.user}</td>
                    <td>{ticket.message}</td>
                    <td><a href={ticket.redirect}>Acessar</a></td>
                  </tr>)
              })
            */}
            <tr className="h-14">
              <td className="text-center text-lg">15893789347</td>
              <td className="text-center text-lg">01/10/24</td>
              <td className="text-center text-lg">03/10/24</td>
              <td className="text-center text-lg">Novo</td>
              <td className="text-center text-lg">Low</td>
              <td className="text-center text-lg truncate">Lohhan Guilherme</td>
              <td className="text-center text-lg truncate">Email reported by as not junk</td>
              <td className="text-center text-lg">
                <a href="#" className="bg-blue100 py-2.5 px-5 rounded-lg">
                  Acessar
                </a>
              </td>
            </tr>
            <tr className="h-14">
              <td className="text-center text-lg">15893789347</td>
              <td className="text-center text-lg">01/10/24</td>
              <td className="text-center text-lg">03/10/24</td>
              <td className="text-center text-lg">Novo</td>
              <td className="text-center text-lg">Low</td>
              <td className="text-center text-lg truncate">Lohhan Guilherme</td>
              <td className="text-center text-lg truncate">Email reported by as not junk</td>
              <td className="text-center text-lg">
                <a href="#" className="bg-blue100 py-2.5 px-5 rounded-lg">
                  Acessar
                </a>
              </td>
            </tr>
            <tr className="h-14">
              <td className="text-center text-lg">15893789347</td>
              <td className="text-center text-lg">01/10/24</td>
              <td className="text-center text-lg">03/10/24</td>
              <td className="text-center text-lg">Novo</td>
              <td className="text-center text-lg">Low</td>
              <td className="text-center text-lg truncate">Lohhan Guilherme</td>
              <td className="text-center text-lg truncate">Email reported by as not junk</td>
              <td className="text-center text-lg">
                <a href="#" className="bg-blue100 py-2.5 px-5 rounded-lg">
                  Acessar
                </a>
              </td>
            </tr>
          </tbody>
        </table>

      </div>

    </>
  );
}
