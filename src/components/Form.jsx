import axios from 'axios';

const Form = ({ formData, setFormData, updateTrigger, setUpdateTrigger, setIsChanged }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value, }))
    }

    const resetInput = () => {
        setFormData({
            id: '',
            name: '',
            email: '',
            birth: '',
            register: '',
        })
    }

    const handleFormPost = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/users/create',
            {
                use_name: formData.name,
                use_email: formData.email,
                use_birth: formData.birth,
                use_register: new Date().toLocaleString('sv-SE').replace('T', ' '),
            }
        )
            .then(resetInput())
            .then(setIsChanged((prev) => !prev))
            .catch(err => console.error(err))
    }

    const handleFormPut = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3000/users/update/${formData.id}`,
            {
                use_name: formData.name,
                use_email: formData.email,
                use_birth: new Date(formData.birth).toISOString().slice(0, 10),
            }
        )
            .then(resetInput(), setUpdateTrigger(false))
            .then(setIsChanged((prev) => !prev))
            .catch(err => console.error(err))
    }

    return (
        <form onSubmit={!updateTrigger ? handleFormPost : handleFormPut} className='outline outline-gray-700 rounded-lg p-3 mt-10 w-100 shadow-xl/30 bg-gray-950'>
            <div className='flex flex-col w-60 mx-auto mb-5'>
                <h1 className='font-bold text-center mb-5 text-white'>Cadastro de Usuários</h1>
                <label className='text-white'>
                    <small>Nome</small>
                </label>
                <input onChange={(e) => handleChange(e)} value={formData.name} className='outline rounded p-1 mb-3 text-gray-400 bg-gray-800' type="text" name="name" placeholder='Exemplo' required />
                <label className='text-white'>
                    <small>E-mail</small>
                </label>
                <input onChange={(e) => handleChange(e)} value={formData.email} className='outline rounded p-1 mb-3 text-gray-400 bg-gray-800' type="email" name="email" id="" placeholder='exemplo@email.com' required />
                <label className='text-white'>
                    <small>Data de Nascimento</small>
                </label>
                <input onChange={(e) => handleChange(e)} value={formData.birth ? new Date(formData.birth).toISOString().slice(0, 10) : ''} className='outline rounded p-1 mb-3 text-gray-400 bg-gray-800' type="date" name="birth" id="" required />
                <div className='flex justify-center gap-3 text-white'>
                    <button onClick={() => { resetInput(), setUpdateTrigger(false) }} className='rounded-md px-3 shadow-md bg-gray-600 p-2 cursor-pointer hover:bg-gray-500' type="button">Cancelar</button>
                    <button className='rounded-md px-3 shadow-md bg-blue-800 p-2 cursor-pointer hover:bg-blue-700' type="submit">{!updateTrigger ? "Cadastrar" : "Atualizar"}</button>
                </div>
            </div>
        </form>
    )
}

export default Form