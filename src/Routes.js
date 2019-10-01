import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {Login} from './Components/Login/Login';
import {CreateAccount} from './Components/CreateAccount/CreateAccount';
import {Main} from './Components/Main/Main';

const Routes = () =>{
    return(
        <Switch>
            <div class="container-fluid">
                <Route exact path='/biblioteca' component={Login} />
                <Route exact path='/biblioteca/create-account' component={CreateAccount} />
                <Route exact path='/biblioteca/Main' component={Main} />
            </div>
        </Switch>
    )
}

export default Routes