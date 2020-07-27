import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import App from 'pages/App'
import Ligin from 'pages/Login'
import Register from 'pages/Register'
import Cart from 'pages/Cart'
import NotFond from 'pages/NotFound'

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/login" component={Ligin} />
            <Route path="/register" component={Register} />
            <Route path="/cart" component={Cart} />
            <Route component={NotFond} />
        </Switch>
    </BrowserRouter>
);

export default Router;