import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProyectos from "../hooks/useProyectos";
import Busqueda from "./Busqueda";

const Header = () => {

    const {cerrarSesionAuth} = useAuth()
    const {cerrarSesionProyectos, handleBuscador} =  useProyectos()
  
  
    const handleCerrarSesion = () => {
      cerrarSesionAuth()
      cerrarSesionProyectos()
      localStorage.removeItem('token')
    }

    return (
    <div className="navbar bg-base-300 ">
        <div className="flex-1">
            <Link to={`/`} className="btn btn-ghost normal-case text-xl">To-Do</Link>
        </div>
        <div className="flex-none gap-2">
            <div className="form-control">
            <input type="text" placeholder="Buscar proyecto..."  onClick={handleBuscador} className="input input-bordered" />
            </div>
            <div className="dropdown dropdown-end">
            <label className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <img src="https://api.lorem.space/image/face?hash=33791" />
                </div>
            </label>
            <ul className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li><a>Perfil</a></li>
                <li>
                    <button
                    type="button"
                    onClick={handleCerrarSesion}
                  >
                      Cerrar sesión
                  </button>
                </li>
            </ul>
            </div>
        </div>
        <Busqueda/>
    </div>
    );
}

export default Header;