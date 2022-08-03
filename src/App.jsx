import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthContext, { AuthProvider } from "./context/AuthProvider"
import { ProyectosProvider } from "./context/ProyectosProvider"
import AuthLayout from "./layout/AuthLayout"
import RutaProtegida from "./layout/RutaProtegida"
import Confirmar from "./pages/Confirmar"
import EditarProyecto from "./pages/EditarProyecto"
import Login from "./pages/Login"
import NuevoColaborador from "./pages/NuevoColaborador"
import NuevoPassword from "./pages/NuevoPassword"
import NuevoProyecto from "./pages/nuevoProyecto"
import OlvidePassword from "./pages/OlvidePassword"
import Proyecto from "./pages/Proyecto"
import Proyectos from "./pages/Proyectos"
import Crearcuenta from "./pages/CrearCuenta"


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          <Routes>
            <Route path="/" element={<AuthLayout/>}> 
              <Route index element={<Login/>}/>

              <Route path="crear-cuenta" element={<Crearcuenta/>}/>
              <Route path="olvide-password" element={<OlvidePassword/>}/>
              <Route path="olvide-password/:token" element={<NuevoPassword/>}/>

              <Route path="confirmar/:token" element={<Confirmar/>}/>
            </Route>
            <Route path="/proyectos" element={<RutaProtegida />}>
              <Route index element={<Proyectos/>} />
              <Route path="crear-proyecto" element={<NuevoProyecto/>} />
              <Route path="nuevo-colaborador/:id" element={<NuevoColaborador/>} />
              <Route path=":id" element={<Proyecto/>} />
              <Route path="editar/:id" element={<EditarProyecto/>} />
            </Route>
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

