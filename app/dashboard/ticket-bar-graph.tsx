import { BarChart } from "@mui/x-charts"
import { useSelector } from "react-redux"
import { IStates } from "../lib/global-state-interface"

export const TicketBarGraph = () => {

  const ticketData = useSelector((state: { states: IStates }) => state.states.ticketData)

  

  return (
    <>
      <div className="p-9 border border-blue400 rounded-xl">
        {ticketData && (
          <BarChart
            yAxis={[
              { 
                scaleType: 'band', 
                data: ['Tickets'],
              }
            ]}
            xAxis={[
              { 
                scaleType: 'linear',
              }
            ]}
            series={[
              { 
                data: [ticketData.filter(ticket => ticket.status === 'In Progress').length],
                color: '#1D3061',
                label: 'Ativos'
              },
              { 
                data: [ticketData.filter(ticket => ticket.status === 'Resolved').length],
                color: '#B41C1E',
                label: 'Fechados'
              }
            ]}
            width={500}
            height={300}
            grid={{ horizontal: true }}
            layout="horizontal"
          />
        )}
      </div>
    </>
  )
}