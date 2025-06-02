
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import { AuthProvider } from './auth/AuthContext'
import AdminDashbord from './pages/AdminDashbord'
function App() {
  

  return (
    <>
    <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Signup/>} />
        <Route path='/admin/*' element={<AdminDashbord/>} />
      </Routes>
    </AuthProvider>
    
    </>
  )
}

export default App
