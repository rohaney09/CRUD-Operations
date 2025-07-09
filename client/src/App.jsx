import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/Form.jsx'
import UsersTable from './components/UsersTable.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Form</h1>
      <Form />

      <hr className="my-6" />

      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <UsersTable />
    </div>
    </>
  )
}

export default App
