import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import FormularioColaborador from "../components/FormularioColaborador";
import useProyectos from "../hooks/useProyectos";


function NuevoColaborador() {
    const { obtenerProyecto, proyecto,alerta, cargando, colaborador, agregarColaborador} = useProyectos()
    const params = useParams()

    useEffect(()=> {
        obtenerProyecto(params.id)
    }, [])

    console.log(colaborador);

    if(!proyecto?._id) return <Alerta alerta={alerta} />

  return (
      <>
        <h1 className="text-4xl font-black">Añadir colaborador/a al proyecto: {proyecto.nombre}</h1>
        <div className="mt-10 flex justify-center">
            <FormularioColaborador/>
        </div>

        {cargando? <p className="text-center">Cargando...</p> : colaborador?._id && (
            <div className="flex justify-center mt-10">
                <div className="bg-gray-400 py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
                    <h2 className="text-center mb-10 text-2xl font-bold text-gray-700">Resultado</h2>
                    <div className="flex justify-between items-center text-gray-700 font-bold">
                        <p>{colaborador.nombre}</p>
                        <button
                        type="button"
                            className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                            onClick={()=> agregarColaborador({
                                email: colaborador.email
                            })}
                        >
                            Agregar al proyecto
                        </button>
                    </div>
                </div>

            </div>
        )}
      </>
  );
}

export default NuevoColaborador;