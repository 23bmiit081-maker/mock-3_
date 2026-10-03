import { NavLink } from "react-router-dom"
import { Armchair, BookmarkCheck, LayoutDashboard } from "lucide-react"

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/seats", label: "Seat Layout", icon: Armchair },
  { to: "/bookings", label: "My Bookings", icon: BookmarkCheck },
]

const Sidebar = ({ bookingCount }) => {
  return (
    <aside className="bg-slate-900 text-slate-200 md:min-h-screen md:w-64 md:shrink-0">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800">
        <span className="size-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white">
          <Armchair size={22} />
        </span>
        <div className="leading-tight">
          <h1 className="font-bold text-white">Campus</h1>
          <p className="text-sm text-slate-400">Seat Finder</p>
        </div>
      </div>
      <nav className="flex md:flex-col gap-1 p-3 overflow-x-auto">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap transition ${
                isActive ? "bg-indigo-500 text-white shadow" : "hover:bg-slate-800"
              }`
            }
          >
            <Icon size={18} />
            <span className="flex-1">{label}</span>
            {to === "/bookings" && bookingCount > 0 && (
              <span className="rounded-full bg-white/20 px-2 text-xs">{bookingCount}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
