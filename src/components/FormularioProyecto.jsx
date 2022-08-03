import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";



function FormularioProyecto() {
  const params = useParams()

    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos()

    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    
    useEffect(() => {
      //Si se rellena nombre significa q ya se obtuvo lo necesario
      if(params.id && proyecto.nombre){
        setId(proyecto._id)
        setNombre(proyecto.nombre)
        setDescripcion(proyecto.descripcion)
        setFechaEntrega(proyecto.fechaEntrega.split("T")[0])
        setCliente(proyecto.cliente)
      } 
    }, [])

    const handleSubmit = async e => {

        e.preventDefault()


        if([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })

            return
        }

        //Pasar los datos al provider
        await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente})

        setId(null)
        setCliente('')
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        
    }
    const {msg} = alerta 

  return (
      <form 
        className='bg-gray-400 py-10 px-5 md: w-1/2 rounded-lg shadow'
        onSubmit={handleSubmit}
        >

            {msg && <Alerta alerta={alerta}/>}
          <div className="mb-5">
              <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='nombre'>
                Nombre proyecto
              </label>
              <input
                id="nombre"
                type={"text"}
                value={nombre}
                onChange={e=> setNombre(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder='Nombre del proyecto'
              />
          </div>
          <div className="mb-5">
              <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='descripcion'>
                Descripción
              </label>
              <textarea
                id="descripcion"
                value={descripcion}
                onChange={e=> setDescripcion(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder='Descripción del proyecto'
              />
          </div>         
           <div>
              <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='fecha-entrega'>
                Fecha de entrega
              </label>
              <input
                id="fecha-entrega"
                type={"date"}
                value={fechaEntrega}
                onChange={e=> setFechaEntrega(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
          </div>
          <div className="mb-5">
              <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='cliente'>
                Nombre del cliente
              </label>
              <input
                id="cliente"
                type={"text"}
                value={cliente}
                onChange={e=> setCliente(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder='Nombre del cliente'
              />
          </div>

          <input 
            type={"submit"}
            value={id ? "Actualizar proyecto " : "Crear proyecto"}  
            className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
          />
      </form>
  );
}

export default FormularioProyecto;