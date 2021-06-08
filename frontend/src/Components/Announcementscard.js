import React from 'react'

function Announcementscard(props) {
    return (
        <div className="announcement-card">
            <div className="title-ann">{props.title}</div>
            <div className="content-ann">{props.content}</div>
        </div>
    )
}

export default Announcementscard
