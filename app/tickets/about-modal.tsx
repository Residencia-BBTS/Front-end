import dayjs from "dayjs"
import { useDispatch } from "react-redux"
import { set_isAboutModal } from "../../redux/slices/state-slices"

interface AboutModalProps {
  ticket: Incident
}

const AboutModal = ({ 
  ticket
}: AboutModalProps) => {

  const dispatch = useDispatch()

  const handleAboutModal = () => {
    dispatch(set_isAboutModal(false))
  }

  return (
    <>
      <div onClick={handleAboutModal} className="absolute inset-0 z-50 flex items-center justify-center bg-black/80">
        <div onClick={e => e.stopPropagation()} className="flex flex-col gap-5 rounded-xl p-12 bg-white">
          <div className="flex justify-between gap-10">
            <label className="flex flex-col gap-3">
              ID
              <span className="block w-fit p-3 border rounded-xl border-gray75">{ticket.uuid}</span>
            </label>
            <label className="flex flex-col gap-3 text-right">
              Data de criação
              <span className="block w-fit self-end p-3 border rounded-xl border-gray75">{dayjs(ticket.createdTime).format('DD/MM/YYYY')}</span>
            </label>
          </div>
          
          <div className="flex justify-between gap-10">
            <label className="flex flex-col gap-3">
              Data de modificação
              <span className="block w-fit p-3 border rounded-xl border-gray75">{dayjs(ticket.lastModifiedTime).format('DD/MM/YYYY')}</span>
            </label>
            <label className="flex flex-col gap-3 text-right">
              Usuário destinado
              <span className="block w-fit self-end p-3 border rounded-xl border-gray75">{ticket.assignedTo}</span>
            </label>
          </div>

          <div className="flex justify-between gap-10">
            <label className="flex flex-col gap-3">
              Categoria
              <span className="block w-fit p-3 border rounded-xl border-gray75">Segurança</span>
            </label>
            <label className="flex flex-col gap-3 text-right">
              Urgência
              <span className="block w-fit self-end p-3 border rounded-xl border-gray75">{ticket.severity}</span>
            </label>
          </div>

          <label className="flex flex-col gap-3 text-center">
            Título
            <span className="block w-full p-3 border rounded-xl border-gray75">{ticket.title}</span>
          </label>

          <label className="flex flex-col gap-3 text-center">
            Descrição
            <span className="block max-h-40 w-full p-3 border rounded-xl overflow-y-scroll border-gray75">{ticket.description}</span>
          </label>
        </div>
      </div>
    </>
  )
}

export default AboutModal