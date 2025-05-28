const userState = ({ state }) => {
    return (
        <div className='flex justify-center items-center outline outline-gray-700 rounded-lg p-3 mt-10 w-150 shadow-md bg-gray-950 h-100'>
            <p className="text-center text-gray-200 text-lg font-semibold animate-fade-in">
                <span className="animate-pulse">{state}</span>
            </p>
        </div>
    )
}

export default userState