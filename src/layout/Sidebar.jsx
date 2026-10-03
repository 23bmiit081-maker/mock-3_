import { SquareMenu } from "lucide-react"
import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <>
        <aside className="border-2 w-full h-full">
            <span >
                <SquareMenu className="hidden" />
            </span>
            {/* <div className="flex flex-col gap-10">
                <h3 className="text-xl font-semibold">Campus seat finder</h3>
                <ol>
                    <li>
                        <Link to={"/"}>Dashboard</Link>
                    </li>
                </ol>
            </div> */}
        </aside>
    </>
  )
}

export default Sidebar