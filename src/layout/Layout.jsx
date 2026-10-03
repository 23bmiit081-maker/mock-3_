import Header from "./Header"
import Sidebar from "./Sidebar"

const Layout = ({children}) => {
    return (
        <>
            <main className="grid grid-cols-5 border-2 h-screen">
                <aside className=" w-full">
                    <Sidebar />
                </aside>
                <div className="col-span-4">
                    <header className="">
                        <Header />
                    </header>
                    <section>
                        {children}
                    </section>
                </div>
            </main>
        </>
    )
}

export default Layout