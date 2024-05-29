import React, { useState } from 'react'
import sendMessage from '../utils/openai';

const Chatbot = () => {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleSend = async () => {
      if (input.trim() === '') return; 
  
      setLoading(true);
      const userMessage = { text: input, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      
      const res = await sendMessage(input);
      const botMessage = { text: res, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      
      setInput('');
      setLoading(false);
    }
  
    const changeHandler = (e) => {
      setInput(e.target.value);
    }
  
    return (
      <div className="w-full max-w-md mx-auto mt-10 bg-white rounded-lg shadow-lg">
        <div className="p-4 h-[30rem] overflow-y-scroll">
          {messages.map((message, index) => (
            <div key={index} className={`my-2 w-fit p-2 rounded-lg ${message.sender === 'bot' ? 'bg-gray-100 text-left' : 'bg-blue-500 text-white ml-auto text-right'}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="p-4 border-t h-20 justify-between border-gray-200 flex items-center">
          {
            loading ? 
              <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
              :
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-lg mr-2"
                placeholder="Type a message..."
                value={input}
                onChange={changeHandler}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
          }
          <button
            className="bg-blue-500 text-white p-2 rounded-lg"
            onClick={handleSend}
            disabled={loading} 
          >
            Send
          </button>
        </div>
      </div>
    );
}

export default Chatbot