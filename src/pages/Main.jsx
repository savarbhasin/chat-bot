import React from 'react'
import Navbar from '../components/Navbar'
import Chatbot from '../components/Chatbot'

export const Main = ({setLoggedIn}) => {
  return (
    <div>
        <Navbar setLoggedIn={setLoggedIn}/>
        <Chatbot/>

    </div>
  )
}
