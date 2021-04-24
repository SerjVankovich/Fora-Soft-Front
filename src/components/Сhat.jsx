import React from 'react';
import {withRouter} from 'react-router-dom';
import './Chat.css'
import OutgoingMessage from "./OutgoingMessage";
import IncomingMessage from "./IncomingMessage";
import CONSTANTS from "../utils/constants";


class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chat: null,
            buttonActive: false
        };
        this.checkUser = this.checkUser.bind(this);
        this.subscribeOnSocket = this.subscribeOnSocket.bind(this);

        this.checkUser();
        this.subscribeOnSocket();

        this.inputRef = React.createRef();
    }

    checkUser() {
        if (!localStorage.getItem('nickname')) {
            this.props.history.push({
                pathname: '/',
                state: this.props.match.params.chatName
            });
        }
    }

    subscribeOnSocket() {
        const {socket} = this.props;
        const {chatName} = this.props.match.params;

        socket.on(`get message${chatName}`, message => {
            const {chat} = this.state;
            if (!chat) {
                return
            }
            chat.messages.push(message);
            this.setState({chat: chat});
        });

        socket.on(`new member${chatName}`, member => {
            const {chat} = this.state;
            if (!chat) {
                return
            }
            chat.users.push(member.name);
            this.setState({chat: chat})
        });
    }

    componentDidMount() {
        const {socket} = this.props;
        const {chatName} = this.props.match.params;
        const nickname = localStorage.getItem('nickname');
        fetch(`${CONSTANTS.API}/chats/${chatName}`)
            .then(res => res.ok ? res.json() : Promise.reject())
            .then(body => {
                if (nickname) {
                    if (!body.users.some(user => user === nickname)) {
                        socket.emit('new member', {
                            name: nickname,
                            chat: chatName
                        })
                    }
                }
                this.setState({chat: body});
            })
            .catch(() => alert('something went wrong((('));


    }

    render() {
        const {chat, buttonActive} = this.state;
        const {socket} = this.props;
        return (

            <div className="container">
                <h3 className=" text-center">Messaging</h3>
                <div className="messaging">
                    <div className="inbox_msg">
                        <div className="mesgs">

                            <div className="msg_history">
                                {
                                    chat ? chat.messages.map((message, i) =>
                                        message.user === localStorage.getItem('nickname')
                                            ?
                                            <OutgoingMessage key={i} message={message}/>
                                            :
                                            <IncomingMessage key={i} message={message}/>
                                    ) : null
                                }


                            </div>
                            <div className="type_msg">
                                <div className="input_msg_write">
                                    <input type="text" ref={this.inputRef}
                                           onChange={e => e.target.value ? this.setState({buttonActive: true}) : this.setState({buttonActive: false})}
                                           className="write_msg"
                                           placeholder="Type a message"/>
                                    <button className={buttonActive
                                        ?
                                        "btn btn-primary btn-sm pull-right"
                                        :
                                        "btn btn-secondary btn-sm pull-right"
                                    } disabled={!buttonActive} type="button" onClick={() => {
                                        socket.emit('get message', {
                                            text: this.inputRef.current.value,
                                            user: localStorage.getItem('nickname'),
                                            date: new Date(),
                                            chat: chat.name
                                        });
                                        this.inputRef.current.value = '';
                                        this.setState({buttonActive: false})
                                    }}>Send
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className="users">
                            <h1>Chat members:</h1>
                            {
                                chat ? chat.users.map((user, i) => (
                                    <li key={i}>{user}</li>
                                )) : null
                            }
                        </div>

                    </div>
                </div>
            </div>

        )
    }


}

export default withRouter(Chat);
