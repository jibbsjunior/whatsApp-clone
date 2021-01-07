import React from 'react'
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic } from '@material-ui/icons';
import axios from '../axios';


function Chat({ message }) {
    const [input, setInput] = React.useState("");

    const sendMessage = async e => {
        e.preventDefault();

        await axios.post('/api/v1/messages/new', {
            message: input,
            name: "Adebayo",
            timeStamp: "just now",
            received: false
        });
        setInput("");
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src="data:image/jpeg;base64,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" />

                <div className="chat__headerInfo">
                    <h3>M Buhari</h3>
                    <p>Last Seen a minute ago...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
            {message.map((newMessage) => (
                <p className={`chat__message ${newMessage.received && "chat__receiver"}`}>
                <span className="chat__name">{newMessage.name}</span>
                {newMessage.message}    
                <span className="chat__timestamp">
                    {newMessage.timeStamp}
                </span>
                </p>
            ))}
            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input 
                    type="text"
                    placeholder="type a message to start a new chat" 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <button onClick={sendMessage} type="submit">Send</button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat;