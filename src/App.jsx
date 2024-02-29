import { Routes, Route } from 'react-router-dom'

import './App.css'

import Register from './pages/register'


function App() {


  return (
    <>
    <Routes>
   <Route path='/' element={<home></home>}></Route>
    <Route path='/register' element={<Register></Register>}></Route>
    <Route  path='/login' element={<login></login>}></Route>
    
   
    </Routes>
      
    </>
  )
}

export default App
