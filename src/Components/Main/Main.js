import React from 'react';
import firebase from 'firebase';
import { Link } from "react-router-dom";

export class Main extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user: localStorage.getItem('User')
        }
        this.logout = this.logout.bind(this)
    }

    logout(){
        firebase.auth().signOut()
        .then(result=>alert(`Cerro sesion`))
        .catch(error=>alert(`Error: ${error.code}: ${error.message}`))
        this.setState({
            user:'',
        })
        localStorage.clear();
    }

    render(){
        return (
            <div>
                <h1>Menu Principal</h1>
                <h2>Welcome {this.state.user}</h2>
                <Link to='/biblioteca' onClick={this.logout}>Cerrar Session</Link>
            </div>
            
        )
    }
}