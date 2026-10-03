import { CalendarDays, MapPin } from "lucide-react"
import { formatDate } from "../utils"

const Header = ({ title, subtitle, areas, area, onAreaChange, profile }) => {
  const initial = profile.studentName ? profile.studentName.charAt(0).toUpperCase() : "S"

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
          <MapPin size={16} className="text-indigo-500" />
          <select
            value={area}
            onChange={(e) => onAreaChange(e.target.value)}
            className="bg-transparent outline-none font-medium"
          >
            <option value="all">All Areas</option>
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium">
          <CalendarDays size={16} className="text-indigo-500" />
          {formatDate()}
        </div>
        <div className="flex items-center gap-2">
          <span className="size-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
            {initial}
          </span>
          <div className="leading-tight text-sm">
            <p className="font-semibold">{profile.studentName}</p>
            <p className="text-slate-500">{profile.rollNo}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
