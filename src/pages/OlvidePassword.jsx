import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/clienteAxios';
import Alerta from '../components/Alerta';

const OlvidePassword = () => {

    const [email, setEmail] = useState("")
    const [alerta, setAlerta] = useState({})
  
    const handleSubmit = async e => {
      e.preventDefault()
  
      if(email === "" || email.length < 6) {
        setAlerta({
          msg:"El email es obligatorio",
          error: true
        })
        return
      }
  
      try {
        const {data } =await clienteAxios.post(`/usuarios/olvide-password`, {email})
  
        setAlerta({
          msg:data.msg,
          error: false
        })
  
      } catch (error) {
        setAlerta({
          msg:error.response.data.msg,
          error: true
        })
      }
    }
  
    const {msg} = alerta

    
    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Recuperar contraseña</h1>
            <p className="py-6">Recupera El Acceso Y Administra Sus Proyectos</p>
            

            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form
                onSubmit={handleSubmit}
            >
                <div className="card-body">
                {msg && <Alerta alerta={alerta} />}
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="Ingrese su email" 
                        className="input input-bordered" 
                        value={email} 
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                    </div>
                    <div className="form-control mt-6">
                    <input 
                        type={"submit"}
                        value="Recuperar cuenta"
                        className="btn btn-primary"
                    />
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>
    );
}

export default OlvidePassword;