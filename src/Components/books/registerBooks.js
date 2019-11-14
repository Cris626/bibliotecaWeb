import React, { useState } from 'react';
import { myFirestore } from '../Configure/firebase';

export function useRegisterBooks(){
    const [titulo, setTitulo] = useState();
    const [editorial, setEditorial] = useState();
    const [cantidad, setCantidad] = useState();
    const [seccion, setSeccion] = useState();
    const [id, setId] = useState();
    const [autor, setAutor] = useState();
    const [pais, setPais] = useState();
    const [nac, setNac] = useState();

    function updateInputTitle(e){
        setTitulo(e.target.value)
    }

    function updateInputId(e){
        setId(e.target.value)
    }

    function updateInputEdit(e){
        setEditorial(e.target.value)
    }

    function updateInputSeccion(e){
        setSeccion(e.target.value)
    }

    function updateInputCantidad(e) {
        setCantidad(e.target.value)
    }

    function updateInputAutor(e) {
        setAutor(e.target.value)
    }

    function updateInputNac(e) {
        setNac(e.target.value)
    }

    function updateInputPais(e) {
        setPais(e.target.value)
    }

    function registroBooks() {
        myFirestore.collection("books").doc(`${id}`)
        .set({
            titulo: titulo,
            seccion: seccion,
            editorial: editorial,
            cantidad: cantidad,
            autor: autor.substr(0,3).toUpperCase()
        })
    }

    function registroAuthor() {
        myFirestore.collection("authors").doc(`${autor.substr(0,3).toUpperCase()}`)
        .set({
            anoNacimiento: nac,
            nombre: autor,
            pais: pais
        })
    }

    function limpiar() {
        setAutor("")
        setCantidad("")
        setEditorial("")
        setId("")
        setNac("")
        setPais("")
        setSeccion("")
        setTitulo("")
    }

    function registro() {
        registroAuthor();
        registroBooks();
        alert(`Se registro el libro ${titulo}`);
        limpiar();
    }

    function registerBook() {
        return (
            <div className="main" id="miForm">
                <h1 style={{textAlign:"center"}}>Registrar Libro</h1>
                <div className="form-group">
                    <label for="ci">ID:</label>
                    <input onChange={updateInputId} value={id} type="text" className="form-control" id="ci" placeholder="ID del libro" required autoComplete="off"/>
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
                    <input onChange={updateInputAutor} value={autor} type="text" className="form-control" id="user" placeholder="Nombre Autor" autoComplete="off" required/>
                </div>
                <div className="form-group">
                    <label for="user">Año nacimiento:</label>
                    <input onChange={updateInputNac} value={nac} type="text" className="form-control" id="user" placeholder="Año nacimiento autor" autoComplete="off" required/>
                </div>
                <div className="form-group">
                    <label for="user">Pais:</label>
                    <input onChange={updateInputPais} value={pais} type="text" className="form-control" id="user" placeholder="Pais Autor" autoComplete="off" required/>
                </div>
                <a href="/biblioteca/Main/books"><button className="btn btn-dark btn-lg">Cancelar</button></a>
                <button style={{float:"right"}} onClick={registro} className="btn btn-dark btn-lg">Registrar</button>
            </div>
        )
        
    }

    function noExists(){
        return(
            <h1>Page not found</h1>
        )
    }
    return(
        <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
                {localStorage.getItem("User")==="adminSuper"?registerBook():noExists()}
            </div>
            <div className="col-lg-3"></div>
        </div>
    )
}