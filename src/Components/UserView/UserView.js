import React, { useEffect , useState }  from 'react';
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

    return(
        <div className="row">
                <div className="col-lg-2"></div>
                <div className="col-lg-8">
                    <form >
                        <h1 style={{textAlign: "center"}}>Datos del lector</h1>
                        <label>Nombre: </label>
                        <label className="atributo">{nombre}</label><br/>
                        <label>Ci: </label>
                        <label className="atributo">{ci}</label><br/>
                        <label>Ciudad: </label>
                        <label className="atributo">{ciudad}</label><br/>
                        <label>Fecha de Nacimiento: </label>
                        <label className="atributo">{nacimiento}</label><br/>
                        <label>Direccion: </label>
                        <label className="atributo">{direccion}</label><br/>
                        <label>Celular: </label>
                        <label className="atributo">{celular}</label>
                    </form>
                </div>
                <div className="col-lg-2"></div>
        </div>
    )
}