import React, { useState } from 'react'
import axios from 'axios';

const emptyForm = {
    name: '',
    email: '',
    birth: '',
    registerDate: '',
}

const Form = () => {
    const [formData, setFormData] = useState(emptyForm);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value, }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/users/create',
            {
                use_name: formData.name,
                use_email: formData.email,
                use_birth: formData.birth,
                use_register: new Date().toISOString().slice(0, 10),
            }
        )
            .then(res => console.log(res))
            .catch(err => console.error(err))

        setFormData(emptyForm);
    }

    return (
        <form onSubmit={handleFormSubmit} className='outline outline-gray-700 rounded-lg p-3 mt-10 w-100 shadow-md bg-gray-950'>

            <div className='flex flex-col w-60 mx-auto mb-5'>
                <h1 className='font-bold text-center mb-5 text-white'>Cadastro de Usuários</h1>
                <input onChange={(e) => handleChange(e)} value={formData.name} className='outline rounded p-1 mb-3 text-gray-400 bg-gray-800' type="text" name="name" placeholder='Gustavo Santos' required />
                <input onChange={(e) => handleChange(e)} value={formData.email} className='outline rounded p-1 mb-3 text-gray-400 bg-gray-800' type="email" name="email" id="" placeholder='exemplo@email.com' required />
                <input onChange={(e) => handleChange(e)} value={formData.birth} className='outline rounded p-1 mb-3 text-gray-400 bg-gray-800' type="date" name="birth" id="" required />
                <button className='rounded-md shadow-md bg-blue-800 p-1 cursor-pointer hover:bg-blue-700' type="submit">Cadastrar</button>
            </div>
        </form>
    )
}

export default Form