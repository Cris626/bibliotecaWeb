import React, { useEffect , useState } from 'react';
import { myFirestore } from '../Configure/firebase';
import { Link } from "react-router-dom";
import './listBooks.css'

export function useMyReserved() {
    const [lyrics, setLyrics] = useState();
    const [flag, setFlag] = useState();
    const [reservados, setReservados] = useState();
    const [user, setUser] = useState(localStorage.getItem("User"))
    const [busqPor, setBusqPor] = useState();

    
    function bloquear(user){
        myFirestore.collection('reserved').doc(`${user}`)
        .update({
            entregado: true
        })
    }

    function desBloquear(user){
        myFirestore.collection('reserved').doc(`${user}`)
        .update({
            entregado: false
        })
    }

    useEffect(()=>{
        myFirestore.collection('reserved') 
        .onSnapshot(snap=>{
            setReservados({
                items: snap.docs.map(doc=>{
                    return {
                        id: doc.id,
                        data: doc.data()
                    }
                })
            })
        })
    },[])

    function resBooksUser() {
        return(
            <div className="main">
                <h1 style={{textAlign:"center"}}>Mis Libros Reservados</h1>
                {/*<button onClick={()=>console.log(books.items.map((items)=>items.id))}>click</button>*/}
                
                <table class="table">
                    <thead>
                        <tr>
                        <th style={{textAlign: "center"}} scope="col">ID</th>
                        <th style={{textAlign: "center"}} scope="col">Titulo</th>
                        <th style={{textAlign: "center"}} scope="col">Autor</th>
                        <th style={{textAlign: "center"}} scope="col">Seccion</th>
                        <th style={{textAlign: "center"}} scope="col">Lector</th>
                        <th style={{textAlign: "center"}} scope="col">CI</th>
                        <th style={{textAlign: "center"}} scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservados !== undefined? reservados.items.map((items)=>(
                            items.data.usuario===user?
                        <tr>
                            <td style={{textAlign: "center"}}>{items.id}</td>
                            <td style={{textAlign: "center"}}>{items.data.titulo}</td>
                            <td style={{textAlign: "center"}}>{items.data.autor}</td>
                            <td style={{textAlign: "center"}}>{items.data.seccion}</td>
                            <td style={{textAlign: "center"}}>{items.data.lector}</td>
                            <td style={{textAlign: "center"}}>{items.data.ci}</td>
                            <td style={{textAlign: "center"}}>
                                {<div class="ui toggle checkbox">
                                    <label class="switch">
                                        {items.data.entregado?
                                            <input type="checkbox" disabled defaultChecked={true} onClick={()=>{desBloquear(items.id)}}/>:
                                            <input type="checkbox" disabled onClick={()=>{bloquear(items.id)}}/>
                                        }
                                        <span class="slider round" ></span>
                                    </label>
                                </div>}
                            </td>
                        </tr>:null
                        )):null}
                    </tbody>
                </table>
                <a href="/biblioteca/Main/books"><button id="back" className="btn btn-dark btn-lg">Atras</button></a>
            </div>
        )
    }

    function search(e) {
        setLyrics(e.target.value)
        if(e.target.value){
            setFlag(true)
            console.log("TRUE")
        }else{
            setFlag(false)
            console.log("FALSE")
        }
    }

    function test(e) {
        console.log(e.target.value)
        if(e.target.value==="Codigo"){
            setBusqPor('id')
        }else if(e.target.value==="Lector"){
            setBusqPor('lector')
        }else if(e.target.value==="CI"){
            setBusqPor('ci')
        }
    }

    function reservedBooks() {
        if(flag!==false&&flag!==true){
            return(
                <div className="main">
                    <h1 style={{textAlign:"center"}}>Libros Reservados</h1>
                    {/*<button onClick={()=>console.log(books.items.map((items)=>items.id))}>click</button>*/}
                    <div class="input-group">
                        <input onChange={search} placeholder="Buscar libro reservado por" type="text" className="form-control" aria-label="Text input with dropdown button"/>
                        <div className="input-group-append">
                            <select onChange={test} className="btn btn-dark dropdown-toggle">
                                <option>Codigo</option>
                                <option>Lector</option>
                                <option>CI</option>
                            </select>
                        </div>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                            <th style={{textAlign: "center"}} scope="col">ID</th>
                            <th style={{textAlign: "center"}} scope="col">Titulo</th>
                            <th style={{textAlign: "center"}} scope="col">Autor</th>
                            <th style={{textAlign: "center"}} scope="col">Seccion</th>
                            <th style={{textAlign: "center"}} scope="col">Lector</th>
                            <th style={{textAlign: "center"}} scope="col">CI</th>
                            <th style={{textAlign: "center"}} scope="col">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservados !== undefined? reservados.items.map((items)=>(
                            <tr>
                                <td style={{textAlign: "center"}}>{items.id}</td>
                                <td style={{textAlign: "center"}}>{items.data.titulo}</td>
                                <td style={{textAlign: "center"}}>{items.data.autor}</td>
                                <td style={{textAlign: "center"}}>{items.data.seccion}</td>
                                <td style={{textAlign: "center"}}>{items.data.lector}</td>
                                <td style={{textAlign: "center"}}>{items.data.ci}</td>
                                <td style={{textAlign: "center"}}>
                                    {<div class="ui toggle checkbox">
                                        <label class="switch">
                                            {items.data.entregado?
                                                <input type="checkbox" defaultChecked={true} onClick={()=>{desBloquear(items.id)}}/>:
                                                <input type="checkbox" onClick={()=>{bloquear(items.id)}}/>
                                            }
                                            <span class="slider round" ></span>
                                        </label>
                                    </div>}
                                </td>
                            </tr>
                            )):null}
                        </tbody>
                    </table>
                    <a href="/biblioteca/Main"><button id="back" className="btn btn-dark btn-lg">Atras</button></a>
                </div>
            )
        }else{
            return(
                <div className="main">
                    <h1 style={{textAlign:"center"}}>Libros Reservados</h1>
                    {/*<button onClick={()=>console.log(books.items.map((items)=>items.id))}>click</button>*/}
                    <div class="input-group">
                        <input onChange={search} placeholder="Buscar reservar por" type="text" className="form-control" aria-label="Text input with dropdown button"/>
                        <div onChange={test} className="input-group-append">
                            <select className="btn btn-dark dropdown-toggle">
                                <option>Codigo</option>
                                <option>Lector</option>
                                <option>CI</option>
                            </select>
                        </div>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                            <th style={{textAlign: "center"}} scope="col">ID</th>
                            <th style={{textAlign: "center"}} scope="col">Titulo</th>
                            <th style={{textAlign: "center"}} scope="col">Autor</th>
                            <th style={{textAlign: "center"}} scope="col">Seccion</th>
                            <th style={{textAlign: "center"}} scope="col">Lector</th>
                            <th style={{textAlign: "center"}} scope="col">CI</th>
                            <th style={{textAlign: "center"}} scope="col">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservados !== undefined? reservados.items.map((items)=>(
                                busqPor==="id"||busqPor===undefined?
                                items.id.indexOf(`${lyrics}`)!==-1?
                            <tr>
                                <td style={{textAlign: "center"}}>{items.id}</td>
                                <td style={{textAlign: "center"}}>{items.data.titulo}</td>
                                <td style={{textAlign: "center"}}>{items.data.autor}</td>
                                <td style={{textAlign: "center"}}>{items.data.seccion}</td>
                                <td style={{textAlign: "center"}}>{items.data.lector}</td>
                                <td style={{textAlign: "center"}}>{items.data.ci}</td>
                                <td style={{textAlign: "center"}}>
                                    {<div class="ui toggle checkbox">
                                        <label class="switch">
                                            {items.data.entregado?
                                                <input type="checkbox" defaultChecked={true} onClick={()=>{desBloquear(items.id)}}/>:
                                                <input type="checkbox" onClick={()=>{bloquear(items.id)}}/>
                                            }
                                            <span class="slider round" ></span>
                                        </label>
                                    </div>}
                                </td>
                            </tr>:null:busqPor==="lector"?
                            items.data.lector.indexOf(`${lyrics}`)!==-1?
                            <tr>
                                <td style={{textAlign: "center"}}>{items.id}</td>
                                <td style={{textAlign: "center"}}>{items.data.titulo}</td>
                                <td style={{textAlign: "center"}}>{items.data.autor}</td>
                                <td style={{textAlign: "center"}}>{items.data.seccion}</td>
                                <td style={{textAlign: "center"}}>{items.data.lector}</td>
                                <td style={{textAlign: "center"}}>{items.data.ci}</td>
                                <td style={{textAlign: "center"}}>
                                    {<div class="ui toggle checkbox">
                                        <label class="switch">
                                            {items.data.entregado?
                                                <input type="checkbox" defaultChecked={true} onClick={()=>{desBloquear(items.id)}}/>:
                                                <input type="checkbox" onClick={()=>{bloquear(items.id)}}/>
                                            }
                                            <span class="slider round" ></span>
                                        </label>
                                    </div>}
                                </td>
                            </tr>:null:busqPor==="ci"?
                            items.data.ci.indexOf(`${lyrics}`)!==-1?
                            <tr>
                                <td style={{textAlign: "center"}}>{items.id}</td>
                                <td style={{textAlign: "center"}}>{items.data.titulo}</td>
                                <td style={{textAlign: "center"}}>{items.data.autor}</td>
                                <td style={{textAlign: "center"}}>{items.data.seccion}</td>
                                <td style={{textAlign: "center"}}>{items.data.lector}</td>
                                <td style={{textAlign: "center"}}>{items.data.ci}</td>
                                <td style={{textAlign: "center"}}>
                                    {<div class="ui toggle checkbox">
                                        <label class="switch">
                                            {items.data.entregado?
                                                <input type="checkbox" defaultChecked={true} onClick={()=>{desBloquear(items.id)}}/>:
                                                <input type="checkbox" onClick={()=>{bloquear(items.id)}}/>
                                            }
                                            <span class="slider round" ></span>
                                        </label>
                                    </div>}
                                </td>
                            </tr>:null:null
                            )):null}
                        </tbody>
                    </table>
                    <a href="/biblioteca/Main"><button id="back" className="btn btn-dark btn-lg">Atras</button></a>
                </div>
            )
        }
        
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
                {localStorage.getItem("User")==="adminSuper"?reservedBooks():localStorage.getItem("User")?resBooksUser():noExists()}
            </div>
            <div className="col-lg-2"></div>
        </div>
    )
}