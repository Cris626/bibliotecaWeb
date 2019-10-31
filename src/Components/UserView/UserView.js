import React, { useEffect , useState }  from 'react';
import { Link } from "react-router-dom";
import { myFirestore } from '../Configure/firebase';
import './userView.css'
//import { Link } from "react-router-dom";

export function useView() {
    //const [usuario, setUsuario] = useState(localStorage.getItem("editUser"));//
    const [direccion, setDireccion] = useState();
    const [ci, setCi] = useState();
    const [ciudad, setCiudad] = useState();
    const [nacimiento, setNacimiento] = useState();
    const [nombre, setNombre] = useState();
    const [celular, setCelular] = useState();

    useEffect(()=>{
        myFirestore.collection('users').doc(`${localStorage.getItem("editUser")}`)//.get()
        .onSnapshot(snap=>{
            setDireccion(snap.data().address)
            setCi(snap.data().ci)
            setCiudad(snap.data().city)
            setNacimiento(snap.data().dateNac)
            setNombre(snap.data().nameComplet)
            setCelular(snap.data().phone)
        })
    }, [])//Array para que solo se active una sola vez

    function editUser(id) {
        console.log("HOLA")
        localStorage.setItem("editUser", id);
        localStorage.setItem("Numero", "2")
        console.log(localStorage.getItem("Numero"))
        console.log(localStorage.getItem("editUser"))
    }

    return(
        <div className="row">
                <div className="col-lg-2"></div>
                <div className="col-lg-8">
                    <form action="/biblioteca/Main/list-Users">
                        <h1 style={{textAlign: "center"}}>Datos del lector</h1>
                        <label className="labelView">Nombre: </label>
                        <label className="atributo">{nombre}</label><br/>
                        <label className="labelView">Ci: </label>
                        <label className="atributo">{ci}</label><br/>
                        <label className="labelView">Ciudad: </label>
                        <label className="atributo">{ciudad}</label><br/>
                        <label className="labelView">Fecha de Nacimiento: </label>
                        <label className="atributo">{nacimiento}</label><br/>
                        <label className="labelView">Direccion: </label>
                        <label className="atributo">{direccion}</label><br/>
                        <label className="labelView">Celular: </label>
                        <label className="atributo">{celular}</label><br/>
                        <button className="btn btn-primary btn-lg">Aceptar</button>
                        <Link 
                            to="/biblioteca/Main/user-edit" 
                            id="edit"
                            type="button" 
                            class="btn btn-primary btn-lg" 
                            onClick={()=>editUser(localStorage.getItem("editUser"))}
                        >Editar</Link>
                    </form>
                </div>
                <div className="col-lg-2"></div>
        </div>
    )
}