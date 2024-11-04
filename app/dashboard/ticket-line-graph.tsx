import { useSelector } from "react-redux"
import { IStates } from "../lib/global-state-interface"
import { LineChart } from "@mui/x-charts"
import dayjs from "dayjs"
import { useCallback, useEffect, useState } from "react"

export const TicketLineGraph = () => {

  const dayAmount = useSelector((state: { states: IStates }) => state.states.dayAmountFilter)
  const ticketData = useSelector((state: { states: IStates }) => state.states.ticketData)
  const [ lastDays, setLastDays ] = useState<string[] | null>(null)
  const [ graphData, setGraphData ] = useState<number[] | null>(null)

  const getLastDays = useCallback((dayAmount: number): string[] => {
    const startDate = new Date();
    const pastDays: string[] = []

    for (let i = 0; i < dayAmount; i++) {
      const pastDate = new Date(startDate);
      pastDate.setDate(startDate.getDate() - i);
      pastDays.push(dayjs(pastDate).format('YYYY-MM-DD'));
  }
    return pastDays
  }, [ dayAmount ])

  const generateGraphData = useCallback((dayAmount: number): number[] => {
    const days = getLastDays(dayAmount)
    const ticketsGroupedByDay: number[] = []
    let counter = 0
    for (let i = 0; i < days.length; i++) {
      let dayCounter = 0
      while (counter < ticketData.length) {
        if (dayjs(ticketData[counter].createdTime).format('YYYY-MM-DD') !== days[i]) {
          break
        }
        if (ticketData[counter].status === 'New') {
          dayCounter++
        }
        counter++
      }
      ticketsGroupedByDay[i] = dayCounter
    }

    return ticketsGroupedByDay
  }, [ dayAmount, ticketData ])

  useEffect(() => { 
    setLastDays(getLastDays(dayAmount).reverse())    
    setGraphData(generateGraphData(dayAmount).reverse())    
  })

  return (
    <>
      <div className="p-9 border border-blue400 rounded-xl">
        {lastDays && graphData && (
          <LineChart
            xAxis={[{ scaleType: 'point', data: lastDays }]}
            series={[
              {
                color: '#F3D901',
                curve: "linear",
                data: graphData,
                area: true,
                label: 'Novos Tickets'
              },
            ]}
            width={500}
            height={300}
          />
        )}
      </div>
    </>
  )
}