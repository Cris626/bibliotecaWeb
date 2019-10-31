import React from 'react';
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
            contBloq: {},
            test: false,
        }
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

    componentDidMount(){
        myFirestore.collection('users').get()
        .then(doc=>
            this.setState({
                usuarios: doc.docs.map(elements=>elements.id)
            })
        )
        setTimeout(this.getContraseñas,1500);
        setTimeout(this.getBloqueados,1500);
        setTimeout(this.getContBloq,1500)
        setTimeout(this.consola,2000);
        console.log(this.state.contBloq)
    }

    consola=()=>{
        console.log(this.state.usuarios)
        console.log(this.state.contraseñas)
        console.log(this.state.bloqueado)
        console.log(this.state.contBloq)
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

    getContBloq=()=>{
        let cont = 0;
        let conBloq = [];
        while(cont<this.state.usuarios.length){
            myFirestore.collection('users').doc(`${this.state.usuarios[cont]}`).get()
            .then(doc=>
                conBloq.push(doc.data().contBloq)
            )
            cont++;
        }
        this.setState({
            contBloq: conBloq
        })
    }

    loginForAccount=async()=>{
        let cont = 0;
        let flag = 0;
        let contador;
        const db = await myFirestore.collection('users').doc(`${this.state.user}`);
        while(cont < this.state.usuarios.length){
            if(this.state.usuarios[cont]===this.state.user){
                contador = this.state.contBloq[cont]
                if(this.state.bloqueado[cont]){
                    alert("Usuario Bloqueado: Contacte con el administrador")
                }else{
                    if(this.state.contraseñas[cont]===this.state.pass){
                        db.update({
                            contBloq: 0
                        })
                        setTimeout(flag = 1, 1500)
                        console.log("SALIO")
                        break
                    }else{
                        if(contador>2){
                            db.update({
                                bloq: true,
                                contBloq: 0
                            })
                            setTimeout(this.getBloqueados,1500)
                            setTimeout(alert(`El usuario ${this.state.user} fue bloqueado`),2000)
                            break
                        }else{
                            console.log("XXXXXXXXXXXXXX")
                            contador ++;
                            db.update({
                                contBloq: contador
                            })
                            console.log(this.state.user)
                            console.log(contador)
                        }
                    }
                }
            }
            cont ++
        }
        if(flag===1){
            localStorage.setItem("User",`${this.state.user}`);
            localStorage.setItem("Pass",`${this.state.pass}`);
            localStorage.setItem("Numero", "1")
            this.setState({test: true})
            alert("Usuario Correcto")
        }else{
            alert("usuarios incorrecto")
        }
    }

    test(x){
        myFirestore.collection('users').doc(`${this.state.user}`)
        .update({
            contBloq: x
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
                        <h1 className="text-center">Bienvenido</h1>	
                        <label id="valForm">Usuario:</label>
                        <input 
                            type="text" 
                            autoComplete="off" 
                            value={this.state.user}
                            onChange={this.handleChangeUser}
                            className="form-control" 
                            placeholder="Usuario" 
                            required/>
                        <label id="valForm">Contraseña:</label>
                        <input 
                            type={`${this.state.showPass}`} 
                            value={this.state.pass}
                            onChange={this.handleChangePass}
                            className="form-control pwd" 
                            placeholder="Contraseña" 
                            id="myInput"
                            required/>
                        <input 
                            type="checkbox" 
                            onClick={this.myFunction} 
                            id="showPassword"/>
                        <label for="showPassword" className="show">Mostrar contraseña</label>
                        <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                        <Link id="registeer" className="btn btn-primary btn-lg btn-block" to="/biblioteca/create-account">Create account</Link>
                    </form>
                </div>
            </div>
            <div className="col-lg-4"></div>
            </div>
        )
    }
}

