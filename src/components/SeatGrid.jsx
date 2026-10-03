import { useState } from "react"
import SeatCard from "./SeatCard"
import { STATUSES, STATUS_STYLES } from "../utils"

const SeatGrid = ({ seats, mySeatIds, selectedId, onSelect }) => {
  const [filter, setFilter] = useState("all")

  const visible = filter === "all" ? seats : seats.filter((s) => s.status === filter)
  const rows = [...new Set(visible.map((s) => s.row))].sort()
  const filters = ["all", ...STATUSES]

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const total = f === "all" ? seats.length : seats.filter((s) => s.status === f).length
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition cursor-pointer ${
                  filter === f
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f} <span className="opacity-70">({total})</span>
              </button>
            )
          })}
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
          {STATUSES.map((s) => (
            <span key={s} className="flex items-center gap-1.5">
              <span className={`size-3 rounded-full ${STATUS_STYLES[s].dot}`} />
              {STATUS_STYLES[s].label}
            </span>
          ))}
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-indigo-500" />
            My seat
          </span>
        </div>
      </div>

      {seats.length === 0 && (
        <p className="py-12 text-center text-slate-500">No seats found for this area.</p>
      )}

      {seats.length > 0 && visible.length === 0 && (
        <p className="py-12 text-center text-slate-500">No {filter} seats right now.</p>
      )}

      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-3">
            <span className="w-8 shrink-0 text-center text-lg font-bold text-slate-400">{row}</span>
            <div className="grid flex-1 grid-cols-5 sm:grid-cols-10 gap-3">
              {visible
                .filter((s) => s.row === row)
                .sort((a, b) => a.number - b.number)
                .map((seat) => (
                  <SeatCard
                    key={seat.id}
                    seat={seat}
                    mine={mySeatIds.includes(seat.seatId)}
                    selected={selectedId === seat.id}
                    onSelect={onSelect}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SeatGrid
