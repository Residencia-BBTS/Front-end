// import { useSelector } from "react-redux"
// import { IStates } from "../../lib/global-state-interface"
import { LineChart } from "@mui/x-charts"
import dayjs from "dayjs"

export const TicketLineGraph = () => {

  // const ticketData = useSelector((state: { states: IStates }) => state.states.ticketData)

  const getLastDays = (x: number): string[] => {
    const startDate = new Date();
    const pastDays: string[] = []

    for (let i = 0; i < x; i++) {
      const pastDate = new Date(startDate);
      pastDate.setDate(startDate.getDate() - i);
      pastDays.push(dayjs(pastDate).format('YYYY-MM-DD'));
  }
    return pastDays.reverse()
  }

  return (
    <>
      <div className="p-9 border border-blue400 rounded-xl">
        <LineChart
          xAxis={[{ scaleType: 'point', data: getLastDays(7) }]}
          series={[
            {
              color: '#F3D901',
              curve: "linear",
              data: [1, 2, 3, 4, 5, 6, 7],
              area: true,
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </>
  )
}