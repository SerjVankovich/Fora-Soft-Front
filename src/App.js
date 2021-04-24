import {BrowserRouter, Route, Switch} from 'react-router-dom'
import HomePage from './components/HomePage'
import Chat from './components/Сhat'
import './App.css';
import openSocket from 'socket.io-client';
import React from "react";
import CONSTANTS from "./utils/constants";

const socket = openSocket(CONSTANTS.API);

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"} component={(props) => <HomePage {...props} socket={socket}/>} exact/>
                <Route path={"/chat/:chatName"} component={(props) => <Chat {...props} socket={socket}/>} exact/>
            </Switch>
        </BrowserRouter>

    );
}

export default App;
