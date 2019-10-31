import React from 'react';
import { myFirestore } from '../Configure/firebase';
import { Link } from "react-router-dom";
import './listUsers.css'
//import firebase from 'firebase';

export class ListUsers extends React.Component{
    constructor(props){
        super(props)
        this.state={
            idUsers:'',
            items: [],
        }
    }

    componentDidMount(){
        myFirestore.collection('users')//.get()
        .onSnapshot(snap=>{
            this.setState({
                items: snap.docs.map(doc=>{
                    return {
                        data: doc.data(),
                        nameComplet: doc.data().nameComplet,
                        bloq: doc.data().bloq
                    }
                })
            })
        })
        /*.then(snapShots=>{            
            this.setState({
                items: snapShots.docs.map(doc=>{
                    return {
                        data: doc.data(),
                        nameComplet: doc.data().nameComplet,
                        bloq: doc.data().bloq
                    }
                })
            })
        },error=>{
            console.log(error)
        })*/
    }

    editUser=(id)=>{
        console.log("HOLA")
        localStorage.setItem("editUser", id);
        localStorage.setItem("Numero", "2")
        console.log(localStorage.getItem("Numero"))
        console.log(localStorage.getItem("editUser"))
    }

    noExists(){
        return(
            <h1>Page not found</h1>
        )
    }

    bloquear(user){

        myFirestore.collection('users').doc(`${user}`)
        .update({
            bloq: true
        })
    }

    desBloquear(user){
        myFirestore.collection('users').doc(`${user}`)
        .update({
            bloq: false
        })
    }

    viewUser=(id)=>{
        localStorage.setItem("editUser", id);
    }

    listUser(){
        const { items } = this.state;
        return(
            <div className="row">
                <div className="col-lg-2"></div>
                <div className="col-lg-8">
                    <h1 className="text-center" >Listar Usuarios</h1>
                    <table class="table">
                        <thead>
                            <tr>
                            <th style={{textAlign: "center"}} scope="col">Usuario</th>
                            <th style={{textAlign: "center"}} scope="col">Nombre</th>
                            <th style={{textAlign: "center"}} scope="col">Editar</th>
                            <th style={{textAlign: "center"}} scope="col">Ver</th>
                            <th style={{textAlign: "center"}} scope="col">Bloqueado</th>
                            </tr>
                        </thead>
                        <tbody>
                            { items && items!== undefined? items.map((item, key) =>(
                                <tr key={key}>
                                    <td>{item.data.user}</td>
                                    <td>{item.data.nameComplet}</td>
                                    <td style={{textAlign: "center"}}>
                                        <Link 
                                            to="/biblioteca/Main/user-edit" 
                                            type="button" 
                                            class="btn btn-primary" 
                                            onClick={()=>this.editUser(item.data.user)}
                                        >Editar</Link>
                                    </td>
                                    <td style={{textAlign: "center"}}>
                                        <Link 
                                            to="/biblioteca/Main/view-Users" 
                                            type="button" 
                                            class="btn btn-primary" 
                                            onClick={()=>this.viewUser(item.data.user)}
                                        >Ver</Link>
                                    </td>
                                    <td style={{textAlign: "center"}}>
                                        {<div class="ui toggle checkbox">
                                            <label class="switch">
                                                {item.data.bloq?
                                                    <input type="checkbox" defaultChecked={true} onClick={()=>{this.desBloquear(item.data.user)}}/>:
                                                    <input type="checkbox" onClick={()=>{this.bloquear(item.data.user)}}/>
                                                }
                                                <span class="slider round" ></span>
                                            </label>
                                        </div>}
                                    </td>
                                </tr>
                            )): null}
                        </tbody>
                    </table>
                    <Link className="btn btn-primary btn-lg" to="/biblioteca/Main">Atras</Link>
                </div>
                <div className="col-lg-2"></div>
            </div>
        )
    }

    render(){
        return(
            <div>
                {localStorage.getItem("User")==="adminSuper"?this.listUser():this.noExists()}
            </div>
        )
    }
}