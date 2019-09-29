import React from 'react';
import firebase from 'firebase';
import { myFirestore } from '../Configure/firebase';
import { Link } from "react-router-dom";
import './login.css'

export class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:'',
            pass: '',
            usuarios: {},
            contraseñas: {}
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.loginForAccount = this.loginForAccount.bind(this);
    }

    handleChangeUser=e=>{
        this.setState({
            user: e.target.value
        })
    }

    handleChangePass=e=>{
        this.setState({
            pass: e.target.value
        })
    }

    componentWilldMount(){
        firebase.auth().onAuthStateChanged(user =>{
            if(this.state.user){
                this.setState({ user: user })
            }else{
                this.setState({ user: null })
            }
        })
    }
    
    componentDidMount(){
        myFirestore.collection('users').get()
        .then(doc=>
            this.setState({
                usuarios: doc.docs.map(elements=>elements.id)
            })
            /*doc.docs.map(elements=>
                this.setState({
                    usuarios: [elements.id]
                })*/
            //)
        )
        setTimeout(this.getContraseñas,1000)
        setTimeout(this.consola,1500)
    }

    consola=()=>{
        console.log(this.state.usuarios)
        console.log(this.state.contraseñas)
    }
    
    getContraseñas=()=>{
        let cont = 0;
        let pass=[];
        while(cont<this.state.usuarios.length){
            myFirestore.collection('users').doc(`${this.state.usuarios[cont]}`).get()
            .then(doc=>
                pass.push(doc.data().password)
            )
            cont++;
        }
        this.setState({
            contraseñas: pass
        })
    }

    login(){    
        let provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
        .then(result => this.writeData(result.user.uid, result.user.displayName, result.user.email, result.user.photoURL))
        .catch(error=> alert(`Error: ${error.code}: ${error.message}`))
    }

    logout(){
        /*firebase.auth().signOut()
        .then(result=>alert(`Cerro sesion`))
        .catch(error=>alert(`Error: ${error.code}: ${error.message}`))*/
        this.setState({
            user:'',
            pass: '',
            flag: 0,
            exist: 0,
        })
    }

    loginForAccount=()=>{
        let cont = 0;
        let flag = 0;
        while(cont < this.state.usuarios.length){
            console.log(cont)
            if(this.state.usuarios[cont]===this.state.user){
                if(this.state.contraseñas[cont]===this.state.pass){
                    flag = 1
                    console.log(flag+"cambio")
                    break
                }
            }
            cont ++
        }
        console.log(flag+"bandera")
        if(flag===1){
            alert("El usuario existe")
        }else{
            alert("usuarios incorrecto")
        }
    }

    /*getUserId=()=>{ //Verifica la base de datos si existe el usuario
        console.log("111")
        myFirestore.collection('users').get()
        .then(doc=>doc.docs
            .map(key=>   //  key.id
        key.id===this.state.user?this.setState({flag: 1}):''))  // Realiza la busqueda del "usuario"
        .then(this.getUserPass) //  -----   Metodo validar contraseña----
        .then(this.initialize)
    }
    
    getUserPass=()=>{
        console.log("222")
        console.log("bandera "+this.state.flag)
        if(this.state.flag===1){     //  Valida la contraseña
        myFirestore.collection('users').doc(`${this.state.user}`).get()
        .then(doc=>doc.data().password===this.state.pass?this.setState({exist: 1}):'')//console.log(doc.data().password))
        }else{
            this.setState({exist: false});
            console.log("Usuario no existe")
        }
    }

    initialize=()=>{
        console.log("333")
        console.log("existe "+this.state.exist)
        if(this.state.exist===1){
            console.log("Inicio Session")
        }else{
            console.log("Datos incorrectos")
        }
    }*/

    writeData(userId, name, email, imageUrl){
        localStorage.setItem("id", userId);
        localStorage.setItem("emailUser", email);
        console.log(imageUrl);
        myFirestore.collection('users').doc(userId)
        .set({
            id: userId,
            nameUser: name,
            emailUser: email,
            pictureUser: imageUrl
        })
    }

    render(){
        return(
            <div class="row">                
                <div class="col-lg-4"></div>
                <div class="col-lg-4">
                    <div class="main-login">
                        <form class="form">
                            <h1 class="text-center">Welcome</h1>	
                            <label>User:</label>
                            <input 
                                type="text" 
                                autoComplete="off" 
                                value={this.state.user}
                                onChange={this.handleChangeUser}
                                class="form-control" 
                                placeholder="User" 
                                required/>
                            <label>Password:</label>
                            <input 
                                type="password" 
                                value={this.state.pass}
                                onChange={this.handleChangePass}
                                class="form-control" 
                                placeholder="Password" 
                                required/>
                            <br/>
                            <Link class="btn btn-primary btn-lg btn-block" onClick={this.loginForAccount} type="submit">log in</Link>
                            <Link class="btn loginBtn loginBtn--google" id="login" onClick={this.login}>
                                Sign in with Google
                            </Link>
                            <Link onClick={this.logout}>Logout</Link>
                        </form>
                    </div>
                </div>
                <div class="col-lg-4"></div>
            </div>
        )
    }
}

