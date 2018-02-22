import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Components
import App from './Components/App';
import User from './Components/User';
import Nav from './Components/Nav';

class Router extends Component {
    render() {
        return(
            <BrowserRouter>
                <div>
                    <Nav />
                    <Route exact path="/" component={App} /> 
                    <Route path="/user" component={User} />
                </div>
            </BrowserRouter>
        );
    }
}

export default Router;
