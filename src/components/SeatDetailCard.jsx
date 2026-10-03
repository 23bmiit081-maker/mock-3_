import { X } from "lucide-react"

const SeatDetailCard = () => {
  return (
    <>
        <div className="flex flex-col w-25 h-auto">
            <div className="flex justify-between items-center">
                <h3>See DeDetails</h3>
                <X />
            </div>
            <div>
                <div className="size-10 bg-gray-300 font-semibold">
                    A4
                </div>
                <div className="bg-yellow-100 text-red-400">
                    Tag Banner
                </div>
            </div>
            <div>
                {
                    <ol>
                        <li>
                            <div>
                                
                            </div>
                        </li>
                    </ol>
                }
            </div>
        </div>
    </>
  )
}

export default SeatDetailCard