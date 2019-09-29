import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {Login} from './Components/Login/Login';

const Routes = () =>{
    return(
        <Switch>
            <div class="container-fluid">
                <Route path='' component={Login} />
            </div>
        </Switch>
    )
}

export default Routes