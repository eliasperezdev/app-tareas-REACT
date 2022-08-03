import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
import Alerta from "../components/Alerta";

function Confirmar() {

    const [alerta, setAlerta] = useState({})
    const [cuentaConfirmada, setcuentaConfirmada] = useState(false)

    const params = useParams()
    const { token } = params

    useEffect(() => {
        console.log("ejecutando");
        const confirmarCuenta = async () => {
            try {
                const url = `/usuarios/confirmar/${token}`
                const { data } = await clienteAxios.get(url)
                
                setAlerta({
                    msg: data.msg,
                    error: false
                })
                setcuentaConfirmada(trues)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error:true
                })
            }
        }
        confirmarCuenta()
    }, [])

        const {msg} = alerta

    return (
        <>
                <h1 className="text-sky-600 font-black text-6xl capitalize">Confirma los cambios y administra sus <span className="text-slate-700">proyectos</span></h1>
                <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alerta alerta={alerta} />}

                {cuentaConfirmada && (
                          <Link 
                          className="block text-center my-5 text-slate-500 uppercase text-sm"
                          to={"/"}
                        >Inicia sesión</Link>
                  
                )}
                </div>
        </>
    );
  }
  
  export default Confirmar;