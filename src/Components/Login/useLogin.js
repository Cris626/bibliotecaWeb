import React, { useEffect , useState } from 'react';
import { myFirestore } from '../Configure/firebase';
import { Link } from "react-router-dom";
import './login.css'


export function useLogin(){
    const [usuario, setUsuario] = useState()
    const [contraseña, setContraseña] = useState()
    const [bandera, setBandera] = useState(false)
    const [password, setPassword] = useState("password")
    const [flag, setFlag] = useState(false)
    const [usuarios, setUsuarios] = useState()
    let contador

    function handleChangeUser(e){
        setUsuario(e.target.value)
    }

    function handleChangePass(e){
        setContraseña(e.target.value)
    }

    useEffect(()=>{
        if(bandera!==false){
            window.location="/biblioteca/Main";
        }
    })

    useEffect(()=>{
        myFirestore.collection('users').get()
        .then(doc=>
            setUsuarios({
                items: doc.docs.map(elements=>elements.id)
            })
        )
        console.log(usuarios)
    },[])

    function okey(){
        const db = myFirestore.collection('users').doc(`${usuario}`)
        db.update({
            contBloq: 0
        });
        setBandera(true);
        //setDireccion("/biblioteca/Main")
        alert("Bienvenido");
    }

    function contBloqA() {
        myFirestore.collection('users').doc(`${usuario}`)
        .get().then(doc=>contador=doc.data().contBloq)
        //console.log(contador)
        if(contador===undefined){
            contador=1
        }else{
            contador++
        }
        myFirestore.collection('users').doc(`${usuario}`)
        .update({
            contBloq: contador
        })
        alert("CONTRASEÑA INCORRECTA")
    }

    function bloquear() {
        const db = myFirestore.collection('users').doc(`${usuario}`)
        db.update({bloq: true})
        alert("USUARIO BLOQUEADO CONTACTE CON EL ADMINISTRADOR")
    }

    function contBloq() {
        let test = false
        myFirestore.collection('users').doc(`${usuario}`)
        .get().then(doc=>
            doc.data().contBloq>2?
            myFirestore.collection('users').doc(`${usuario}`).update({bloq: true})
            :contBloqA())
        .catch(error=>console.log(error))
        if(test!=false){
            alert("USUARIO BLOQUEADO CONTACTE CON EL ADMINISTRADOR")
        }
    }

    function success() {
        const db = myFirestore.collection('users').doc(`${usuario}`)
        db.get()
        .then(doc=>
            contraseña===doc.data().password?
            okey():contBloq()
        ).catch(error=>console.log(error))
        //console.log(password)
        //console.log("2")
    }

    function validation(){
        myFirestore.collection('users').doc(`${usuario}`).get()
        .then(doc=>doc.data().bloq?
            alert("USUARIO BLOQUEADO CONTACTE CON EL ADMINISTRADOR"):
            success()
        ).catch(error=>console.log(error))
        //console.log(usuario)
        //console.log("1")
    }

    function existUser() {
        let cont = 0;
        while(cont<usuarios.items.length){
            if(usuarios.items[cont]===usuario){
                setFlag(false)
                validation()
                break
            }else{
                setFlag(true)
                cont ++
            }
        }
        if(flag!=false){
            alert("USUARIO NO EXISTENTE")
        }else{
            localStorage.setItem("Numero", "1")
            localStorage.setItem("User",`${usuario}`);
        }
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
                <div className="form">
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
                    <button onClick={/*validation*/existUser} className="btn btn-primary btn-lg btn-block">Iniciar Sesion</button>
                    <Link id="registeer" className="btn btn-primary btn-lg btn-block" to="/biblioteca/create-account">Crear cuenta</Link>
                </div>
                {/*<button onClick={()=>validation} className="btn btn-primary btn-lg btn-block" type="submit">Iniciar Sesion</button>
                <Link id="registeer" className="btn btn-primary btn-lg btn-block" to="/biblioteca/create-account">Crear cuenta</Link>*/}
            </div>
        </div>
        <div className="col-lg-4"></div>
        </div>
    )
}