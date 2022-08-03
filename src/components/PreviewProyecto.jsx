import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreviewProyecto = ({proyecto}) => {

    const {auth} = useAuth()
    const {_id,nombre, creador, cliente} = proyecto

    return (
        <>
             <tr>
                <td>{nombre} - <span className="text-sm text-gray-500 uppercase ">
                    {""}{cliente}
                    </span>
                </td>
                <td>
                {auth._id !== creador && (<div className="badge badge-accent">Colaborador</div>)}
                    
                </td>
                <td>
                <Link
                    to={`${_id}`}
                    className="btn btn-active btn-secondary"
                >
                    Ver proyecto
                </Link>
                </td>
            </tr>
        </>
    );
}

export default PreviewProyecto;