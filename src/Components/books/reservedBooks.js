import React, { useEffect , useState } from 'react';
import { myFirestore } from '../Configure/firebase';
import { Link } from "react-router-dom";
import './listBooks.css'

export function useReservedBooks() {

    function libBooks() {
        return(
            <div className="main">
                <h1 style={{textAlign:"center"}}>Libros Reservados</h1>
                <table class="table">
                    <thead>
                        <tr>
                        <th style={{textAlign: "center"}} scope="col">Titulo</th>
                        <th style={{textAlign: "center"}} scope="col">Editorial</th>
                        <th style={{textAlign: "center"}} scope="col">Autor</th>
                        <th style={{textAlign: "center"}} scope="col">Seccion</th>
                        <th style={{textAlign: "center"}} scope="col">Codigo</th>
                        <th style={{textAlign: "center"}} scope="col">Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{textAlign: "center"}}>xx</td>
                            <td style={{textAlign: "center"}}>xxx</td>
                            <td style={{textAlign: "center"}}>xxxx</td>
                            <td style={{textAlign: "center"}}>xxxxx</td>
                            <td style={{textAlign: "center"}}>xxxxxxx</td>
                            <td style={{textAlign: "center"}}><Link to="" onClick={()=>console.log("3er incremento")}>Ver mas</Link></td>
                        </tr>
                    </tbody>
                </table>
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
                {localStorage.getItem("User")?libBooks():noExists()}
            </div>
            <div className="col-lg-2"></div>
        </div>
    )
}