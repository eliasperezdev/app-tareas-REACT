import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Proyecto from "../pages/Proyecto";
import Proyectos from "../pages/Proyectos";

const LayoutProtegido = () => {
    return (
        <div>
            <Header/>
            <div className="md:flex md:min-h-screen">
                <Sidebar/>
                <main className="p-10 flex-1 bg-gray-100">
                    <Proyecto/>
                </main>
            </div>
        </div>
    );
}

export default LayoutProtegido;