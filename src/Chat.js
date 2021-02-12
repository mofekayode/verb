
import React,{useState, useEffect} from 'react'
import {Avatar,IconButton} from "@material-ui/core"
import {AttachFile,MoreVert,SearchOutlined, InsertEmoticon,Mic} from "@material-ui/icons"
import {useParams} from 'react-router-dom'
import db from './firebase'
import './Chat.css'
import firebase from 'firebase'
import{ useStateValue} from './StateProvider'
import Picker from 'emoji-picker-react';

function Chat() {
    const [seed, setSeed] = useState('')
    const [input, setInput] = useState([])
    const {roomId} =useParams()
    const [roomName, setRoomName] = useState([])
    const [messages, setMessages] = useState([])
    const [{user},dispatch]=useStateValue();
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [clicked, setclicked] = useState(false);
    const [messcount, setmesscount] = useState(0);
    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
      setInput([input+" "+emojiObject.emoji].toString());
      setclicked(false)
      console.log(emojiObject.emoji)
    };
    const openMoji = () => {
        setclicked(!clicked)
    }
    useEffect(() => {
       if (roomId){


           db.collection('rooms').doc(roomId)
           .onSnapshot(snapshot=>(
               setRoomName(snapshot.data())
               ))
              db.collection('rooms').doc(roomId).collection('messages')
              .orderBy('timestamp','asc').onSnapshot(snapshot=>(
                  setMessages(snapshot.docs.map(doc=>doc.data()))
              ))
              db.collection('graph').doc(user.uid).collection(user.uid)
              .orderBy('timestamp','asc').onSnapshot(snapshot=>(
                setmesscount(snapshot.docs.length)
              ))
       }
     }, [roomId])

     
    useEffect(() => {
       setSeed(Math.floor(Math.random()*5000))
    }, [roomId])
    const sendMessage=(e)=>{
        e.preventDefault()
        let d = new Date();
        let hours = d.getHours();
        let mins = d.getMinutes();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()

        })
        db.collection('graph').doc(user.uid).collection(user.uid).add({
            count:messcount+1,
            hours:hours,
            mins:mins,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()

        })
        setTimeout(() => {
            db.collection('rooms').doc(roomId).collection('messages').add({
                message:input,
                name:roomName.name,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
        
            })
        }, 2000);
        setInput('')
    }
    return (
        <div className='chat'>
         <div className='chat-header'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className='chat-header-info'>
            <h2>{roomName.owner==user.uid?roomName.name:'.'+' ' }<span className='pill'> {roomName.owner==user.uid?roomName.email:'.'+' '}</span><span className='pill'>{roomName.owner==user.uid?roomName.number:'.'}</span> </h2>
            <h3> </h3>
            <p>last seen {new Date (messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
        </div>
        <div className='chat-headerRight'>
        <IconButton>
                 <SearchOutlined/>
                </IconButton>
                <IconButton>
                <AttachFile/>
                </IconButton>
                <IconButton>
                <MoreVert/>
                </IconButton>
        </div>
        
        </div>
        <div className='chat-body'>

        {roomName.owner==user.uid? messages.map(message=>( <p className={`chat-message ${message.name===user.displayName && 'chat-receiver'}`}> <span className='chat-name'>{message.name}
        </span>{message.message}<span className='chat-timestamp'>{new Date (message.timestamp?.toDate()).toUTCString()}</span></p>)):''}
          
        <Picker onEmojiClick={onEmojiClick} pickerStyle={{ width: '96%',position: 'absolute',
          bottom: '0%',display:clicked==true?'block' :'none' }} />
        </div>
        <div className='chat-footer'>
       
            <InsertEmoticon style={{cursor:'pointer'}}onClick={openMoji}/>
           
            <form>
                <input onChange={(e)=> setInput(e.target.value)}value={input}type='text'/>
                <button onClick={sendMessage} type='submit'>Send a message</button>
            </form>
            <Mic/>
        </div>
        </div>
    )
}

export default Chat
