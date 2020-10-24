import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';

const Chat = () => {

    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        db.collection('rooms').doc(roomId).onSnapshot(snapshot => setRoomName(snapshot.data().name))

        db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())))

    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const sendMessage = e => {
        e.preventDefault();

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("");
    }

    console.log(messages);
    return (
        <div className="chat">
            <div className="cheat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}></Avatar>
                <div className="cheat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        Laste seen{" "}
                        {
                            new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
                        }
                    </p>
                </div>
                <div className="cheat_headerRight">
                    <IconButton>
                        <DonutLargeIcon></DonutLargeIcon>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon></AttachFileIcon>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon></MoreVertIcon>
                    </IconButton>
                </div>
            </div>
            <div className="cheat_body">
                {
                    messages.map(message => (
                        <p className={`cheat_message ${message.name === user.displayName && "chat_receiever"}`}>
                            <span className="chat_name">{message.name}</span>
                            {message.message}
                            <span className="chat_timestamp">
                                {new Date(message.timestamp?.toDate()).toUTCString()}
                            </span>
                        </p>
                    ))
                }
            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon></InsertEmoticonIcon>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type message" type="text"></input>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon></MicIcon>
            </div>
        </div>
    );
};

export default Chat;