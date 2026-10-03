export const todayString = () => {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${now.getFullYear()}-${month}-${day}`
}

export const formatDate = (value) => {
  const date = value ? new Date(`${value}T00:00:00`) : new Date()
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export const STATUS_STYLES = {
  available: {
    label: "Available",
    card: "bg-green-100 text-green-800 border-green-300 hover:bg-green-200",
    badge: "bg-green-100 text-green-700",
    dot: "bg-green-500",
  },
  occupied: {
    label: "Occupied",
    card: "bg-red-100 text-red-800 border-red-300 hover:bg-red-200",
    badge: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
  reserved: {
    label: "Reserved",
    card: "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200",
    badge: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },
}

export const STATUSES = ["available", "occupied", "reserved"]
