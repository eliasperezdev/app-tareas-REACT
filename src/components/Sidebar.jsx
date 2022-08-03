import { Link } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';

const Sidebar = () => {

    const {proyectos} = useProyectos()

    return (
        <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10 ">
            <Link
                to={"crear-proyecto"}
                className="btn btn-primary"
            >Nuevo Proyecto</Link>

            <div className=" mt-4">
                    <h2 className="card-title font-bold mx-auto">Proyectos</h2>

                    <ul className="mt-4">
                        {proyectos.map(proyecto => (
                            <li key={proyecto._id} className="mt-2 border-b py-2 border-white">
                                <Link to={`${proyecto._id}`} className="text-xl">{proyecto.nombre}</Link>
                            </li>
                        ))}
                    </ul>
                    
            </div>
        </aside>
    );
}

export default Sidebar;