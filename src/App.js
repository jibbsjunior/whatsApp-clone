import React from 'react';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Chat from './Chat/Chat';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {
  const [message, setMessage] = React.useState([]);
  React.useEffect(() => {
    axios.get('/api/v1/messages/sync').then((res) => {
      setMessage(res.data);
    });
  },[])


  React.useEffect(() => {
    const pusher = new Pusher('04a426db3a3f28d48574', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('message');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessage([...message, newMessage])
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[message])
  console.log(message);
  return (
    <div className="app">
    <div className="app__body">
      <Sidebar />
      <Chat message={message} />
    </div>
    </div>
  );
}

export default App;
