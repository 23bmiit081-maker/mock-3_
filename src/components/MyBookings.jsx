import { Trash2 } from "lucide-react"
import { formatDate } from "../utils"

const MyBookings = ({ bookings, seats, busy, onCancel }) => {
  const locationOf = (seatId) => seats.find((s) => s.seatId === seatId)?.location ?? "-"

  if (bookings.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-slate-100">
        <p className="text-lg font-semibold">No active bookings</p>
        <p className="text-slate-500 text-sm mt-1">Pick an available seat from the Seat Layout to book it.</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left text-slate-500">
          <tr>
            <th className="px-5 py-3">Seat</th>
            <th className="px-5 py-3">Location</th>
            <th className="px-5 py-3">Date</th>
            <th className="px-5 py-3">Time</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-t border-slate-100">
              <td className="px-5 py-3 font-bold">{b.seatId}</td>
              <td className="px-5 py-3">{locationOf(b.seatId)}</td>
              <td className="px-5 py-3">{formatDate(b.date)}</td>
              <td className="px-5 py-3">{b.time || "-"}</td>
              <td className="px-5 py-3">
                <span className="rounded-full bg-green-100 px-3 py-0.5 text-xs font-semibold text-green-700 capitalize">
                  {b.status}
                </span>
              </td>
              <td className="px-5 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onCancel(b)}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-60 cursor-pointer"
                >
                  <Trash2 size={14} />
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyBookings
