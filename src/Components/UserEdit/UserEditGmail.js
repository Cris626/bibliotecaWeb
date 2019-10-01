import React from 'react';
import { myFirestore } from '../Configure/firebase';
import { Link } from "react-router-dom";

export class UserEditGmail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            key: localStorage.getItem('userEmail'),
            user: localStorage.getItem('User'),
            emailUser: '',
            ci: '',
            dateNac: '',
            phone: '',
            city: '',
            address: '',
            valid: false,
            edit: true,
        }
    }
        
    componentDidMount(){
        this.getTexto(this.state.key)
    }

    getTexto=(key)=>{
        myFirestore.collection('users').doc(`${key}`)
        .onSnapshot(snap=>{
            this.setState({
                emailUser: snap.data().emailUser,
                ci: snap.data().ci,
                dateNac: snap.data().dateNac,
                phone: snap.data().phone,
                city: snap.data().city,
                address: snap.data().address,
            })
        })
    }
    updateInputCi=event=>{
        myFirestore.collection('users').doc(`${this.state.key}`)
        .update({
            ci: event.target.value,
            edit: true
        })
    }
    updateInputNac=event=>{
        myFirestore.collection('users').doc(`${this.state.key}`)
        .update({
            dateNac: event.target.value
        })
    }
    updateInputPhone=event=>{
        myFirestore.collection('users').doc(`${this.state.key}`)
        .update({
            phone: event.target.value
        })
    }
    updateInputCity=event=>{
        myFirestore.collection('users').doc(`${this.state.key}`)
        .update({
            city: event.target.value
        })
    }
    updateInputAddress=event=>{
        myFirestore.collection('users').doc(`${this.state.key}`)
        .update({
            address: event.target.value
        })
    }
    updateInputAddress=event=>{
        myFirestore.collection('users').doc(`${this.state.key}`)
        .update({
            address: event.target.value
        })
    }
    render(){
        return(
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <form action='/biblioteca/Main'>
                        <h1 className="text-center" >Editar Datos</h1>
                        <div className="form-group">
                            <label for="firtsName">Nombre completo:</label>
                            <input value={this.state.user} onChange={this.handleChange} type="text" className="form-control" id="firtsName" placeholder="Nombre Completo" required disabled/>
                        </div>
                        <div className="form-group">
                            <label for="ci">Carnet de identidad:</label>
                            <input onChange={this.updateInputCi} value={this.state.ci} type="text" className="form-control" id="ci" placeholder="Carnet de Identidad" required/>
                        </div>
                        <div className="form-group">
                            <label>Fecha nacimiento:</label>
                            <input onChange={this.updateInputNac} value={this.state.dateNac} type="date" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label for="Phone">Telefono:</label>
                            <input onChange={this.updateInputPhone} value={this.state.phone} type="text" className="form-control" id="Phone" placeholder="Telefono" required/>
                        </div>
                        <div className="form-group">
                            <label for="city">Ciudad:</label>
                            <input onChange={this.updateInputCity} value={this.state.city} type="text" className="form-control" id="city" placeholder="Ciudad" required/>
                        </div>
                        <div className="form-group">
                            <label for="address">Direccion:</label>
                            <input onChange={this.updateInputAddress} value={this.state.address} type="text" className="form-control" id="address" placeholder="Direccion" required/>
                        </div>
                        <div className="form-group">
                            <label for="user">Gmail:</label>
                            <input onChange={this.updateInputUser} value={this.state.emailUser} type="text" className="form-control" id="user" placeholder="Usuario" required disabled/>
                        </div>
                        <button id="x" className="btn btn-primary btn-lg">Registrar</button>
                        <Link to="/biblioteca/Main" className="btn btn-primary btn-lg">Cancelar</Link>
                    </form>
                </div>
                <div className="col-lg-3"></div>
            </div>
        )
    }
}