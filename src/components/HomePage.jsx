import React, {useRef} from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import CONSTANTS from "../utils/constants";

const HomePage = (props) => {
    const history = useHistory();
    const nickNameInput = useRef(null);

    const handleInputClick = async () => {
        const name = nickNameInput.current.value;
        if (name === '') {
            return alert("You didn't input your nickname. Please, do it")
        }

        const resGet = await fetch(`${CONSTANTS.API}/chats/getAllChats`);
        const chats = await resGet.json();

        if (!chats.some((chat) => chat.name === `${name}Chat`)) {
            const resAddChat = await fetch(`${CONSTANTS.API}/chats/addChat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    users: [name],
                    messages: [],
                    name: `${name}Chat`
                })
            });
            if (!resAddChat.ok) {
                alert('Something went wrong (((');
                return;
            }
        }
        localStorage.setItem('nickname', name);

        const chatName = props.location.state;
        if (chatName) {
            props.socket.emit('new member', {
                chat: chatName,
                name
            } );

            return history.push(`/chat/${chatName}`)
        }
        history.push(`/chat/${name}Chat`);
    };
    return (<div className="container">
        <div className="row">
            <div className="col-lg-9">
                <h1 style={{textAlign: 'center'}}>Please sign in</h1>
            </div>
        </div>
        <div className="row align-items-center">
            <div className="col-lg-9">
                <div className="form">
                    <input ref={nickNameInput} type="email" className="form-control" id="floatingInput"
                           placeholder="Enter your nickname"/>
                </div>
            </div>
            <div className="col-lg-3">
                <button className="btn btn-md btn-primary" onClick={handleInputClick}>
                    Sign in
                </button>
            </div>
        </div>
    </div>)
};


export default withRouter(HomePage);
