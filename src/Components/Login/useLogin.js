/*import React, { useEffect , useState } from 'react';
import { myFirestore } from '../Configure/firebase';
import { Link } from "react-router-dom";
import './login.css'


export function useLogin(){
    const [usuario, setUsuario] = useState()
    const [contraseña, setContraseña] = useState()
    const [bandera, setBandera] = useState()
    const [password, setPassword] = useState("password")
    let contador

    function handleChangeUser(e){
        setUsuario(e.target.value)
    }

    function handleChangePass(e){
        setContraseña(e.target.value)
    }

    function okey(){
        const db = myFirestore.collection('users').doc(`${usuario}`);
        db.update({
            contBloq: 0
        })
        setBandera(true)
        alert("Bienvenido")
    }

    function contBloqA() {
        const db = myFirestore.collection('users').doc(`${usuario}`);
        db.get().then(doc=>contador=doc.data().contBloq)
        console.log(contador)
        if(contador===undefined){
            contador=0
        }else{contador++}
        db.update({contBloq: contador})
        alert("CUENTA INCORRECTA")
    }

    function contBloq() {
        const db = myFirestore.collection('users').doc(`${usuario}`);
        db.get().then(doc=>doc.data().contBloq>2?db.update({bloq: true}, alert("USUARIO BLOQUEADO CONTACTE CON EL ADMINISTRADOR")):contBloqA())
    }

    function success() {
        const db = myFirestore.collection('users').doc(`${usuario}`);
        db.get().then(doc=>contraseña===doc.data().password?okey(usuario):contBloq())

    }

    function validation(){
        myFirestore.collection('users').doc(`${usuario}`).get()
        .then(doc=>doc.data().bloq?
            alert("USUARIO BLOQUEADO"):
            success(usuario)
        ).catch(error=>console.log(error))
    }

    function showPass(){
        if (password === "password") {
            setPassword("text")
        } else {
            setPassword("password")
        }
    }

    return (
        <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
            <div className="main-login">
                <form className="form" onSubmit={validation} action={bandera?'/biblioteca/Main':'/'}>
                <h1 className="text-center">Bienvenido</h1>	
                    <label id="valForm">Usuario: </label>
                    <input 
                        type="text"
                        autoComplete="off" 
                        onChange={handleChangeUser}
                        value={usuario}
                        className="form-control" 
                        placeholder="Usuario" 
                        required
                    />
                    <label id="valForm">Contraseña: </label>
                    <input 
                        type={password}
                        onChange={handleChangePass}
                        value={contraseña}
                        className="form-control pwd" 
                        placeholder="Contraseña" 
                        id="myInput"
                        required
                    />
                    <input 
                        type="checkbox" 
                        onClick={showPass} 
                        id="showPassword"
                    />
                    <label for="showPassword" id="show">Mostar Contraseña</label>
                    <button>ACEPTAR</button>
                </form>
                <button onClick={validation} className="btn btn-primary btn-lg btn-block" type="submit">Iniciar Sesion</button>
                    <Link id="registeer" className="btn btn-primary btn-lg btn-block" to="/biblioteca/create-account">Crear cuenta</Link>
            </div>
        </div>
        <div className="col-lg-4"></div>
        </div>
    )
}
*/