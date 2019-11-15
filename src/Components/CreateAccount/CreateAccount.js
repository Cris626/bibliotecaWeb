import React from 'react';
import {myFirestore} from '../Configure/firebase';
import { Link } from "react-router-dom";
import './createAccount.css'

export class CreateAccount extends React.Component{
    constructor(props){
        super(props)
        this.state={
            nameComplet: '',
            ci: '',
            dateNac: '',
            phone: '',
            city: '',
            address: '',
            user: '',
            password: '',
            passwordReply: '',
            usuarios: {},
            colorInvalid: '#e41013',
            coloValid: '#008b02',
            validar: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateInputName=e=>{
        this.setState({
            nameComplet: e.target.value
        })
    }
    updateInputCi=e=>{
        this.setState({
            ci: e.target.value
        })
    }
    updateInputNac=e=>{
        this.setState({
            dateNac: e.target.value
        })
    }
    updateInputPhone=e=>{
        this.setState({
            phone: e.target.value
        })
    }
    updateInputCity=e=>{
        this.setState({
            city: e.target.value
        })
    }
    updateInputAddress=e=>{
        this.setState({
            address: e.target.value
        })
    }
    updateInputUser=e=>{
        this.setState({
            user: e.target.value
        })
    }
    updateInputPassword=e=>{
        this.setState({
            password: e.target.value
        })
        console.log(this.state.password)
    }
    updateInputPasswordReply=e=>{
        this.setState({
            passwordReply: e.target.value
        })
        console.log(this.state.passwordReply)
    } 

    componentDidMount(){
        myFirestore.collection('users').get()
        .then(doc=>
            this.setState({
                usuarios: doc.docs.map(elements=>elements.id)
            })
        )
        setTimeout(this.consola,2000)
    }

    consola=()=>{
        console.log(this.state.usuarios)
    }

    handleSubmit=e=>{
        let cont = 0;
        let flag = 0;
        console.log(this.state.usuarios)
        while(cont < this.state.usuarios.length){
            if(this.state.user===this.state.usuarios[cont]){
                console.log("XDXD")
                flag = 1;
                break;
            }
            cont ++;
            console.log(cont)
        }
        console.log(flag)
        if(this.state.password!==this.state.passwordReply){
            e.preventDefault();
            alert("Verifique que la contraseña coincida")
        }else if(flag===0){
            myFirestore.collection("users").doc(`${this.state.user}`)
            .set({
               nameComplet: this.state.nameComplet,
               ci: this.state.ci,
               dateNac: this.state.dateNac,
               phone: this.state.phone,
               city: this.state.city,
               address: this.state.address,
               user: this.state.user,
               password: this.state.password,
               bloq: false
            });
            alert("Registro Completo")
        }else{
            e.preventDefault();
            alert("Usuario ya existente")
        }
    }

    soloNumeros(e){
        var key = e.charCode;
        return key >= 48 && key <= 57;
    }

    render(){
        return (
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <form onSubmit={this.handleSubmit} className="formRegister">
                        <h1>Registrar Usuario</h1>
                        <div className="form-group">
                            <label for="firtsName">Nombre completo:</label>
                            <input onChange={this.updateInputName} value={this.state.nameComplet} type="text" className="form-control" id="firtsName" name="firtsName" placeholder="Nombre Completo" required autoComplete="off"/>
                        </div>
                        <div className="form-group">
                            <label for="ci">Carnet de identidad:</label>
                            <input onChange={this.updateInputCi} value={this.state.ci} type="text" className="form-control" id="ci" placeholder="Carnet de Identidad" autoComplete="off" required/>
                        </div>
                        <div className="form-group">
                            <label>Fecha nacimiento:</label>
                            <input onChange={this.updateInputNac} value={this.state.dateNac} type="date" max="2019-10-01" min="1940-01-01" className="form-control" autoComplete="off" required/>
                        </div>
                        <div className="form-group">
                            <label for="Phone">Telefono:</label>
                            <input maxlength="8" onChange={this.updateInputPhone} value={this.state.phone} type="text" className="form-control" id="Phone" placeholder="Telefono" autoComplete="off" required/>
                        </div>
                        <div className="form-group">
                            <label for="city">Ciudad:</label>
                            <input onChange={this.updateInputCity} value={this.state.city} type="text" className="form-control" id="city" placeholder="Ciudad" autoComplete="off" required/>
                        </div>
                        <div className="form-group">
                            <label for="address">Direccion:</label>
                            <input onChange={this.updateInputAddress} value={this.state.address} type="text" className="form-control" id="address" placeholder="Direccion" autoComplete="off" required/>
                        </div>
                        <div className="form-group">
                            <label for="user">Usuario:</label>
                            <input onChange={this.updateInputUser} value={this.state.user} type="text" className="form-control" id="user" placeholder="Usuario" autoComplete="off" required/>
                        </div>
                        <div className="form-group">
                            <label for="password">Contraseña:</label>
                            <input onChange={this.updateInputPassword} value={this.state.password} type="password" className="form-control" id="password" placeholder="Contraseña" required/>
                        </div>
                        <div className="form-group">
                            <label for="repeat_password">Repetir Contraseña:</label>
                            <input onChange={this.updateInputPasswordReply} value={this.state.passwordReply} type="password" className="form-control" id="repeat_password" placeholder="Repetir Contraseña" required/>
                            <label 
                            style= {this.state.password!==this.state.passwordReply?{color:this.state.colorInvalid}:{color:this.state.coloValid}} 
                            id="verification">
                                {this.state.password!==this.state.passwordReply?'La contraseña no coincide':'Valido'}
                            </label>
                        </div>
                        <button id="x" className="btn btn-primary btn-lg">Registrar</button>
                        <Link to="/" className="btn btn-primary btn-lg">Cancelar</Link>
                    </form>
                </div>
                <div className="col-lg-3"></div>
            </div>
        )
    }
}