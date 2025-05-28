import Form from './components/Form'
import Content from './components/Content'
import { useState } from 'react';

const App = () => {
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    birth: '',
    register: '',
  });

  return (
    <div className='flex flex-col items-center h-full bg-gray-900'>
      <Form
        setIsChanged={setIsChanged}
        updateTrigger={updateTrigger}
        setUpdateTrigger={setUpdateTrigger}
        formData={formData}
        setFormData={setFormData}
      />
      <Content
        isChanged={isChanged}
        setFormData={setFormData}
        setUpdateTrigger={setUpdateTrigger}
      />
    </div>
  )
}

export default App