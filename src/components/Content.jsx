import axios from 'axios'
import { useEffect, useState } from 'react'
import UserState from './states/UserState'

const Content = () => {
    const [userInfo, setUserInfo] = useState({});
    const [isEmpty, setIsEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleDateFormat = date => {
        const unformattedDate = new Date(date);
        const formattedDate = unformattedDate.toLocaleDateString('pt-BR');

        return formattedDate;
    }

    useEffect(() => {
        const source = axios.CancelToken.source();

        const handleFetch = async () => {

            await axios.get('http://localhost:3000/users/selectAll')
                .then(res => {
                    setUserInfo(res.data)
                    setIsLoading(false);
                    setIsEmpty(res.data && Object.keys(res.data).length === 0);
                })
                .catch(err => {
                    console.error(err);
                    setIsLoading(false);
                })
        }

        setTimeout(() => {
            handleFetch();
        }, 1000)

        return () => source.cancel("Componente Desmontado");
    }, [])

    if (isEmpty)
        return <UserState state="Nenhum Usuário Encontrado." />

    if (isLoading)
        return <UserState state="Carregando Usuários..." />

    return (
        <div className='outline outline-gray-700 rounded-lg p-3 mt-10 w-150 shadow-md bg-gray-950 h-100 overflow-y-auto overflow-x-hidden scrollbar-custom'>
            <div className="flex flex-col gap-6 mt-3">
                {userInfo.map((user, index) => (
                    <div>
                        <p className='border w-fit border border-b-0 border-gray-700 rounded-t bg-gray-900 px-1 text-gray-500'>Registrado em: {new Date(user.use_register).toLocaleString()}</p>
                        <div key={index} className="border border-gray-700 rounded-b-2xl rounded-tr-2xl p-6 shadow-lg bg-gray-900 text-white space-y-4 w-full">
                            <h2 className="text-xl font-semibold border-b border-gray-600 pb-2">
                                #{index + 1} - {user.use_name}
                            </h2>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Email:</span>
                                <span className="font-medium">{user.use_email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Nascimento:</span>
                                <span className="font-medium">{handleDateFormat(user.use_birth)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Content