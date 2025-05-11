import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
// import Chat from './pages/Chat'
import SetAvatar from './pages/SetAvatar'
import Chat from './pages/Chat'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Login />} />
        <Route path='/avatar' element={<SetAvatar />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
