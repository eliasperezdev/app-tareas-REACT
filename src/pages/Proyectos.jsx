import Alerta from '../components/Alerta';
import PreviewProyecto from '../components/PreviewProyecto';
import useProyectos from '../hooks/useProyectos';

const Proyectos = () => {

    const {proyectos, alerta} = useProyectos()

    return (
        <>
            <h1 className='text-4xl font-bold'>Proyectos</h1>
            {alerta.msg && <Alerta alerta={alerta}/>}
            <div className="mt-10">
            <div className="overflow-x-auto">
                <table className="table-normal bg-base-500 rounded-xl w-full">
                    <thead>
                    <tr>
                        <th>Nombre del proyecto</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {proyectos.map(element => (
                            <PreviewProyecto key={element._id} proyecto={element}/>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </>
    );
}

export default Proyectos;