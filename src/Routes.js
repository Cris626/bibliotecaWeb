import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {Login} from './Components/Login/Login';
import {CreateAccount} from './Components/CreateAccount/CreateAccount';
import {Main} from './Components/Main/Main';
import {UserEdit} from './Components/UserEdit/UserEdit';
import {ListUsers} from './Components/ListUsers/ListUsers';
//import {useLogin} from './Components/Login/useLogin';
import {useView} from './Components/UserView/UserView';

const Routes = () =>{
    return(
        <Switch>
            <div class="container-fluid">
                <Route exact path='/biblioteca' component={Login} />
                <Route exact path='/biblioteca/create-account' component={CreateAccount} />
                <Route exact path='/biblioteca/Main' component={Main} />
                <Route exact path='/biblioteca/Main/user-edit' component={UserEdit} />
                <Route exact path='/biblioteca/Main/list-Users' component={ListUsers} />
                <Route exact path='/biblioteca/Main/view-Users' component={useView}/>
                {/*<Route exact path='/' component={useLogin} />*/}
            </div>
        </Switch>
    )
}

export default Routes