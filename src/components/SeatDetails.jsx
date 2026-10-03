import { MapPin, Tag, X } from "lucide-react"
import BookingForm from "./BookingForm"
import { STATUS_STYLES, formatDate } from "../utils"

const Row = ({ icon: Icon, label, value }) => (
  <div className="flex items-center justify-between py-2 border-b border-slate-100 text-sm">
    <span className="flex items-center gap-2 text-slate-500">
      <Icon size={15} />
      {label}
    </span>
    <span className="font-medium">{value}</span>
  </div>
)

const SeatDetails = ({ seat, booking, isMine, profile, busy, onClose, onBook, onCancel }) => {
  const style = STATUS_STYLES[seat.status]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="size-14 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl font-bold">
              {seat.seatId}
            </span>
            <div>
              <h3 className="text-lg font-bold">Seat {seat.seatId}</h3>
              <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${style.badge}`}>
                {style.label}
              </span>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1 hover:bg-slate-100 cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="mb-5">
          <Row icon={MapPin} label="Location" value={seat.location} />
          <Row icon={Tag} label="Seat type" value={seat.type} />
        </div>

        {seat.status === "available" && <BookingForm profile={profile} busy={busy} onSubmit={onBook} />}

        {seat.status === "occupied" && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            This seat is currently occupied and cannot be booked.
          </p>
        )}

        {seat.status === "reserved" && (
          <div className="space-y-3">
            {booking ? (
              <div className="rounded-lg bg-amber-50 p-4 text-sm space-y-1">
                <p className="font-semibold text-amber-800">Booking information</p>
                <p>Student: {booking.studentName}</p>
                <p>Roll no: {booking.rollNo}</p>
                <p>Date: {formatDate(booking.date)}</p>
                {booking.time && <p>Time: {booking.time}</p>}
              </div>
            ) : (
              <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                This seat is reserved.
              </p>
            )}
            {booking && isMine && (
              <button
                type="button"
                onClick={() => onCancel(booking)}
                disabled={busy}
                className="w-full rounded-lg bg-red-600 py-2.5 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60 cursor-pointer"
              >
                {busy ? "Cancelling..." : "Cancel Booking"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SeatDetails
