import { Link } from "react-router-dom"
import StatsCards from "./StatsCards"
import { formatDate, todayString } from "../utils"

const Dashboard = ({ seats, bookings, areas }) => {
  const today = todayString()
  const todays = bookings.filter((b) => b.date === today && b.status === "active")
  const locationOf = (seatId) => seats.find((s) => s.seatId === seatId)?.location ?? "-"

  return (
    <div className="space-y-6">
      <StatsCards seats={seats} bookings={bookings} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold mb-4">Availability by area</h3>
          <div className="space-y-4">
            {areas.map((area) => {
              const inArea = seats.filter((s) => s.location === area)
              const free = inArea.filter((s) => s.status === "available").length
              const percent = inArea.length ? Math.round((free / inArea.length) * 100) : 0
              return (
                <div key={area}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{area}</span>
                    <span className="text-slate-500">
                      {free} / {inArea.length} free
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-green-500" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              )
            })}
            {areas.length === 0 && <p className="text-sm text-slate-500">No areas to show.</p>}
          </div>
          <Link
            to="/seats"
            className="mt-6 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Find a seat
          </Link>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold mb-1">Today's bookings</h3>
          <p className="text-sm text-slate-500 mb-4">{formatDate()}</p>
          {todays.length === 0 ? (
            <p className="text-sm text-slate-500">No bookings made for today yet.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {todays.map((b) => (
                <li key={b.id} className="flex items-center justify-between py-2.5 text-sm">
                  <div>
                    <p className="font-semibold">{b.studentName}</p>
                    <p className="text-slate-500">
                      {b.rollNo} · {locationOf(b.seatId)}
                    </p>
                  </div>
                  <span className="rounded-lg bg-amber-100 px-3 py-1 font-bold text-amber-700">{b.seatId}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
