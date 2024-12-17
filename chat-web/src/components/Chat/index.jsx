import React, { useEffect, useState } from 'react';
import './styles.css'
import io from 'socket.io-client';
import MessageList from '../MessageList';
import RegisterForm from '../RegisterForm';
import MessageInput from '../MessageInput';

const socket = io('http://localhost:3001');

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [errorName, setErrorName] = useState(null);
    const [currentUserId, setCurrentUserId] = useState('');
    const [typingUser, setTypingUser] = useState(false);

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        socket.on('typing', () => {
            setTypingUser(true);
        })

        socket.on('stop typing', () => {
            setTypingUser(false);
        })

        return () => {
            socket.off('chat message'); 
            socket.off('typing')
            socket.off('stop typing')
        };
    }, []);

    const handleRegisterUser = () => {
        if (!username) setErrorName(true);
        if (username) {
            socket.emit('register user', username); 
            setCurrentUserId(socket.id);
            setIsRegistered(true);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (input && isRegistered) {
            socket.emit('chat message', input); 
            setInput('');
        }
    };

    const handleTyping = () => {
        socket.emit('typing'); 
    };

    const handleStopTyping = () => {
        socket.emit('stop typing'); 
    };

    return (
        <>
            {!isRegistered && (
                <RegisterForm
                    username={username}
                    setUsername={setUsername}
                    handleRegisterUser={handleRegisterUser}
                    error={errorName}
                />
            )}

            {isRegistered && (
                <div className="flex flex-col h-screen">
                    <div className="flex-grow overflow-y-auto bg-gradient-to-r from-[#1a1a2e] to-[#0f3460] overflow-container">
                        <MessageList
                            messages={messages}
                            currentUserId={currentUserId}
                            typingUser={typingUser}

                        />
                    </div>
                    <div className="bg-zinc-50 shadow-md p-2">
                        <MessageInput
                            input={input}
                            setInput={setInput}
                            handleSendMessage={handleSendMessage}
                            handleTyping={handleTyping}
                            handleStopTyping={handleStopTyping}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Chat;