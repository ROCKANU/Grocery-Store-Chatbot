import React, { useState, useEffect } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [step, setStep] = useState(1);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const initialGreeting = [
      { sender: 'bot', text: 'Hi there! How may I assist you today?' },
      { sender: 'bot', text: '1. Check Product Availability\n2. Track Order\n3. Store Information\n4. Speak to Support\n5. View Offers\n6. Talk to our Customer Executive' }
    ];
    setMessages(initialGreeting);
  }, []);

  const handleSend = () => {
    if (userMessage.trim()) {
      setMessages([...messages, { sender: 'user', text: userMessage }]);
      handleBotResponse(userMessage);
      setUserMessage('');
    }
  };

  const handleBotResponse = (msg) => {
    if (step === 1) {
      switch (msg) {
        case '1':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: 'Please specify the product name you want to check.' }
          ]);
          setStep(2);
          break;
        case '2':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: 'Please provide your order ID for tracking.' }
          ]);
          setStep(3);
          break;
        case '3':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: 'Our store is open from 8 AM to 9 PM every day, located at Main Street, City Center.' }
          ]);
          break;
        case '4':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: 'Connecting you to support... Please hold for assistance.' }
          ]);
          break;
        case '5':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: 'Today’s Offers: \n- Buy 1 Get 1 Free on selected vegetables.\n- 15% discount on all dairy products.' }
          ]);
          break;
        case '6':
          const randomPhoneNumber = `+1-800-${Math.floor(1000000 + Math.random() * 9000000)}`;
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: `You can reach our Customer Executive at ${randomPhoneNumber}.` }
          ]);
          break;
        default:
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: 'Invalid option. Please select from 1 to 6.' }
          ]);
          break;
      }
    } else if (step === 2) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: `Checking availability for ${msg}... (Feature under development)` }
      ]);
      setStep(1);
    } else if (step === 3) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: `Tracking order ID: ${msg}... (Feature under development)` }
      ]);
      setStep(1);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`chat-container ${isMinimized ? 'minimized' : 'expanded'}`}>
      <div className="chat-header" onClick={toggleMinimize}>
        <h2 className="store-name">Piddi Grocery Shop </h2>
        <button className="minimize-button">
          {isMinimized ? '◻' : '−'}
        </button>
      </div>
      {!isMinimized && (
        <>
          <div className="chat-box">
            {messages.map((msg, index) => (
              <div key={index} className={`${msg.sender}-message message-bubble`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;
