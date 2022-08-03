import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom'
import clienteAxios from '../../config/clienteAxios';
import Alerta from '../components/Alerta';


function NuevoPassword() {

  const [password, setPassword] = useState("")
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()

  const {token} = params

  useEffect( () => {
    const comprobarToken = async () => {
      try {
        const {data} =await axios.get(`${import.meta.env.VITE_BACKEND}/api/usuarios/olvide-password/${token}`)
        setTokenValido(true)

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
        error: true
        })
      }
    }
    comprobarToken()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
  
    if(password.length <6) {
      setAlerta({
        msg: 'El password debe contener un minimo de 6 caracteres',
        error: true
      })
    }

    try {
      const url = `/usuarios/olvide-password/${token}`

      const {data } = await clienteAxios.post(url, {password})

      setPasswordModificado(true)
      setAlerta({
        msg: data.msg,
        error: false
      })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">Reestablece el password y administra sus <span className="text-slate-700">proyectos</span></h1>

    {alerta && (
      <Alerta alerta={alerta}/>
    )}
   {tokenValido && passwordModificado === false && (
      <form 
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >

      <div className="my-5">
        <label
          className="uppercase text-gray-600 block text-xl font-bold"
          htmlFor="password"
        >Nuevo Password</label>
        <input
          type={"password"}
          id="password"
          value={password}
          onChange={e=> setPassword(e.target.value)}
          placeholder="Escribe el nuevo password"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
        />
      </div>

      <input 
        type={"submit"}
        value="Guardar el nuevo password"
        className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
      />
    </form>

   )}

    {passwordModificado && (
      <Link 
      className="block text-center my-5 text-slate-500 uppercase text-sm"
      to={"/"}
    >Inicia sesión</Link>
    )}
    </>
  );
}

export default NuevoPassword;