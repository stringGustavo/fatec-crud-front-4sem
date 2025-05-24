import React from 'react'
import Form from './components/Form'
import Content from './components/Content'

const App = () => {
  return (
    <div className='flex flex-col items-center h-full bg-gray-900'>
      <Form/>
      <Content/>
    </div>
  )
}

export default App