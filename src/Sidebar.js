import React,{useState, useEffect} from 'react'
import './Sidebar.css'
import {Avatar,IconButton} from "@material-ui/core"
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertICon from '@material-ui/icons/MoreVert'
import {SearchOutlined} from '@material-ui/icons'
import SidebarChat from './SidebarChat';
import{ useStateValue} from './StateProvider'
import db from './firebase'
function Sidebar() {
    const [rooms, setRooms]=useState([])
    const [{user},dispatch]=useStateValue();
    useEffect(()=>{
        // db.collection('rooms').onSnapshot(snapshot=>(
        //     setRooms(snapshot.docs.map(doc=>({
        //         id:doc.id,
        //         data:doc.data(), 
        //     })))
           
        // ))


    db.collection("rooms").where("owner", "==", user.uid)
    .get()
    .then((snapshot) => {
     
            // doc.data() is never undefined for query doc snapshots
            setRooms(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data(), 
            })))
       
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    
    },[])
    console.log(rooms)
    return (
        <div className='sidebar'>
            <div className='sidebar-header'>
                
                <IconButton>
                <Avatar src={user?.photoURL}/>
                </IconButton>
                
                <div className='sidebar-header-right'>
                <IconButton>
                    <DonutLargeIcon/>
                </IconButton>
                <IconButton>
                <ChatIcon/>
                </IconButton>
                <IconButton>
                <MoreVertICon/>
                </IconButton>
                    

                   
                    
               </div>
            </div>
            <div className='sidebar-search'>
            <div className='sidebar-searchContainer'>
            <SearchOutlined/>
                <input placeholder='Search or start new chart 'type='text'/>
            </div>
               
            </div>
            <div className='sidebar-chats'>
                {/* <SidebarChat addNewChat/> */}
               {
                   rooms.map(room=>(
                       <SidebarChat name={room.data.name}key={room.id} id={room.id}/>
                   ))
               }
            </div>
        </div>
    )
}

export default Sidebar
