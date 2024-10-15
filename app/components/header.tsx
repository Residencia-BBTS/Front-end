import { AlignJustify, LayoutGrid, Settings, Ticket } from "lucide-react"

export const Header = () => {
  return (
    <div className="flex flex-col gap-6 items-center absolute left-0 top-0 h-screen w-28 py-32 bg-blue400">
      <img src="BancoDoBrasil-Logo.svg" alt="Logo BB" />
      <div className="w-2/4 bg-gray75 h-px" />
      <ul className="space-y-10">
        <li>
          <a href="">
            <AlignJustify className="text-white size-8" />
          </a>
        </li>
        <li>
          <a href="">
            <Ticket className="rotate-90 text-white size-8" />
          </a>
        </li>
        <li>
          <a href="">
            <LayoutGrid className="text-white size-8" />
          </a>
        </li>
        <li>
          <a href="">
            <Settings className="text-white size-8" />
          </a>
        </li>
      </ul>
      <div 
        className="size-14 rounded-full bg-cover mt-auto"
        style={{backgroundImage: "url(https://www.prosettings.com/site/wp-content/uploads/2018/05/Alan-alanzoka-Ferreira-250x350.jpg)"}}
      />
    </div>
  )
}