import React from 'react'
import './SidebarChat.css';
import { Avatar, IconButton } from '@material-ui/core';


function SidebarChat({ name, info }) {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>{info}</p>
            </div>
        </div>
    )
}

export default SidebarChat
