import { formatearFecha } from "../helpers/FormatearFecha";
import useAdmin from "../hooks/useAdmin";
import useProyectos from "../hooks/useProyectos";

const Tarea = ( {tarea} ) => {

    const admin = useAdmin()
    const {descripcion, completado, prioridad, fechaEntrega, nombre,estado,  _id} = tarea
    const {handleModalEditarTarea, handleModalEliminarTarea,completarTarea} = useProyectos()

return (
    <section>
        <section className="text-gray-600 body-font">
            <div className="container py-2">
                <div className={ `bg-gray-100 p-2 flex items-center mx-auto border-b  border-gray-200 rounded-lg sm:flex-row flex-col`}>
    
                <div className="flex-grow sm:text-left text-center mt-1 sm:mt-0">
                    <h1 className="text-black text-2xl title-font font-bold mb-2">{nombre} - {formatearFecha(fechaEntrega)}</h1>
                    <p className="leading-relaxed text-base">{descripcion}</p>
                    <div className="py-4">
                        {completado? 
                         <div className=" inline-block mr-2" >
                            <div className="flex  h-full items-center">
                                <svg className="text-green-800 w-10 h-10 mr-1"  width="24" height="24" viewBox="0 0 24 24"  stroke="currentColor" fill="none">  
                                    <path stroke="none" d="M0 0h24v24H0z"/>  
                                    <circle cx="12" cy="12" r="9" />  
                                    <path d="M9 12l2 2l4 -4" />
                                </svg>
                                <p className="title-font font-medium">Completado por {tarea.completado.nombre}</p>
                            </div>
                        </div>
                        :
                        <div className=" inline-block mr-2" >
                            <div className="flex  h-full items-center">
                                <svg className="text-gray-500 w-6 h-6 mr-1"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"    >  
                                    <circle cx="12" cy="12" r="10" />  
                                    <line x1="15" y1="9" x2="9" y2="15" /> 
                                    <line x1="9" y1="9" x2="15" y2="15" />
                                </svg>
                                <p className="title-font font-medium">Incompleto</p>
                            </div>
                        </div>}
                       
                        
                    </div>
                    <div className="flex justify-between md:justify-center font-bold text-gray-800">
                        {admin && (
                        <button
                            className="btn"
                            onClick={() => handleModalEditarTarea(tarea)}
                        >
                            Editar
                        </button>
                    )}
                    <button
                            className={`${estado? "bg-sky-600 " : "bg-gray-600 "} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                            onClick={()=> completarTarea(_id)}
                        >
                            {estado? "Completa" : "Incompleta"}
                        </button>
                        {admin && (
                            <button
                                className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                                onClick={() => handleModalEliminarTarea(tarea)}
                            >
                                Eliminar
                            </button>
                        )}
                    </div>
                </div>
                </div>
            </div>
        </section>
    </section>
    );
}

export default Tarea