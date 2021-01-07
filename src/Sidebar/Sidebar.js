import React from 'react'
import './Sidebar.css';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from '../SidebarChat/SidebarChat';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src="data:image/jpeg;base64,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" />
                <div className="sidebar__headerRight">
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="search or start a new chat" />
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat name="End Sarz" info="Please end police brutality" />
                <SidebarChat name="Police Reform" info="Reform the police system" />
                <SidebarChat name="Lekki Massacre" info="Who order lekki shootings?" />
            </div>
        </div>
    )
}

export default Sidebar