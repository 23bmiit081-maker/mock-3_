import { use, useEffect, useState } from "react"
import SeatCard from "./SeatCard"
import axios from "axios"

const SeatLayouts = () => {
    const [seatData, setSeatData] = useState([])
    const [bookingData, setBookingData] = useState([])
    const [totalRows, setTotalRows] = useState([])
    const [numbver] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const [filterName, setfilterName] = useState("all")

    const apicalling = async function () {
        const seats = await axios.get("http://localhost:5000/seats");
        const booking = await axios.get("http://localhost:5000/bookings");
        setSeatData(seats.data)
        setBookingData(booking.data)
        setTotalRows([...new Set(seats.data.map(s => s.row))])
    }
    useEffect(() => {
        apicalling()
    }, [])
    return (
        <>
            <div className="flex gap-5 px-7 mt-10 my-4">
                {
                    ["all", "available", "occupied", "reserved"].map((d, i) => (
                        <div className={`px-3 py-2 rounded-sm  text-black  ${d == filterName ? "bg-blue-700 text-white" : "bg-white"}`} key={i} onClick={() => setfilterName(d)}>{d}</div>
                    ))
                }
            </div>

            <table className="border">
                <thead>
                    <tr>
                        {
                            numbver.map((n, i) => (
                                <th key={i}>{n}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody className="border">
                    {
                        totalRows.map((r, i) => (
                            <tr key={i} className="flex items-center gap-2 m-6">
                                <td>{r}</td>
                                <td className="flex items-center gap-5">
                                    {
                                        seatData.filter(d => d.row == r).map(a => (

                                            filterName == "all" ? <SeatCard key={a.id} seatId={a.seatId} status={a.status} /> : a.status == filterName ? <SeatCard key={a.id} seatId={a.seatId} status={a.status} /> : ""

                                        ))
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default SeatLayouts