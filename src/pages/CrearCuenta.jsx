
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/clienteAxios';
import Alerta from '../components/Alerta';

const CrearCuenta = () => {

    const [ nombre, setNombre ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ repetirPassword, setrepetirPassword ] = useState("")
    const [ alerta, setAlerta ] = useState({})
  
    const handleSubmit = async e => {
      e.preventDefault()
  
      if([nombre, email, password, repetirPassword].includes('')){
        setAlerta({
          msg: 'Todos los campos son obligatorios',
          error: true
        })
        return
      }
  
      if(password !== repetirPassword) {
        setAlerta({
          msg: 'Los password no coinciden',
          error: true
        })
      }
  
      if(password.length <6) {
        setAlerta({
          msg: 'El password debe contener un minimo de 6 caracteres',
          error: true
        })
      }
  
      setAlerta({})
  
      //Crear el usuario en la API
  
      try {
        const {data} = await clienteAxios.post(`/usuarios`, {nombre,email,password})
  
        setAlerta({
          msg: data.msg,
          error: false
        })
  
        setNombre("")
        setEmail("")
        setPassword("")
        setrepetirPassword("")
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
  
    const {msg} = alerta

    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Registrese</h1>
            <p className="py-6">Registrese y empieza a administrar sus proyectos</p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nombre</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="Ingrese su nombre" 
                        className="input input-bordered" 
                        value={nombre}
                        onChange={(e)=> setNombre(e.target.value)}
                    />
                </div>
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
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Contraseña</span>
                    </label>
                    <input 
                        type="password" 
                        placeholder="Ingrese su contraseña" 
                        className="input input-bordered" 
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Repita su contraseña</span>
                    </label>
                    <input 
                        type="password" 
                        placeholder="Ingrese de nuevo su contraseña" 
                        className="input input-bordered" 
                        value={repetirPassword}
                        onChange={(e)=> setrepetirPassword(e.target.value)}
                    />
                </div>
                <div className="form-control mt-6">
                <button className="btn btn-primary">Registrarse</button>
                </div>
                <Link 
                        className="label"
                        to={"/"}
                    >¿Ya tienes cuenta? Inicia sesión</Link>
            </div>
            </div>
        </div>
    </div>
    );
}

export default CrearCuenta;