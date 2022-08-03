import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')
    const [alerta, setAlerta ] = useState({})
  
    const {setAuth, auth, cargando} = useAuth()
  
    console.log(auth, cargando);
  
    const handleSubmit = async e => {
      e.preventDefault()
  
      if([email, password].includes('')){
        setAlerta({
          msg:"Todos los campos son obligatorios",
          error: true
        })
        return
      }
  
      try {
        const {data} = await clienteAxios.post('/usuarios/login', {email, password})
        setAlerta({})
        localStorage.setItem('token', data.token)
        setAuth(data)
        navigate("/proyectos")
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
            <h1 className="text-5xl font-bold">Inicia sesión</h1>
            <p className="py-6">Inicia Sesión y administras sus proyectos</p>
            

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
                    <Link 
                        className="label"
                        to={"/olvide-password"}
                    >OLVIDE PASSWORD</Link>
                    </div>
                    <div className="form-control mt-6">
                    <input 
                        type={"submit"}
                        value="Iniciar sesión"
                        className="btn btn-primary"
                    />
                    </div>
                    <Link 
                        className="label"
                        to={"/crear-cuenta"}
                    >¿NO TIENES UNA CUENTA? REGÍSTRATE</Link>
                </div>
            </form>
            </div>
        </div>
    </div>
    );
}

export default Login;