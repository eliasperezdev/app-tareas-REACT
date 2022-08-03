import FormularioProyecto from "../components/FormularioProyecto";

function NuevoProyecto() {
  return (
    <>
      <h1 className='text-4xl font-bold'>Crear proyecto</h1>
      <div className="my-10 flex justify-center">
        <FormularioProyecto/>
      </div>
    </>
  );
}

export default NuevoProyecto;