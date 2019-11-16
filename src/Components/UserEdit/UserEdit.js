import React from 'react';
import { myFirestore } from '../Configure/firebase';
import { Link } from "react-router-dom";


export class UserEdit extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user: localStorage.getItem('User'),
            numero: localStorage.getItem('Numero'),     //Of ListUsers
            userEdit: localStorage.getItem('editUser'), //Of ListUsers
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
            bloq: '',
        }
        this.exists = this.exists.bind(this);
        this.noExists = this.noExists.bind(this);
    }

    componentDidMount(){
        if(this.state.numero==="1"){
            console.log(this.state.user)
            this.getTexto(this.state.user)
            console.log(this.state.nameComplet)
        }else{
            if(this.state.numero==="2"){
                this.getTexto(this.state.userEdit)
            }
        }
        
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
                password: snap.data().password,
            })
        })
    }

    noExists(){
        return(
            <h1>Page not found</h1>
        )
    }

    handleChange=(event)=> {
        if(this.state.numero==="1"){
            myFirestore.collection('users').doc(`${this.state.user}`)
            .update({
                nameComplet: event.target.value
            })
        }else{
            myFirestore.collection('users').doc(`${this.state.userEdit}`)
            .update({
                nameComplet: event.target.value
            })
        }
        
    }
    //
    updateInputCi=event=>{
        if(this.state.numero==="1"){
            myFirestore.collection('users').doc(`${this.state.user}`)
            .update({
                ci: event.target.value
            })
        }else{
            myFirestore.collection('users').doc(`${this.state.userEdit}`)
            .update({
                ci: event.target.value
            })
        }
        
    }
    updateInputNac=event=>{
        if(this.state.numero==="1"){
            myFirestore.collection('users').doc(`${this.state.user}`)
            .update({
                dateNac: event.target.value
            })
        }else{
            myFirestore.collection('users').doc(`${this.state.userEdit}`)
            .update({
                dateNac: event.target.value
            })
        }
        
    }
    updateInputPhone=event=>{
        if(this.state.numero==="1"){
            myFirestore.collection('users').doc(`${this.state.user}`)
            .update({
                phone: event.target.value
            })
        }else{
            myFirestore.collection('users').doc(`${this.state.userEdit}`)
            .update({
                phone: event.target.value
            })
        }
        
    }
    updateInputCity=event=>{
        if(this.state.numero==="1"){
            myFirestore.collection('users').doc(`${this.state.user}`)
            .update({
                city: event.target.value
            })
        }else{
            myFirestore.collection('users').doc(`${this.state.userEdit}`)
            .update({
                city: event.target.value
            })
        }
        
    }
    updateInputAddress=event=>{
        if(this.state.numero==="1"){
            myFirestore.collection('users').doc(`${this.state.user}`)
            .update({
                address: event.target.value
            })
        }else{
            myFirestore.collection('users').doc(`${this.state.userEdit}`)
            .update({
                address: event.target.value
            })            
        }
        
    }
////
    desbloqueo=event=>{
        myFirestore.collection('users').doc(`${this.state.userEdit}`)
        .update({
            bloq: event.target.value
        })
    }
////
    updateInputNewPassword=event=>{
        if(this.state.numero==="1"){
            if(this.state.valid){
                myFirestore.collection('users').doc(`${this.state.user}`)
                .update({
                    password: event.target.value
                })  
            }
        }else{
            if(this.state.valid){
                myFirestore.collection('users').doc(`${this.state.userEdit}`)
                .update({
                    password: event.target.value
                })  
            }            
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

    exitsEditUser(){
        return(
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <form action='/biblioteca/Main/view-Users'>
                        <h1 className="text-center" >Editar Datos</h1>
                        <div className="form-group">
                            <label for="firtsName">Nombre completo:</label>
                            <input autoComplete="off"  value={this.state.nameComplet} onChange={this.handleChange} type="text" className="form-control" id="firtsName" placeholder="Nombre Completo" required/>
                        </div>
                        <div className="form-group">
                            <label for="ci">Carnet de identidad:</label>
                            <input onChange={this.updateInputCi} value={this.state.ci} type="text" className="form-control" id="ci" placeholder="Carnet de Identidad" required/>
                        </div>
                        <div className="form-group">
                            <label>Fecha nacimiento:</label>
                            <input autoComplete="off"  onChange={this.updateInputNac} value={this.state.dateNac} type="date" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label for="Phone">Telefono:</label>
                            <input autoComplete="off"  onChange={this.updateInputPhone} value={this.state.phone} type="text" className="form-control" id="Phone" placeholder="Telefono" required/>
                        </div>
                        <div className="form-group">
                            <label for="city">Ciudad:</label>
                            <input autoComplete="off"  onChange={this.updateInputCity} value={this.state.city} type="text" className="form-control" id="city" placeholder="Ciudad" required/>
                        </div>
                        <div className="form-group">
                            <label for="address">Direccion:</label>
                            <input autoComplete="off"  onChange={this.updateInputAddress} value={this.state.address} type="text" className="form-control" id="address" placeholder="Direccion" required/>
                        </div>
                        <div className="form-group">
                            <label for="user">Usuario:</label>
                            <input autoComplete="off"  onChange={this.updateInputUser} value={this.state.userEdit} type="text" className="form-control" id="user" placeholder="Usuario" required/>
                        </div>
                        <div className="form-group">
                            <label for="antiguePassword">Contraseña actual</label>
                            <input autoComplete="off"  onChange={this.actualicePassword} type="password" className="form-control" id="antiguePassword" placeholder="Contraseña actual"/>
                            <label
                            style= {this.state.valid?{color:this.state.coloValid}:{color:this.state.colorInvalid}}
                            >{this.state.valid?'Valido':'Invalido la contraseña no se guardara'}</label>
                        </div>
                        <div className="form-group">
                            <label for="password">Nueva Contraseña:</label>
                            <input  autoComplete="off" onChange={this.updateInputNewPassword} type="password" className="form-control" id="password" placeholder="Nueva contraseña"/>
                        </div>
                        <button onClick={localStorage.setItem("Numero", "1"),()=> alert("Se edito con exito")} id="x" className="btn btn-primary btn-lg">Aceptar</button>
                        <Link onClick={localStorage.setItem("Numero", "1")} to="/biblioteca/Main/view-Users" className="btn btn-primary btn-lg">Cancelar</Link>
                    </form>
                </div>
                <div className="col-lg-3"></div>
            </div>
        )
    }

    exists(){
        return(
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <form action='/biblioteca/Main'>
                        <h1 className="text-center" >Editar Datos</h1>
                        <div className="form-group">
                            <label for="firtsName">Nombre completo:</label>
                            <input autoComplete="off"  value={this.state.nameComplet} onChange={this.handleChange} type="text" className="form-control" id="firtsName" placeholder="Nombre Completo" required />
                        </div>
                        <div className="form-group">
                            <label for="ci">Carnet de identidad:</label>
                            <input onChange={this.updateInputCi} value={this.state.ci} type="text" className="form-control" id="ci" placeholder="Carnet de Identidad" required />
                        </div>
                        <div className="form-group">
                            <label>Fecha nacimiento:</label>
                            <input autoComplete="off"  onChange={this.updateInputNac} value={this.state.dateNac} type="date" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label for="Phone">Telefono:</label>
                            <input autoComplete="off"  onChange={this.updateInputPhone} value={this.state.phone} type="text" className="form-control" id="Phone" placeholder="Telefono" required/>
                        </div>
                        <div className="form-group">
                            <label for="city">Ciudad:</label>
                            <input autoComplete="off"  onChange={this.updateInputCity} value={this.state.city} type="text" className="form-control" id="city" placeholder="Ciudad" required/>
                        </div>
                        <div className="form-group">
                            <label for="address">Direccion:</label>
                            <input autoComplete="off"  onChange={this.updateInputAddress} value={this.state.address} type="text" className="form-control" id="address" placeholder="Direccion" required/>
                        </div>
                        <div className="form-group">
                            <label for="user">Usuario:</label>
                            <input autoComplete="off"  onChange={this.updateInputUser} value={this.state.user} type="text" className="form-control" id="user" placeholder="Usuario" required disabled/>
                        </div>
                        <div className="form-group">
                            <label for="antiguePassword">Contraseña actual</label>
                            <input autoComplete="off"  onChange={this.actualicePassword} type="password" className="form-control" id="antiguePassword" placeholder="Contraseña actual"/>
                            <label
                            style= {this.state.valid?{color:this.state.coloValid}:{color:this.state.colorInvalid}}
                            >{this.state.valid?'Valido':'Invalido la contraseña no se guardara'}</label>
                        </div>
                        <div className="form-group">
                            <label for="password">Nueva Contraseña:</label>
                            <input  autoComplete="off" onChange={this.updateInputNewPassword} type="password" className="form-control" id="password" placeholder="Nueva contraseña"/>
                        </div>
                        <button onClick={localStorage.setItem("Numero", "1"),()=> alert("Se edito con exito")} id="x" className="btn btn-primary btn-lg">Aceptar</button>
                        <Link onClick={localStorage.setItem("Numero", "1")} to="/biblioteca/Main" className="btn btn-primary btn-lg">Cancelar</Link>
                    </form>
                </div>
                <div className="col-lg-3"></div>
            </div>
        )
    }

    render(){
        return(
            <div>
                {this.state.numero==="1"?
                    this.exists()
                    :
                    this.state.numero==="2"?
                        this.exitsEditUser()
                        :
                        this.noExists()
                }
                {/*this.state.user?this.exists():this.noExists()*/}
            </div>
        )
    }
}