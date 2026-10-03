const SeatCard = ({seatId, status}) => {
    return (
        <>
            <div className={`"text-xl w-12 h-12 flex justify-center items-center text-white p-2" ${status == "available" ? "bg-green-200" : status == "occupied" ? "bg-yellow-200" : "bg-red-300"}`}>
                {seatId}
            </div>
        </>
    )
}

export default SeatCard