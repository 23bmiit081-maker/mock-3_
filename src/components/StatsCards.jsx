import { Armchair, CalendarCheck, CheckCircle2, Clock, Users } from "lucide-react"
import { todayString } from "../utils"

const StatsCards = ({ seats, bookings }) => {
  const today = todayString()
  const count = (status) => seats.filter((s) => s.status === status).length
  const todaysBookings = bookings.filter((b) => b.date === today && b.status === "active").length

  const cards = [
    { label: "Total Seats", value: seats.length, icon: Armchair, color: "bg-indigo-100 text-indigo-600" },
    { label: "Available", value: count("available"), icon: CheckCircle2, color: "bg-green-100 text-green-600" },
    { label: "Occupied", value: count("occupied"), icon: Users, color: "bg-red-100 text-red-600" },
    { label: "Reserved", value: count("reserved"), icon: Clock, color: "bg-amber-100 text-amber-600" },
    { label: "Today's Bookings", value: todaysBookings, icon: CalendarCheck, color: "bg-sky-100 text-sky-600" },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 flex items-center gap-4"
        >
          <span className={`size-12 rounded-xl flex items-center justify-center ${color}`}>
            <Icon size={24} />
          </span>
          <div>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards
