import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Chatbot from '../components/Chatbot'
import { useNavigate } from 'react-router';

export const Main = ({setLoggedIn,loggedIn}) => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!loggedIn){
      console.log('going to login from main')
      navigate('/login')
    }
  },[loggedIn])
  return (
    <div>
        <Navbar setLoggedIn={setLoggedIn}/>
        <Chatbot/>

    </div>
  )
}
