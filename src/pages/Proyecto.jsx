import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Alerta from "../components/Alerta";
import Colaborador from "../components/Colaborador";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import Tarea from "../components/Tarea";
import useAdmin from "../hooks/useAdmin";
import useProyectos from "../hooks/useProyectos";

let socket 


const Proyecto = () => {

    const params = useParams()

    const {completarTareaProyecto, editarTareaProyecto,eliminarTareaProyecto,submitTareasProyecto,obtenerProyecto, proyecto, cargando, handleModalTarea} = useProyectos()
  
    const {nombre} = proyecto
  
    const admin = useAdmin()
    
    useEffect(() => {
      obtenerProyecto(params.id)
    }, [params.id])

    useEffect(() => {
        obtenerProyecto(params.id)
      }, [])
    
      useEffect(()=> {
        socket= io(import.meta.env.VITE_BACKEND)
        socket.emit("Abrir proyecto", params.id)
      }, [])
    
      useEffect(()=> {
        socket.on("tarea agregada", (tareaNueva)=> {
            if(tareaNueva.proyecto===proyecto._id){
                submitTareasProyecto(tareaNueva)
            }
        })
        socket.on('tarea eliminada', tareaEliminada => {
          if(tareaEliminada.proyecto===proyecto._id){
            eliminarTareaProyecto(tareaEliminada)
        }
        })
    
        socket.on('tarea editada', tareaEditada => {
          if(tareaEditada.proyecto._id===proyecto._id){
            editarTareaProyecto(tareaEditada)
        }
        })
    
        socket.on('tarea completada', tareaCompletada => {
          if(tareaCompletada.proyecto._id===proyecto._id){
            completarTareaProyecto(tareaCompletada)
        }
        })
    })

    if(cargando) return "Cargando"

    return (
    <>
        <div className="flex justify-between">
            <h1 className='text-4xl font-bold'>{nombre}</h1>
            {/*Si es admin */}

            {admin && (
            <>
                <div className="btn btn-outline btn-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <Link
                    to={`/proyectos/editar/${params.id}`}
                    className="uppercase font-bold"
                    >Editar</Link>
                    
                </div>
    
                <button
                onClick={handleModalTarea}
                    type="button"
                    className="btn btn-active btn-primary"
                > 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Nueva tarea
                </button>
            </>
           )}
        </div>
        <div>
            <h1 className="font-bold text-xl mt-10"> Tareas del proyecto</h1>
            {proyecto.tareas?.length ?
            proyecto.tareas?.map(tarea => (
                <Tarea
                key={tarea._id}
                tarea={tarea}
                />
            ))
            : <p className="text-center my-5 p-10">No hay tareas en este proyecto</p>}
        {admin && (
          <>
        <div className="flex items-center justify-between mt-10 ">
          <p className="font-bold text-xl"> Colaboradores</p> 
          <Link
            to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
            className="text-gray-400 hover:text-black uppercase font-bold"
          >Añadir</Link>
        </div>
        
        <div className=" shadow mt-10 rounded-lg">
          {proyecto.colobadores?.length ? 
            proyecto.colobadores?.map( colaborador => (
              <Colaborador key={colaborador._id} colaborador={colaborador} />
            ))
          : <p className="text-center my-5 p-10">No hay colaboradores en este proyecto</p>}
        </div></>)}
        </div>
        <ModalFormularioTarea />
        <ModalEliminarTarea />
        <ModalEliminarColaborador/>
    </>
    );
}

export default Proyecto;