import React from 'react';

const MessageInput = ({ handleSendMessage, handleTyping, handleStopTyping, input, setInput }) => {
    return (
        <form
            onSubmit={handleSendMessage}
            className="flex items-center space-x-2"
        >
            <input
                type="text"
                value={input}
                onChange={(e) => {setInput(e.target.value); handleTyping()}}
                onBlur={handleStopTyping}
                placeholder="Mensagem"
                className="flex-grow px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
                type="submit"
                className="flex items-center justify-center bg-gradient-to-r from-sky-500 to-blue-600 text-white h-10 w-10 shadow-md rounded-sm"
            >
                <span className='text-3xl'>&#x27A4;</span>
            </button>
        </form>
    )
}

export default MessageInput;
