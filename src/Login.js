import React from 'react'
import { useHistory } from "react-router-dom";
import './Login.css'
import {Button} from '@material-ui/core'
import {auth,provider} from'./firebase'
import db from './firebase'
import { actionTypes } from './reducer';
import{ useStateValue} from './StateProvider'

function Login() {
    const [{user},dispatch]=useStateValue();
let history = useHistory()
const makeroom=(result)=>{
    db.collection("rooms").where("owner", "==", result.user.uid)
    .get()
    .then((snapshot) => {
     
            if(snapshot.docs.length==0){
           
                db.collection('rooms').add({
                    name: 'Erika',
                    email:'Erika@gmail.com',
                    number:"857"+Math.floor(Math.random() * 10000000),
                    owner:result.user.uid,
                })
                db.collection('rooms').add({
                    name: 'Damon',
                    email:'Damon@gmail.com',
                    number:"857"+Math.floor(Math.random() * 10000000),
                    owner:result.user.uid,
                })
                db.collection('rooms').add({
                    name: 'Dave',
                    email:'Dave@gmail.com',
                    number:"857"+Math.floor(Math.random() * 10000000),
                    owner:result.user.uid,
                })
                db.collection('rooms').add({
                    name: 'Kate',
                    email:'Kate@gmail.com',
                    number:"857"+Math.floor(Math.random() * 10000000),
                    owner:result.user.uid,
                })
                db.collection('rooms').add({
                    name: 'James',
                    email:'James@gmail.com',
                    number:"857"+Math.floor(Math.random() * 10000000),
                    owner:result.user.uid,
                })
            }
           
       
    })
    dispatch({
        type:actionTypes.SET_USER,
        user:result.user
    })
   
        
    

}
    const signIn =()=>{
        auth.signInWithPopup(provider)
        .then(result=>
            makeroom(result)
        
            )
        .catch(err=>console.log(err))
        
    }

    return (
        <div className='login'>
            <div className='login-container'>
                <img
                 src='https://media-exp1.licdn.com/dms/image/C4E0BAQFKdbBJ-9NRPA/company-logo_200_200/0/1553013203712?e=2159024400&v=beta&t=2NhOPVbgO3K8HZr_LSb9CISS5oSvma_lqvTTXb8Ghn0'

                />
            <div>
               <h1>Sign in to ChatApp</h1>
            </div>
            <Button type='submit'onClick={signIn}>Sign In with Google</Button>
            </div>
            
        </div>
    )
}

export default Login
