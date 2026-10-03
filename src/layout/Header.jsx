import axios from "axios";
import { Accessibility, Calendar, CalendarDays, Check, ChevronDown, Clock5, Landmark, UserGroup } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
    const data = new Date;
    const [seatData, setSeatData] = useState([])
    const [bookingData, setBookingData] = useState([])
    const [totalRows, setTotalRows] = useState(0)

    const apicalling = async function () {
        const seats = await axios.get("http://localhost:5000/seats");
        const booking = await axios.get("http://localhost:5000/bookings");
        setSeatData(seats.data)
        setBookingData(booking.data)
        setTotalRows([...new Set(seats.data.map(s => s.row))].length)
    }
    useEffect(() => {
        apicalling()
    }, [])
    return (
        <>
            <div className=" bg-blue-200/50 p-1">
                <div className="flex items-center justify-between">
                    <h1 className="flex flex-col gap-1 p-2 px-5">
                        <span className="text-xl font-semibold">
                            Hello Stundent!
                        </span>
                        <span>
                            find and book available seats in your campus or lab
                        </span>
                    </h1>
                    <nav className="flex gap-5">
                        <div className="bg-white flex items-center">
                            <Landmark className="p-1" />
                            <select>
                                <option>main Library</option>
                                <option>second Library</option>
                                <option>third Library</option>
                            </select>
                        </div>
                        <div className="bg-white px-2 flex items-center">
                            <CalendarDays  className="pr-2"/>
                            <span>{data.getDay()}/</span>
                            <span>{data.getDate()}/</span>
                            <span>{data.getFullYear()}</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                            <span className="rounded-3xl bg-blue-500 size-7 flex justify-center items-center text-white">
                                S
                            </span>
                            <h4 className="flex items-center">Student
                                <ChevronDown />
                            </h4>
                        </div>
                    </nav>
                </div>
                <div className="flex justify-between px-2 py-7 shrink-0 flex-wrap gap-3">
                    <div className="flex rounded-xl bg-white">
                        <div className="px-3 flex justify-center items-center">
                            <Accessibility size={40} className="bg-blue-200/50 px-1" />
                        </div>
                        <div>
                            <h3>Total Seat</h3>
                            <h2>{seatData.length}</h2>
                            <p>across {totalRows} rows</p>
                        </div>
                    </div>
                    <div className="flex rounded-xl bg-white">
                        <div className="px-3 flex justify-center items-center">
                            <Check size={40} className="bg-blue-200/50 px-1" />
                        </div>
                        <div>
                            <h3>Available</h3>
                            <h2>{seatData.filter(d => d.status == "available").length}</h2>
                            <p>across {totalRows} rows</p>
                        </div>
                    </div>
                    <div className="flex rounded-xl bg-white">
                        <div className="px-3 flex justify-center items-center">
                            <UserGroup size={40} className="bg-blue-200/50 px-1" />
                        </div>
                        <div>
                            <h3>occupied</h3>
                            <h2>{seatData.filter(d => d.status == "occupied").length}</h2>
                            <p>across {totalRows} rows</p>
                        </div>
                    </div>
                    <div className="flex rounded-xl bg-white">
                        <div className="px-3 flex justify-center items-center">
                            <Clock5 size={40} className="bg-blue-200/50 px-1" />
                        </div>
                        <div>
                            <h3>reserved</h3>
                            <h2>{seatData.filter(d => d.status == "reserved").length}</h2>
                            <p>across {totalRows} rows</p>
                        </div>
                    </div>
                    <div className="flex rounded-xl bg-white">
                        <div className="px-3 flex justify-center items-center">
                            <Calendar size={40} className="bg-blue-200/50 px-1" />
                        </div>
                        <div>
                            <h3>Total's booking</h3>
                            <h2>{bookingData.filter(d => d.status == "reserved").length}</h2>
                            <p>total booking</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Header