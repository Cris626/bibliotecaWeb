import React, { useEffect, useState } from 'react';
import { myFirestore } from '../Configure/firebase';

export function useEditBooks() {
    const [titulo, setTitulo] = useState();
    const [editorial, setEditorial] = useState();
    const [cantidad, setCantidad] = useState();
    const [seccion, setSeccion] = useState();
    const [id, setId] = useState(localStorage.getItem("idLibro"));
    const [autor, setAutor] = useState(localStorage.getItem("idAutor"));
    const [nomAutor, setNomAutor] = useState();
    const [pais, setPais] = useState();
    const [nac, setNac] = useState();

    function datosBook() {
        myFirestore.collection('books').doc(`${id}`)
        .onSnapshot(snap=>{
            setTitulo(snap.data().titulo)
            setEditorial(snap.data().editorial)
            setCantidad(snap.data().cantidad)
            setSeccion(snap.data().seccion)
        })
    }

    function datosAuthor() {
        myFirestore.collection('authors').doc(`${autor}`)
        .onSnapshot(snap=>{
            setNomAutor(snap.data().nombre)
            setPais(snap.data().pais)
            setNac(snap.data().anoNacimiento)
        })
    }

    useEffect(()=>{
        if(localStorage.getItem("User")==="adminSuper"){
            datosAuthor();
            datosBook();
        }
    },[])


    function updateInputTitle(e){
        myFirestore.collection('books').doc(`${id}`)
        .update({
            titulo: e.target.value
        })
    }

    function updateInputEdit(e){
        myFirestore.collection('books').doc(`${id}`)
        .update({
            editorial: e.target.value
        })
    }

    function updateInputSeccion(e){
        myFirestore.collection('books').doc(`${id}`)
        .update({
            seccion: e.target.value
        })
    }

    function updateInputCantidad(e) {
        myFirestore.collection('books').doc(`${id}`)
        .update({
            cantidad: e.target.value
        })
    }

    function updateInputAutor(e) {
        myFirestore.collection('authors').doc(`${autor}`)
        .update({
            nombre: e.target.value
        })
    }

    function updateInputNac(e) {
        myFirestore.collection('authors').doc(`${autor}`)
        .update({
            anoNacimiento: e.target.value
        })
    }

    function updateInputPais(e) {
        myFirestore.collection('authors').doc(`${autor}`)
        .update({
            pais: e.target.value
        })
    }

    function noExists(){
        return(
            <h1>Page not found</h1>
        )
    }

    function deleteDate() {
        localStorage.setItem("idLibro","");
        localStorage.setItem("idAutor","");
    }

    function editBook() {
        return(
            <div className="main" id="miForm">
                <h1 style={{textAlign:"center"}}>Editar Libro</h1>
                <div className="form-group">
                    <label for="ci">ID:</label>
                    <input value={id} type="text" className="form-control" id="ci" placeholder="ID del libro" required autoComplete="off" disabled/>
                </div>
                <div className="form-group">
                    <label for="firtsName">Titulo:</label>
                    <input onChange={updateInputTitle} value={titulo} type="text" className="form-control" id="firtsName" name="firtsName" autoComplete="off" placeholder="Titulo" required />
                </div>
                <div className="form-group">
                    <label>Editorial</label>
                    <input onChange={updateInputEdit} value={editorial} type="text" className="form-control" placeholder="Editorial" autoComplete="off" required/>
                </div>
                <div className="form-group">
                    <label for="Phone">Seccion:</label>
                    <input onChange={updateInputSeccion} value={seccion} type="text" className="form-control" id="Phone" placeholder="Seccion" autoComplete="off" required/>
                </div>
                <div className="form-group">
                    <label for="address">Cantidad:</label>
                    <input onChange={updateInputCantidad} value={cantidad} type="text" className="form-control" id="address" placeholder="Cantidad" autoComplete="off" required/>
                </div>
                <div className="form-group">
                    <label for="user">Autor:</label>
                    <input onChange={updateInputAutor} value={nomAutor} type="text" className="form-control" id="user" placeholder="Nombre Autor" autoComplete="off" required disabled/>
                </div>
                <div className="form-group">
                    <label for="user">Año nacimiento:</label>
                    <input onChange={updateInputNac} value={nac} type="text" className="form-control" id="user" placeholder="Año nacimiento autor" autoComplete="off" required/>
                </div>
                <div className="form-group">
                    <label for="user">Pais:</label>
                    <input onChange={updateInputPais} value={pais} type="text" className="form-control" id="user" placeholder="Pais Autor" autoComplete="off" required/>
                </div>
                <a href="/biblioteca/Main/books"><button onClick={()=>deleteDate()} className="btn btn-primary btn-lg">Cancelar</button></a>
                <a href="/biblioteca/Main/books"><button id="registerBto" onClick={()=>{alert("Se edito con exito")}} className="btn btn-primary btn-lg">Editar</button></a>
            </div>
        )
    }
    return (
        <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
                {localStorage.getItem("User")==="adminSuper"?editBook():noExists()}
            </div>
            <div className="col-lg-3"></div>
        </div>
    )
}