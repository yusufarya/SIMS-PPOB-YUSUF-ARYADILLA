import { NavLink, useLocation } from "react-router-dom"
import logo from "../assets/img/Logo.png"

const Topbar = () => {
    const location = useLocation();
    return (
        <div className="shadow-sm h-12 flex justify-center">
            <div className="grid grid-cols-3 gap-4 w-full lg:w-10/12 md:w-10/12 sm:w-10/12 mt-2">
                <div className="col-span-2">
                    <NavLink to="/" className="inline">
                        <div className="flex justify-start">
                            <img src={logo} className="h-7 pe-2 pt-1"/>
                            <h2 className="text-xl font-bold font-sans text-gray-900">SIMS PPOB</h2>
                        </div>
                    </NavLink>
                </div>
                <div className="flex justify-end gap-11">
                    <NavLink to="/tupup" className={`text-gray-900 font-sans font-semibold active:text-red-600 ${location.pathname == '/tupup' ? 'text-red-500' : ''}`}>
                        Top Up 
                    </NavLink>
                    <NavLink to="/transaction" className={`text-gray-900 font-sans font-semibold active:text-red-600 ${location.pathname == '/transaction' ? 'text-red-500' : ''}`}>
                        Transaction
                    </NavLink>
                    <NavLink to="/akun" className={`text-gray-900 font-sans font-semibold active:text-red-600 ${location.pathname == '/akun' ? 'text-red-500' : ''}`}>
                        Akun
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Topbar