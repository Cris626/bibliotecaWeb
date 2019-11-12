import React, { useEffect , useState } from 'react';
import { myFirestore } from '../Configure/firebase';
import { Link } from "react-router-dom";
import './listBooks.css'

export function useListBooks() {
    const [books, setBooks] = useState();

    useEffect(()=>{
        myFirestore.collection('books')
        .onSnapshot(snap=>{
            setBooks({
                items: snap.docs.map(doc=>{
                    return {
                        id: doc.id,
                        data: doc.data()
                    }
                })
            })
        }) 
    },[])

    function guardar(idLib, idAu) {
        localStorage.setItem("idLibro",idLib)
        localStorage.setItem("idAutor",idAu)
    }

    function libBooksUser() {
        return(
            <div className="main">
                <h1 style={{textAlign:"center"}}>Libros</h1>
                <div class="input-group">
                    <input placeholder="Buscar libro por" type="text" className="form-control" aria-label="Text input with dropdown button"/>
                    <div className="input-group-append">
                        <select className="btn btn-dark dropdown-toggle">
                            <option>Titulo</option>
                            <option>Autor</option>
                            <option>Editorial</option>
                        </select>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                        <th style={{textAlign: "center"}} scope="col">Titulo</th>
                        <th style={{textAlign: "center"}} scope="col">Editorial</th>
                        <th style={{textAlign: "center"}} scope="col">Autor</th>
                        <th style={{textAlign: "center"}} scope="col">Cantidad</th>
                        <th style={{textAlign: "center"}} scope="col">Seccion</th>
                        <th style={{textAlign: "center"}} scope="col">ID</th>
                        <th style={{textAlign: "center"}} scope="col">Reservar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books !== undefined? books.items.map((items)=>(
                        <tr>
                            <td style={{textAlign: "center"}}>{items.data.titulo}</td>
                            <td style={{textAlign: "center"}}>{items.data.editorial}</td>
                            <td style={{textAlign: "center"}}>{items.data.autor}</td>
                            <td style={{textAlign: "center"}}>{items.data.cantidad}</td>
                            <td style={{textAlign: "center"}}>{items.data.seccion}</td>
                            <td style={{textAlign: "center"}}>{items.id}</td>
                            <td style={{textAlign: "center"}}><Link to="/biblioteca/Main/books/Edit" onClick={()=>guardar(items.id, items.data.autor)}>Reservar*</Link></td>
                        </tr>
                        )):null}
                    </tbody>
                </table>
                <a href="/biblioteca/Main/books/Reserved"><button id="register" className="btn btn-dark btn-lg">Reservado</button></a>
                <a href="/biblioteca/Main"><button id="back" className="btn btn-dark btn-lg">Atras</button></a>
            </div>
        )
    }

    function libBooks(){
        return(
            <div className="main">
                <h1 style={{textAlign:"center"}}>Libros</h1>
                {/*<button onClick={()=>console.log(books.items.map((items)=>items.id))}>click</button>*/}
                
                <table class="table">
                    <thead>
                        <tr>
                        <th style={{textAlign: "center"}} scope="col">Titulo</th>
                        <th style={{textAlign: "center"}} scope="col">Editorial</th>
                        <th style={{textAlign: "center"}} scope="col">Autor</th>
                        <th style={{textAlign: "center"}} scope="col">Cantidad</th>
                        <th style={{textAlign: "center"}} scope="col">Seccion</th>
                        <th style={{textAlign: "center"}} scope="col">ID</th>
                        <th style={{textAlign: "center"}} scope="col">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books !== undefined? books.items.map((items)=>(
                        <tr>
                            <td style={{textAlign: "center"}}>{items.data.titulo}</td>
                            <td style={{textAlign: "center"}}>{items.data.editorial}</td>
                            <td style={{textAlign: "center"}}>{items.data.autor}</td>
                            <td style={{textAlign: "center"}}>{items.data.cantidad}</td>
                            <td style={{textAlign: "center"}}>{items.data.seccion}</td>
                            <td style={{textAlign: "center"}}>{items.id}</td>
                            <td style={{textAlign: "center"}}><Link to="/biblioteca/Main/books/Edit" onClick={()=>guardar(items.id, items.data.autor)}>Editar</Link></td>
                        </tr>
                        )):null}
                    </tbody>
                </table>
                <a href="/biblioteca/Main"><button id="back" className="btn btn-dark btn-lg">Atras</button></a>
                <a href="/biblioteca/Main/books/Register"><button id="register" className="btn btn-dark btn-lg">Registrar libro</button></a>
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
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
                {/*localStorage.getItem("User")==="adminSuper"?libBooks():noExists()*/}
                {localStorage.getItem("User")==="adminSuper"?libBooks():localStorage.getItem("User")?libBooksUser():noExists()}
            </div>
            <div className="col-lg-2"></div>
        </div>
    )
}