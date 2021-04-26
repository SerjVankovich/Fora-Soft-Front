import React from 'react'
import formatDate from "../utils/formatDate";

const OutgoingMessage = ({message}) => (
    <div className="outgoing_msg">
        <div className="sent_msg">
            <p>{message.text}</p>
            <span className="time_date">{formatDate(message.date)}</span></div>
    </div>
);

export default OutgoingMessage
