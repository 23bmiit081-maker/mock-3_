import { useState } from "react"

const BookingForm = ({ profile, busy, onSubmit }) => {
  const [studentName, setStudentName] = useState(profile.studentName)
  const [rollNo, setRollNo] = useState(profile.rollNo)
  const [time, setTime] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!studentName.trim() || !rollNo.trim()) {
      setError("Student name and roll number are required.")
      return
    }
    setError("")
    onSubmit({ studentName: studentName.trim(), rollNo: rollNo.trim().toUpperCase(), time })
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"

  return (
    <div className="space-y-3">
      <h4 className="font-semibold">Book this seat</h4>
      <div>
        <label className="block text-sm text-slate-600 mb-1">Student name</label>
        <input value={studentName} onChange={(e) => setStudentName(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label className="block text-sm text-slate-600 mb-1">Roll number</label>
        <input value={rollNo} onChange={(e) => setRollNo(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label className="block text-sm text-slate-600 mb-1">
          Booking time <span className="text-slate-400">(optional)</span>
        </label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputClass} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={busy}
        className="w-full rounded-lg bg-indigo-600 py-2.5 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60 cursor-pointer"
      >
        {busy ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  )
}

export default BookingForm
