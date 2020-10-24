import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import './Sidebar.css';
import SidebarChats from './SidebarChats';
import db from './firebase';
import { useStateValue } from './StateProvider';

const Sidebar = () => {

    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {

        const unsubscribe = db.collection("rooms").onSnapshot(snapshot => setRooms(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
        ))
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}></Avatar>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon></DonutLargeIcon>
                    </IconButton>
                    <IconButton>
                        <ChatIcon></ChatIcon>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon></MoreVertIcon>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlinedIcon></SearchOutlinedIcon>
                    <input type="text" placeholder="Search or start new chat" name="" id="" />
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChats addNewChat></SidebarChats>
                {
                    rooms.map(room => <SidebarChats name={room.data.name} key={room.id} id={room.id}></SidebarChats>)
                }
            </div>
        </div>
    );
};

export default Sidebar;