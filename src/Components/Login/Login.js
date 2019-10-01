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
            showPass: 'password',
            usuarios: {},
            contraseñas: {},
            bloqueado: {},
            contBloq: 0,
            test: false,
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.loginForAccount = this.loginForAccount.bind(this);
        this.myFunction = this.myFunction.bind(this);
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
        )
        setTimeout(this.getContraseñas,1500)
        setTimeout(this.getBloqueados,1500)
        setTimeout(this.consola,2000)
    }

    consola=()=>{
        console.log(this.state.usuarios)
        console.log(this.state.contraseñas)
        console.log(this.state.bloqueado)
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

    getBloqueados=()=>{
        let cont = 0;
        let bloq = [];
        while(cont<this.state.usuarios.length){
            myFirestore.collection('users').doc(`${this.state.usuarios[cont]}`).get()
            .then(doc=>
                bloq.push(doc.data().bloq)
            )
            cont++;
        }
        this.setState({
            bloqueado: bloq
        })
    }

    login(){    
        let provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
        .then(result => this.writeData(result.user.uid, result.user.displayName, result.user.email, result.user.photoURL))
        .catch(error=> alert(`Error: ${error.code}: ${error.message}`))
    }

    logout(){
        firebase.auth().signOut()
        .then(result=>alert(`Cerro sesion`))
        .catch(error=>alert(`Error: ${error.code}: ${error.message}`))
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
            if(this.state.usuarios[cont]===this.state.user){
                //
                if(this.state.bloqueado[cont]){
                    alert("Usuario Bloqueado: Contacte con el administrador")
                }else{
                    if(this.state.contraseñas[cont]===this.state.pass){
                        flag = 1
                        //console.log(flag+"cambio")
                        break
                    }else{
                        if(this.state.contBloq===3){
                            alert(`El usuario ${this.state.user} fue bloqueado`)
                            //  Bloquear al usuario
                            myFirestore.collection("users").doc(`${this.state.user}`)
                            .update({
                                bloq: true
                            }); 
                            setTimeout(this.getBloqueados,1500)
                            break
                        }else{
                            this.setState({contBloq: this.state.contBloq + 1 })
                        }
                    }
                }
                //
            }
            cont ++
        }
        if(flag===1){
            localStorage.setItem("User",`${this.state.user}`);
            this.setState({test: true})
            console.log(this.state.login)
            alert("Usuario Correcto")
        }else{
            alert("usuarios incorrecto")
            console.log(this.state.login)
        }
    }

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

    myFunction(){
        if (this.state.showPass === "password") {
            this.setState({showPass:'text'})
        } else {
            this.setState({showPass:'password'})
        }
    }

    render(){
        return(
            <div className="row">                
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="main-login">
                        <form className="form" onSubmit={this.loginForAccount} action={this.state.test?'/biblioteca/Main':'/biblioteca'}>
                            <h1 className="text-center">Welcome</h1>	
                            <label id="valForm">User:</label>
                            <input 
                                type="text" 
                                autoComplete="off" 
                                value={this.state.user}
                                onChange={this.handleChangeUser}
                                className="form-control" 
                                placeholder="User" 
                                required/>
                            <label id="valForm">Password:</label>
                            <input 
                                type={`${this.state.showPass}`} 
                                value={this.state.pass}
                                onChange={this.handleChangePass}
                                className="form-control pwd" 
                                placeholder="Password" 
                                id="myInput"
                                required/>
                            <input 
                                type="checkbox" 
                                onClick={this.myFunction} 
                                id="showPassword"/>
                            <label for="showPassword" id="show">Show Password</label>
                            <button href={`${this.state.login}`} className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                            <Link className="btn loginBtn loginBtn--google" id="login" onClick={this.login}>
                                Sign in with Google
                            </Link>
                            <Link onClick={this.logout}>Logout</Link>
                            <Link to="/biblioteca/create-account">Create account</Link>
                        </form>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        )
    }
}

