import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import useAuth from '../hooks/useAuth';


function RutaProtegida() {

    const {auth, cargando} = useAuth()

    if(cargando) return "Cargando"
  return (
      <>
        {auth._id? (
            <div className='bg-gray-700'>
                <Header/>
                <div className='md:flex md:min-h-screen'>
                    <Sidebar/>

                    <main className='p-10 flex-1 '>
                         <Outlet />
                    </main>
                </div>
            </div>
        ) : <Navigate to="/"/>}
      </>
  );
}

export default RutaProtegida;