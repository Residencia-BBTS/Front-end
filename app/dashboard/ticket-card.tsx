import { useSelector } from "react-redux"
import { IStates } from "../lib/global-state-interface"

interface TicketCardProps {
  name: string,
  type: "New" | "Resolved" | "In Progress" | "All"
}

export const TicketCard = ({
  name,
  type
}: TicketCardProps) => {

  const ticketData = useSelector((state: { states: IStates }) => state.states.ticketData)
  
  return (
    <>
      <div className="flex flex-col justify-around h-28 w-52 rounded-xl p-4 bg-blue400">
        <span className="flex items-center gap-2 text-lg font-semibold text-white">
          <div className="h-4 w-[2px] bg-yellow400" />
          {name}
        </span>
        <span className="text-yellow400 font-semibold text-3xl">
          {!ticketData ? '0' : type === 'All' ? ticketData.length : ticketData.filter(ticket => ticket.status === type).length}
        </span>
      </div>
    </>
  )
}