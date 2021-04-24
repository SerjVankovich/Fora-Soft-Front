import React from 'react'

const IncomingMessage = ({message}) => (
    <div className="incoming_msg">
        <div className="received_msg">
            <div className="received_withd_msg">
                <span className="time_date">{message.user}</span>
                <p>{message.text}</p>
                <span className="time_date">{message.date.toString()}</span>
            </div>
        </div>
    </div>
);

export default IncomingMessage
