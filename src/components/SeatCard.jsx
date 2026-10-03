import { STATUS_STYLES } from "../utils"

const SeatCard = ({ seat, mine, selected, onSelect }) => {
  const style = STATUS_STYLES[seat.status]

  return (
    <button
      type="button"
      onClick={() => onSelect(seat)}
      title={`${seat.seatId} - ${style.label}`}
      className={`relative h-14 rounded-xl border-2 text-sm font-bold transition flex flex-col items-center justify-center cursor-pointer ${style.card} ${
        selected ? "ring-4 ring-indigo-400" : ""
      } ${mine ? "outline-2 outline-offset-2 outline-indigo-500" : ""}`}
    >
      {seat.seatId}
      <span className="text-[10px] font-medium opacity-80">{style.label}</span>
      {mine && <span className="absolute -top-1.5 -right-1.5 size-3 rounded-full bg-indigo-500" />}
    </button>
  )
}

export default SeatCard
