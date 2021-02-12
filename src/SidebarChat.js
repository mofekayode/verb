import React,{useState, useEffect} from 'react'
import './SidebarChat.css'
import {Avatar,IconButton} from "@material-ui/core"
import db from './firebase'
import {Link} from 'react-router-dom'
function SidebarChat({addNewChat, id,name}) {
    const [seed, setSeed] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
       
          
               db.collection('rooms').doc(id).collection('messages')
               .orderBy('timestamp','desc').onSnapshot(snapshot=>(
                   setMessages(snapshot.docs.map(doc=>doc.data()))
               ))
        
      }, [id])
 
    useEffect(() => {
       setSeed(Math.floor(Math.random()*5000))
    }, [])
const createChat=()=>{
 const roomName = prompt('please enter name for chat')
 if (roomName){
    db.collection('rooms').add({
        name: roomName,
        email:roomName+'@gmail.com',
        number:"857"+Math.floor(Math.random() * 10000000)
    })
 }
}
    return !addNewChat?(
        <Link to={`/rooms/${id}`}>
        <div className='sidebarChat'>
           <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
           <div  className='sidebarChat-info'>
                <h2>{name}</h2>
                <p className=''>{messages[0]&&messages[0].name+ ' : ' }{messages[0]?.message}</p>
           </div>
        </div>
        </Link>
    )
    :(
        <div onClick={createChat} className='sidebarChat'>
             <h2>Add New Chat</h2>

     </div>
    )
}

export default SidebarChat
