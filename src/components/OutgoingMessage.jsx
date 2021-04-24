import React from 'react'

const OutgoingMessage = ({message}) => (
    <div className="outgoing_msg">
        <div className="sent_msg">
            <p>{message.text}</p>
            <span className="time_date">{message.date.toString("MMMM yyyy")}</span></div>
    </div>
);

export default OutgoingMessage
