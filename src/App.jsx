import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import ProjectFooter from './components/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import { ToastContainer } from 'react-toastify'
import { useContext } from 'react'
import { TokenAuthContext } from './Context Api/TokenAuth'


function App() {
  const { isAuthorized, setIsAuthorized } = useContext(TokenAuthContext)
  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={isAuthorized ? < Dashboard /> : <Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/projects' element={isAuthorized ? <Projects /> : <Home />} />
        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>   
      <ToastContainer position="top-center" autoClose={2000} theme="light" />
      <ProjectFooter />
    </>
  )
}

export default App
