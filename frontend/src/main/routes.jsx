import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Todo from '../todo/todo'
import About from '../about/about'


export default props => (
    <Router history={hashHistory}>
        <Route path='/todos' component={Todo}></Route>
        <Route path='/about' component={About}></Route>
        {/* qualquer outro endereço encaminha para a ./todos */}
        <Redirect from='*' to='/todos'></Redirect> 
    </Router>
)