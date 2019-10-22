import React from 'react';
import firebase from 'firebase';

export class ListUsers extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <form>
                        <h1 className="text-center" >Listar Usuarios</h1>
                    </form>
                </div>
                <div className="col-lg-3"></div>
            </div>
        )
    }
}