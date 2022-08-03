const Alerta = ( {alerta} ) => {
    return (
        <div className={`${alerta.error? 'alert alert-error shadow-lg my-4' : 'badge badge-success gap-2'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10`}>
                <svg className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{alerta.msg}</span>
        </div>
    );
}

export default Alerta;