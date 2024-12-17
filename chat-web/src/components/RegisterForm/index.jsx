import React from 'react';

const RegisterForm = ({ username, setUsername, handleRegisterUser, error }) => {

    return (
        <div className='flex justify-center flex-col items-center h-screen'>
            <div className='mb-7'>
                <span className='text-3xl text-white'><strong className='text-sky-400'>KSP</strong> CHAT</span>
            </div>
            <input
                type="text"
                className='p-2 w-72 h-10 rounded-sm'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nome"
            />
            {error && (
                <div className='text-red-400 font-semibold mt-3'>Cadastre um nome*</div>
            )}

            <button
                onClick={handleRegisterUser}
                className="mt-5 border-2 border-white w-44 h-10 font-semibold text-white hover:border-blue-600 hover:text-blue-600"
            >
                Registrar
            </button>
        </div>
    )
}

export default RegisterForm;
