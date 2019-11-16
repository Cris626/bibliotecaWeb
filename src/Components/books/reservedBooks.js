import React, { useEffect, useState } from 'react';
import { myFirestore } from '../Configure/firebase';
import { Link } from "react-router-dom";
import './listBooks.css'

export function useReservedBooks() {
    const [codigo, setCodigo] = useState();
    const [id, setId] = useState(localStorage.getItem("idLibro"));
    const [autor, setAutor] = useState(localStorage.getItem("idAutor"));
    const [nomAutor, setNomAutor] = useState();
    const [seccion, setSeccion] = useState();
    const [titulo, setTitulo] = useState();
    const [codLector, setCodLector] = useState(localStorage.getItem("User"));
    const [lector, setLector] = useState();
    const [ci, setCi] = useState();
    const [cantidad, setCantidad] = useState();
    const [dateR, setDateR] = useState(localStorage.getItem("fechaReserva"));
    const [dateE, setDateE] = useState(localStorage.getItem("fechaExpira"));
    const [hour, setHour] = useState(localStorage.getItem("hora"));
    const [horario, setHorario] = useState(localStorage.getItem("horario"))

    function datosBook() {
        myFirestore.collection('books').doc(`${id}`)
            .onSnapshot(snap => {
                setTitulo(snap.data().titulo)
                setSeccion(snap.data().seccion)
                setCantidad(snap.data().cantidad)
            })
    }

    function datosAuthor() {
        myFirestore.collection('authors').doc(`${autor}`)
            .onSnapshot(snap => {
                setNomAutor(snap.data().nombre)
            })
    }

    function datosLector() {
        myFirestore.collection('users').doc(`${codLector}`)
            .onSnapshot(snap => {
                setLector(snap.data().nameComplet)
                setCi(snap.data().ci)
            })
    }

    useEffect(() => {
        let caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
        let contraseña = "";
        for (let i = 0; i < 6; i++)contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        setCodigo(contraseña);
        datosAuthor();
        datosBook();
        datosLector();
    }, [])

    function restar() {
        myFirestore.collection("books").doc(`${id}`)
            .update({
                cantidad: cantidad - 1
            })
    }

    function registrarReserva() {
        restar()
        myFirestore.collection("reserved").doc(`${codigo}`)
        .set({
            titulo: titulo,
            autor: nomAutor,
            seccion: seccion,
            lector: lector,
            ci: ci,
            usuario: codLector,
            idBook: id,
            fechaReserva: dateR,
            horaReserva: hour,
            fechaExpira: dateE,
            entregado: false,
            expirado: false
        })
        alert("Se registro con exito con el codigo: "+`${codigo}`)
    }

    function libBooks() {
        return (
            <div className="main">
                <h1 style={{ textAlign: "center" }}>Reservar libro</h1>
                <h2 style={{ textAlign: "center" }}>Titulo Libro</h2>
                <div className="subMain">
                    <h3>Titulo: </h3>
                    <h4 style={{ marginLeft: "78px" }}>{titulo}</h4>
                    <h3>Autor: </h3>
                    <h4 style={{ marginLeft: "80px" }}>{nomAutor}</h4>
                    <h3>Seccion: </h3>
                    <h4 style={{ marginLeft: "100px" }}>{seccion}</h4>
                    <h3>Lector: </h3>
                    <h4 style={{ marginLeft: "84px" }}>{lector}</h4>
                    <h3>CI: </h3>
                    <h4 style={{ marginLeft: "32px" }}>{ci}</h4>
                    <h3>Fecha limite: </h3>
                    <h4 style={{ marginLeft: "154px" }}>{hour}{horario} {dateE}</h4>
                    <h3>Usuario: </h3>
                    <h4 style={{ marginLeft: "102px" }}>{codLector}</h4>
                    <h3>Codigo de reserva: </h3>
                    <h4 style={{ textAlign: "center" }}>{codigo}</h4><br />
                    <a href="/biblioteca/Main/books"><button className="btn btn-dark btn-lg">Cancelar</button></a>
                    <Link to="/biblioteca/Main" style={{ float: "right" }} onClick={registrarReserva} className="btn btn-dark btn-lg">Aceptar</Link>

                </div>
            </div>
        )
    }

    function noExists() {
        return (
            <h1>Page not found</h1>
        )
    }


    return (
        <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
                {localStorage.getItem("User") ? libBooks() : noExists()}
            </div>
            <div className="col-lg-2"></div>
        </div>
    )
}