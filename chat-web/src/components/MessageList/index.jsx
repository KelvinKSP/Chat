import React, { useEffect, useRef, useState } from "react";

const MessageList = ({ messages, currentUserId, typingUser }) => {
    const messagesEndRef = useRef(null);
    const [isAtBottom, setIsAtBottom] = useState(true);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = messagesEndRef.current.parentNode;
        setIsAtBottom(scrollTop + (clientHeight + 200) >= scrollHeight);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    console.log('messages: ', messages)

    return (
        <>
            <ul 
                className="p-4 flex flex-col space-y-4 overflow-y-auto" 
                onScroll={handleScroll} 
                style={{ maxHeight: '100%' }} 
            >
                {messages.map((msg, index) => (
                    <li
                        key={index}
                        ref={index === messages.length - 1 ? messagesEndRef : null} 
                        className={`p-3 rounded-lg max-w-[70%] break-words ${msg.id === currentUserId
                            ? "bg-sky-600 text-white ml-auto text-right"
                            : "bg-zinc-700 text-white mr-auto text-left"
                            }`}
                    >
                        <span className="text-md">{msg.message}</span>
                        <br />
                        <span className="text-xs text-gray-300">{msg.time}</span>
                    </li>
                ))}
                {typingUser ? 
                <div className="p-3 rounded-lg max-w-[70%] break-words absolute bottom-20 bg-zinc-700 text-white mr-auto text-left"> 
                    <span className="animate-pulse text-xl">....</span> 
                </div> : null}
            </ul>

            {!isAtBottom && (
                <div className="absolute flex right-2 bottom-20">
                    <button 
                        className="bg-white text-sky-500 rounded-full w-10 h-10 text-2xl shadow animate-bounce"
                        onClick={scrollToBottom}
                    >
                        ▼
                    </button>
                </div>
            )}
        </>
    );
};

export default MessageList;
