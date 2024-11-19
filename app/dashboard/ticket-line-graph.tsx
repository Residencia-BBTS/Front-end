import { useSelector } from "react-redux"
import { IStates } from "../lib/global-state-interface"
import { LineChart } from "@mui/x-charts"
import dayjs from "dayjs"
import { useCallback, useEffect, useState } from "react"

export const TicketLineGraph = () => {

  const dateRange = useSelector((state: { states: IStates }) => state.states.dayRangeFilter)
  const ticketData = useSelector((state: { states: IStates }) => state.states.ticketData)

  const [ dayAmount, setDayAmount ] = useState<number | null>(null)

  const  daysBetweenDates = useCallback((date1: string, date2: string): number => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const differenceInMs = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
  }, [])

  const getLastDays = useCallback((dayAmount: number): string[] => {
    const startDate = new Date(dateRange.to);
    const pastDays: string[] = []

    for (let i = 0; i <= dayAmount; i++) {
      const pastDate = new Date(startDate);
      pastDate.setDate(startDate.getDate() - i);
      pastDays.push(dayjs(pastDate).format('YYYY MM DD'));
  }
    return pastDays
  }, [ dayAmount, ticketData, dateRange ])

  const generateGraphData = useCallback((dayAmount: number): number[] => {
    const days = getLastDays(dayAmount)
    const ticketsGroupedByDay: number[] = []
    let counter = 0
    for (let i = 0; i < days.length; i++) {
      let dayCounter = 0
      while (counter < ticketData.length) {
        if (dayjs(ticketData[counter].createdTime).format('YYYY MM DD') !== days[i]) {
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
    if(dateRange) {
      setDayAmount(daysBetweenDates(dateRange.from, dateRange.to))
    }
  }, [ dateRange ])

  return (
    <>
      <div className="p-9 border border-blue400 rounded-xl">
        <LineChart
          xAxis={[{ scaleType: 'point', data: getLastDays(dayAmount).reverse() }]}
          series={[
            {
              color: '#F3D901',
              curve: "linear",
              data: generateGraphData(dayAmount).reverse(),
              area: true,
              label: 'Novos Tickets'
            },
          ]}
          grid={{ vertical: true, horizontal: true }}
          width={500}
          height={300}
        />
      </div>
    </>
  )
}