
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import { AuthProvider } from './auth/AuthContext'
import AdminDashbord from './pages/AdminDashbord'
import OwnerDashbord from './pages/OwnerDashbord'
import UserDashbord from './pages/UserDashbord'
function App() {
  

  return (
    <>
    <AuthProvider>
      <Navbar/>
      <Routes  >
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Signup/>} />
        <Route path='/admin/*' element={<AdminDashbord/>} />
        <Route path='/owner/*' element={<OwnerDashbord/>} />
        <Route path='/user/*' element={<UserDashbord/>} />
      </Routes>
    </AuthProvider>
    
    </>
  )
}

export default App
