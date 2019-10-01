import React from 'react';
import { myFirestore } from '../Configure/firebase';
import { Link } from "react-router-dom";


export class UserEdit extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user: localStorage.getItem('User'),
            nameComplet: '',
            ci: '',
            dateNac: '',
            phone: '',
            city: '',
            address: '',
            password: localStorage.getItem('Pass'),
            newPassword: '',
            valid: false,
            colorInvalid: '#e41013',
            coloValid: '#008b02',
        }
        this.exists = this.exists.bind(this);
        this.noExists = this.noExists.bind(this);
    }

    componentDidMount(){
        console.log(this.state.user)
        this.getTexto(this.state.user)
        console.log(this.state.nameComplet)
    }

    getTexto=(user)=>{
        myFirestore.collection('users').doc(`${user}`)
        .onSnapshot(snap=>{
            this.setState({
                nameComplet: snap.data().nameComplet,
                ci: snap.data().ci,
                dateNac: snap.data().dateNac,
                phone: snap.data().phone,
                city: snap.data().city,
                address: snap.data().address,
            })
        })
    }

    noExists(){
        return(
            <h1>Page not found</h1>
        )
    }

    handleChange=(event)=> {
        myFirestore.collection('users').doc(`${this.state.user}`)
        .update({
            nameComplet: event.target.value
        })
    }
    //
    updateInputCi=event=>{
        myFirestore.collection('users').doc(`${this.state.user}`)
        .update({
            ci: event.target.value
        })
    }
    updateInputNac=event=>{
        myFirestore.collection('users').doc(`${this.state.user}`)
        .update({
            dateNac: event.target.value
        })
    }
    updateInputPhone=event=>{
        myFirestore.collection('users').doc(`${this.state.user}`)
        .update({
            phone: event.target.value
        })
    }
    updateInputCity=event=>{
        myFirestore.collection('users').doc(`${this.state.user}`)
        .update({
            city: event.target.value
        })
    }
    updateInputAddress=event=>{
        myFirestore.collection('users').doc(`${this.state.user}`)
        .update({
            address: event.target.value
        })
    }
    updateInputNewPassword=event=>{
        if(this.state.valid){
            myFirestore.collection('users').doc(`${this.state.user}`)
            .update({
                password: event.target.value
            })  
        }
    }
    actualicePassword=event=>{
        if(this.state.password===event.target.value){
            this.setState({valid: true})
        }else{
            this.setState({valid: false})
        }
    }
    ///

    exists(){
        return(
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <form action='/biblioteca/Main'>
                        <h1 className="text-center" >Editar Datos</h1>
                        <div className="form-group">
                            <label for="firtsName">Nombre completo:</label>
                            <input value={this.state.nameComplet} onChange={this.handleChange} type="text" className="form-control" id="firtsName" placeholder="Nombre Completo" required disabled/>
                        </div>
                        <div className="form-group">
                            <label for="ci">Carnet de identidad:</label>
                            <input onChange={this.updateInputCi} value={this.state.ci} type="text" className="form-control" id="ci" placeholder="Carnet de Identidad" required disabled/>
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
                            <label for="user">Usuario:</label>
                            <input onChange={this.updateInputUser} value={this.state.user} type="text" className="form-control" id="user" placeholder="Usuario" required disabled/>
                        </div>
                        <div className="form-group">
                            <label for="antiguePassword">Contraseña actual</label>
                            <input onChange={this.actualicePassword} type="password" className="form-control" id="antiguePassword" placeholder="Contraseña actual"/>
                            <label
                            style= {this.state.valid?{color:this.state.coloValid}:{color:this.state.colorInvalid}}
                            >{this.state.valid?'Valido':'Invalido la contraseña no se guardara'}</label>
                        </div>
                        <div className="form-group">
                            <label for="password">Nueva Contraseña:</label>
                            <input onChange={this.updateInputNewPassword} type="password" className="form-control" id="password" placeholder="Nueva contraseña"/>
                        </div>
                        <button id="x" className="btn btn-primary btn-lg">Registrar</button>
                        <Link to="/biblioteca/Main" className="btn btn-primary btn-lg">Cancelar</Link>
                    </form>
                </div>
                <div className="col-lg-3"></div>
            </div>
        )
    }

    render(){
        return(
            <div>
                {this.state.user?this.exists():this.noExists()}
            </div>
        )
    }
}