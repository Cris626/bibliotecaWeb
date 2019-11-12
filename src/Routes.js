import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {Login} from './Components/Login/Login';
import {CreateAccount} from './Components/CreateAccount/CreateAccount';
import {Main} from './Components/Main/Main';
import {UserEdit} from './Components/UserEdit/UserEdit';
import {ListUsers} from './Components/ListUsers/ListUsers';
//import {useLogin} from './Components/Login/useLogin';
import {useListBooks} from './Components/books/listBooks';
import {useView} from './Components/UserView/UserView';
import { useRegisterBooks } from "./Components/books/registerBooks";
import { useEditBooks } from "./Components/books/editBooks";

const Routes = () =>{
    return(
        <Switch>
            <div class="container-fluid">
                <Route exact path='/biblioteca' component={Login} />
                <Route exact path='/biblioteca/create-account' component={CreateAccount} />
                <Route exact path='/biblioteca/Main' component={Main} />
                <Route exact path='/biblioteca/Main/user-edit' component={UserEdit} />
                <Route exact path='/biblioteca/Main/list-Users' component={ListUsers} />
                <Route exact path='/biblioteca/Main/view-Users' component={useView} />  {/* */}
                <Route exact path='/biblioteca/Main/books' component={useListBooks} />
                <Route exact path='/biblioteca/Main/books/Register' component={useRegisterBooks} />
                <Route exact path='/biblioteca/Main/books/Edit' component={useEditBooks} />
                {/*<Route exact path='/' component={useLogin} />*/}
            </div>
        </Switch>
    )
}

export default Routes