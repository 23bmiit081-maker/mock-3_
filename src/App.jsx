import "./App.css"
import { useCallback, useEffect, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Dashboard from "./components/Dashboard"
import SeatGrid from "./components/SeatGrid"
import SeatDetails from "./components/SeatDetails"
import MyBookings from "./components/MyBookings"
import { createBooking, deleteBooking, getBookings, getSeats, updateSeat } from "./api"
import { todayString } from "./utils"

const DEFAULT_PROFILE = { studentName: "Rahul Shah", rollNo: "RW001" }

const PAGES = {
  "/": { title: "Dashboard", subtitle: "Overview of seat availability on campus" },
  "/seats": { title: "Seat Layout", subtitle: "Select a seat to view details or book it" },
  "/bookings": { title: "My Bookings", subtitle: "Manage your active seat reservations" },
}

const loadProfile = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("campus-profile"))
    return saved && saved.studentName && saved.rollNo ? saved : DEFAULT_PROFILE
  } catch {
    return DEFAULT_PROFILE
  }
}

const App = () => {
  const { pathname } = useLocation()
  const [seats, setSeats] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [area, setArea] = useState("all")
  const [profile, setProfile] = useState(loadProfile)
  const [selectedId, setSelectedId] = useState(null)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const [seatList, bookingList] = await Promise.all([getSeats(), getBookings()])
      setSeats(seatList)
      setBookings(bookingList)
    } catch {
      setError("Could not load data. Make sure JSON Server is running on port 5000.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(null), 3500)
    return () => clearTimeout(timer)
  }, [notice])

  const areas = [...new Set(seats.map((s) => s.location))]
  const areaSeats = area === "all" ? seats : seats.filter((s) => s.location === area)
  const areaSeatIds = areaSeats.map((s) => s.seatId)
  const areaBookings = bookings.filter((b) => areaSeatIds.includes(b.seatId))

  const myBookings = bookings.filter(
    (b) => b.status === "active" && b.rollNo.toLowerCase() === profile.rollNo.toLowerCase()
  )
  const mySeatIds = myBookings.map((b) => b.seatId)

  const selectedSeat = seats.find((s) => s.id === selectedId) ?? null
  const selectedBooking = selectedSeat
    ? bookings.find((b) => b.seatId === selectedSeat.seatId && b.status === "active")
    : null
  const selectedIsMine = selectedBooking
    ? selectedBooking.rollNo.toLowerCase() === profile.rollNo.toLowerCase()
    : false

  const handleBook = async ({ studentName, rollNo, time }) => {
    if (!selectedSeat || selectedSeat.status !== "available") return
    setBusy(true)
    let created = null
    try {
      created = await createBooking({
        seatId: selectedSeat.seatId,
        studentName,
        rollNo,
        date: todayString(),
        time,
        status: "active",
      })
      const updated = await updateSeat(selectedSeat.id, { status: "reserved" })
      setBookings((prev) => [...prev, created])
      setSeats((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
      const nextProfile = { studentName, rollNo }
      setProfile(nextProfile)
      localStorage.setItem("campus-profile", JSON.stringify(nextProfile))
      setNotice({ type: "success", text: `Seat ${selectedSeat.seatId} booked successfully.` })
      setSelectedId(null)
    } catch {
      if (created) {
        try {
          await deleteBooking(created.id)
        } catch {
          setNotice({ type: "error", text: "Booking partly failed. Please refresh the page." })
        }
      }
      setNotice({ type: "error", text: "Booking failed. Please try again." })
    } finally {
      setBusy(false)
    }
  }

  const handleCancel = async (booking) => {
    const seat = seats.find((s) => s.seatId === booking.seatId)
    setBusy(true)
    try {
      await deleteBooking(booking.id)
      setBookings((prev) => prev.filter((b) => b.id !== booking.id))
      if (seat) {
        const updated = await updateSeat(seat.id, { status: "available" })
        setSeats((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
      }
      setNotice({ type: "success", text: `Booking for seat ${booking.seatId} cancelled.` })
      setSelectedId(null)
    } catch {
      setNotice({ type: "error", text: "Could not cancel the booking. Please try again." })
      loadData()
    } finally {
      setBusy(false)
    }
  }

  const page = PAGES[pathname] ?? PAGES["/"]

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-32 text-slate-500">
          <Loader2 className="animate-spin mb-3" size={36} />
          Loading seats...
        </div>
      )
    }

    if (error) {
      return (
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-sm border border-red-100">
          <TriangleAlert className="mx-auto mb-3 text-red-500" size={36} />
          <p className="mb-4 text-slate-700">{error}</p>
          <button
            type="button"
            onClick={loadData}
            className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700 cursor-pointer"
          >
            Retry
          </button>
        </div>
      )
    }

    if (seats.length === 0) {
      return (
        <div className="rounded-2xl bg-white p-12 text-center text-slate-500 shadow-sm border border-slate-100">
          No seats are available in the system yet.
        </div>
      )
    }

    return (
      <Routes>
        <Route path="/" element={<Dashboard seats={areaSeats} bookings={areaBookings} areas={areas} />} />
        <Route
          path="/seats"
          element={
            <SeatGrid
              seats={areaSeats}
              mySeatIds={mySeatIds}
              selectedId={selectedId}
              onSelect={(seat) => setSelectedId(seat.id)}
            />
          }
        />
        <Route
          path="/bookings"
          element={<MyBookings bookings={myBookings} seats={seats} busy={busy} onCancel={handleCancel} />}
        />
        <Route path="*" element={<Dashboard seats={areaSeats} bookings={areaBookings} areas={areas} />} />
      </Routes>
    )
  }

  return (
    <div className="min-h-screen md:flex">
      <Sidebar bookingCount={myBookings.length} />
      <div className="flex-1 min-w-0">
        <Header
          title={page.title}
          subtitle={page.subtitle}
          areas={areas}
          area={area}
          onAreaChange={setArea}
          profile={profile}
        />
        <main className="p-4 sm:p-8">{renderContent()}</main>
      </div>

      {selectedSeat && (
        <SeatDetails
          seat={selectedSeat}
          booking={selectedBooking}
          isMine={selectedIsMine}
          profile={profile}
          busy={busy}
          onClose={() => setSelectedId(null)}
          onBook={handleBook}
          onCancel={handleCancel}
        />
      )}

      {notice && (
        <div
          className={`fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white shadow-lg ${
            notice.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {notice.type === "success" ? <CheckCircle2 size={18} /> : <TriangleAlert size={18} />}
          {notice.text}
        </div>
      )}
    </div>
  )
}

export default App
