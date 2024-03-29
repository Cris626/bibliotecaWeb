import React from 'react';
import firebase from 'firebase';
import { Link } from "react-router-dom";


export class Main extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user: localStorage.getItem('User')            
        }
        this.logout = this.logout.bind(this);
        this.exists = this.exists.bind(this);
        this.noExists = this.noExists.bind(this);
    }
    
    logout(){
        localStorage.clear();
        //localStorage.setItem("contBloq",0)
    }

    noExists(){
        return(
            <h1>Page not found</h1>
        )
    }

    exists(){
        return(
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <form style={{paddingBottom: "80px"}}>
                        <h1 className="text-center" >Menu Principal</h1>
                        <h2 className="text-center" >Bienvenido {this.state.user}</h2>
                        <Link to="/biblioteca/Main/user-edit" className="btn btn-primary btn-lg btn-block">Editar Datos</Link>
                        <Link to="/biblioteca/Main/books" className="btn btn-primary btn-lg btn-block">Libros</Link>
                        <Link id="x" to='/' className="btn btn-primary btn-lg btn-block" onClick={this.logout}>Cerrar Session</Link>   
                    </form>
                </div>
                <div className="col-lg-3"></div>
            </div>
        )
    }

    super(){
        return(
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <form style={{paddingBottom: "80px"}}>
                        <h1 className="text-center" >Menu Principal AdminSuper</h1>
                        <Link to="/biblioteca/Main/user-edit" className="btn btn-primary btn-lg btn-block">Editar Datos</Link>
                        <Link to='/biblioteca/Main/list-Users' className="btn btn-primary btn-lg btn-block">Lista de Usuarios</Link>
                        <Link to='/biblioteca/Main/books' className="btn btn-primary btn-lg btn-block">Libros</Link>
                        <Link to='/biblioteca/Main/list-reserved' className="btn btn-primary btn-lg btn-block">Reservados</Link>
                        <Link id="x" to='/' className="btn btn-primary btn-lg btn-block" onClick={this.logout}>Cerrar Session</Link>    
                        
                    </form>
                </div>
                <div className="col-lg-3"></div>
            </div>
        )
    }

    render(){
        return (
            <div>
                {this.state.user==="adminSuper"?this.super():this.state.user?this.exists():this.noExists()}
            </div>
        )
    }
}